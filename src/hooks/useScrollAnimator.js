import { useEffect } from 'react';

const DEFAULT_OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2,
};

const animationClass = (name = 'fade-up') => `reveal-${name}`;

export const useScrollAnimator = (scopeRef, options = {}) => {
  useEffect(() => {
    const scope = scopeRef?.current || document;
    if (!scope) {
      return;
    }

    const elements = scope.querySelectorAll('[data-animate]');
    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('reveal-visible');
            observer.unobserve(el);
          }
        });
      },
      { ...DEFAULT_OPTIONS, ...options }
    );

    elements.forEach((el) => {
      const animationName = el.getAttribute('data-animate') || 'fade-up';
      const delay = el.getAttribute('data-animate-delay') || '0ms';
      const duration = el.getAttribute('data-animate-duration') || '800ms';

      el.style.setProperty('--reveal-delay', delay);
      el.style.setProperty('--reveal-duration', duration);
      el.classList.add('reveal-base', animationClass(animationName));

      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [scopeRef, options.root, options.rootMargin, options.threshold]);
};

export default useScrollAnimator;

