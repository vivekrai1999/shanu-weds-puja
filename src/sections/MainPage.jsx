import React, { useState, useEffect } from 'react'
import IntroSection from './IntroSection'
import HeroSection from './HeroSection'
import EventsSection from './EventsSection'
import PeopleSection from './PeopleSection'
import VenueSection from './VenueSection'
import BaalManuhaarSection from './BaalManuhaarSection'
import WaveSeparator from '../components/WaveSeprator'
import WaveSeparatorLayered from '../components/WaveSeparatorLayered'
import WaveSeparatorFlipped from '../components/WaveSeparatorFlipped'
import MusicPlayer from '../components/MusicPlayer'
import LoadingScreen from '../components/LoadingScreen'
import WelcomeScreen from '../components/WelcomeScreen'
import { weddingConfetti } from '../utils/confetti'

function MainPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Prevent scrolling when welcome screen is visible
    if (showWelcome) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [showWelcome]);

  const handleOpenInvitation = () => {
    // Reset scroll position to top
    window.scrollTo(0, 0);
    
    // Dispatch custom event to trigger music
    document.dispatchEvent(new Event('invitation.open'));
    
    // Hide welcome screen with smooth transition
    setTimeout(() => {
      setShowWelcome(false);
      
      // Trigger confetti animation after welcome screen is hidden
      setTimeout(() => {
        weddingConfetti(10);
      }, 100);
    }, 300);
  };

  if (!isLoaded) {
    return <LoadingScreen onLoadComplete={() => setIsLoaded(true)} />;
  }

  return (
  <>
    <MusicPlayer />
    
    {/* Welcome Screen - Shows first, hides after button click */}
    {showWelcome && (
      <WelcomeScreen onOpen={handleOpenInvitation} />
    )}
    
    {/* Main Content - Always rendered but hidden behind welcome screen */}
    <div className={`transition-opacity duration-500 ${showWelcome ? 'opacity-0' : 'opacity-100'}`}>
      <IntroSection />
      <div className="-mt-14 relative z-20">
        <WaveSeparator color="#FFFFFF" />
      </div>
      <HeroSection/>
      <div className="-mt-25 relative z-20">
      <WaveSeparatorLayered color="#DC3545" />
      </div>
      <EventsSection/>
      <div className="-mt-14 relative z-20">
        <WaveSeparator color="#FFC300" />
      </div>
      <VenueSection />
      <div className="-mt-14 relative z-20">
        <WaveSeparator color="#DC3545" />
      </div>
      <PeopleSection/>
      <div className="-mt-14 relative z-20">
        <WaveSeparator color="#FFC300" />
      </div>
      <BaalManuhaarSection />
    </div>
  </>
  )
}

export default MainPage