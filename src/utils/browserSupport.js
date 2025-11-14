const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

const THEME_STORAGE_KEY = 'bw_theme_mode';
const DEFAULT_THEME_COLOR = '#DC3545';

const prefersDarkQuery = '(prefers-color-scheme: dark)';

const rafThrottle = (fn) => {
  let isScheduled = false;
  return (...args) => {
    if (isScheduled) {
      return;
    }
    isScheduled = true;
    requestAnimationFrame(() => {
      fn(...args);
      isScheduled = false;
    });
  };
};

class BrowserSupport {
  constructor() {
    this.initialized = false;
    this.root = null;
    this.metaTheme = null;
    this.prefersDarkMedia = null;
    this.sectionObserver = null;
    this.vhListener = null;
    this.themeChangeListener = null;
    this.offlineListener = null;
    this.onlineListener = null;
    this.currentThemeColor = DEFAULT_THEME_COLOR;
    this.offlineBanner = null;
  }

  init() {
    if (!isBrowser || this.initialized) {
      return;
    }

    this.initialized = true;
    this.root = document.documentElement;
    this.metaTheme = document.querySelector('meta[name="theme-color"]');

    this.setDeviceAttributes();
    this.setupViewportUnitFix();
    this.setupThemeHandling();
    this.observeSections();
    this.setupOfflineHandling();
  }

  destroy() {
    if (!this.initialized) {
      return;
    }
    window.removeEventListener('resize', this.vhListener);
    window.removeEventListener('orientationchange', this.vhListener);

    if (this.prefersDarkMedia) {
      const handler = this.themeChangeListener;
      if (this.prefersDarkMedia.removeEventListener) {
        this.prefersDarkMedia.removeEventListener('change', handler);
      } else if (this.prefersDarkMedia.removeListener) {
        this.prefersDarkMedia.removeListener(handler);
      }
    }

    window.removeEventListener('offline', this.offlineListener);
    window.removeEventListener('online', this.onlineListener);

    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }

    this.initialized = false;
  }

  setDeviceAttributes() {
    if (!isBrowser) return;
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    const isSafari = /Safari/i.test(ua) && !/Chrome|CriOS|Android/i.test(ua);

    this.root.setAttribute('data-device', isIOS ? 'ios' : isAndroid ? 'android' : 'desktop');
    this.root.setAttribute('data-browser', isSafari ? 'safari' : 'default');
  }

  setupViewportUnitFix() {
    if (!isBrowser) return;

    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      this.root.style.setProperty('--safe-vh', `${vh}px`);
    };

    this.vhListener = rafThrottle(setVh);
    setVh();
    window.addEventListener('resize', this.vhListener);
    window.addEventListener('orientationchange', this.vhListener);
  }

  setupThemeHandling() {
    if (!isBrowser) return;

    const storedMode = localStorage.getItem(THEME_STORAGE_KEY) || 'auto';
    this.themeMode = storedMode;
    this.prefersDarkMedia = window.matchMedia(prefersDarkQuery);

    this.themeChangeListener = (event) => {
      if (this.themeMode === 'auto') {
        this.applyTheme(event.matches ? 'dark' : 'light');
      }
    };

    if (this.prefersDarkMedia.addEventListener) {
      this.prefersDarkMedia.addEventListener('change', this.themeChangeListener);
    } else if (this.prefersDarkMedia.addListener) {
      this.prefersDarkMedia.addListener(this.themeChangeListener);
    }

    const resolvedTheme =
      this.themeMode === 'auto'
        ? (this.prefersDarkMedia.matches ? 'dark' : 'light')
        : this.themeMode;

    this.applyTheme(resolvedTheme);
  }

  applyTheme(theme) {
    this.root.setAttribute('data-bs-theme', theme);
    if (!this.metaTheme) {
      return;
    }
    if (!this.currentThemeColor) {
      this.currentThemeColor = DEFAULT_THEME_COLOR;
    }
    this.metaTheme.setAttribute('content', this.currentThemeColor);
  }

  observeSections() {
    if (!isBrowser) return;
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const color = entry.target.getAttribute('data-theme-color');
            if (color) {
              this.updateThemeColor(color);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    // Wait for React to paint DOM nodes
    requestAnimationFrame(() => {
      document
        .querySelectorAll('[data-theme-color]')
        .forEach((section) => this.sectionObserver.observe(section));
    });
  }

  refreshSections() {
    if (!this.initialized) return;
    this.observeSections();
  }

  updateThemeColor(color) {
    if (!color || color === this.currentThemeColor) {
      return;
    }
    this.currentThemeColor = color;
    if (this.metaTheme) {
      this.metaTheme.setAttribute('content', color);
    }
  }

  setupOfflineHandling() {
    if (!isBrowser) return;

    const updateOfflineState = () => {
      const isOffline = !navigator.onLine;
      this.root.setAttribute('data-offline', String(isOffline));
      this.toggleOfflineBanner(isOffline);
      this.syncOfflineDisabledElements(isOffline);
    };

    this.offlineListener = () => updateOfflineState();
    this.onlineListener = () => updateOfflineState();

    window.addEventListener('offline', this.offlineListener);
    window.addEventListener('online', this.onlineListener);

    updateOfflineState();
  }

  ensureOfflineBanner() {
    if (this.offlineBanner || !isBrowser) {
      return;
    }

    const banner = document.createElement('div');
    banner.className = 'offline-banner offline-banner--hidden';
    banner.setAttribute('role', 'status');
    banner.setAttribute('aria-live', 'polite');
    banner.textContent = 'कनेक्शन अनुपलब्ध है — पुनः जुड़ने पर सुविधाएँ लौटेंगी';
    document.body.appendChild(banner);
    this.offlineBanner = banner;
  }

  toggleOfflineBanner(isOffline) {
    this.ensureOfflineBanner();
    if (!this.offlineBanner) return;

    if (isOffline) {
      this.offlineBanner.classList.remove('offline-banner--hidden');
    } else {
      this.offlineBanner.classList.add('offline-banner--hidden');
    }
  }

  syncOfflineDisabledElements(isOffline) {
    document
      .querySelectorAll('[data-offline-disabled]')
      .forEach((el) => {
        el.classList.toggle('offline-disabled', isOffline);
        el.setAttribute('aria-disabled', String(isOffline));

        if (el.tagName === 'BUTTON' || el.tagName === 'INPUT' || el.tagName === 'SELECT') {
          if (!el.dataset.wasDisabled) {
            el.dataset.wasDisabled = el.disabled ? 'true' : 'false';
          }
          el.disabled = isOffline ? true : el.dataset.wasDisabled === 'true';
        } else if (el.tagName === 'A') {
          if (!el.dataset.offlineTabIndex) {
            el.dataset.offlineTabIndex = el.getAttribute('tabindex') ?? '';
          }
          if (isOffline) {
            el.setAttribute('tabindex', '-1');
            el.style.pointerEvents = 'none';
          } else {
            if (el.dataset.offlineTabIndex) {
              el.setAttribute('tabindex', el.dataset.offlineTabIndex);
            } else {
              el.removeAttribute('tabindex');
            }
            el.style.pointerEvents = '';
          }
        }
      });
  }
}

export const browserSupport = new BrowserSupport();

