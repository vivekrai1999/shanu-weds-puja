import React, { useState } from 'react'
import IntroSection from './IntroSection'
import HeroLayout from '../layouts/HeroLayout'
import EventsLayout from '../layouts/EventsLayout'
import PeopleLayout from '../layouts/PeopleLayout'
import EventsSection from './EventsSection'
import WaveSeparator from '../components/WaveSeprator'
import WaveSeparatorLayered from '../components/WaveSeparatorLayered'
import WaveSeparatorFlipped from '../components/WaveSeparatorFlipped'
import MusicPlayer from '../components/MusicPlayer'
import LoadingScreen from '../components/LoadingScreen'
import WelcomeScreen from '../components/WelcomeScreen'

function MainPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleOpenInvitation = () => {
    // Dispatch custom event to trigger music
    document.dispatchEvent(new Event('invitation.open'));
    
    // Hide welcome screen with smooth transition
    setTimeout(() => {
      setShowWelcome(false);
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
      <HeroLayout/>
      <div className="-mt-25 relative z-20">
        <WaveSeparatorLayered color="#E0115F" />
      </div>
      <EventsLayout>
        <EventsSection/>
      </EventsLayout>
      <div className="-mt-14 relative z-20">
        <WaveSeparator color="#FFC300" />
      </div>
      <PeopleLayout/>
    </div>
  </>
  )
}

export default MainPage