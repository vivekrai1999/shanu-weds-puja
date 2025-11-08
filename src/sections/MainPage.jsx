import React from 'react'
import IntroSection from './IntroSection'
import HeroLayout from '../layouts/HeroLayout'
import EventsLayout from '../layouts/EventsLayout'
import PeopleLayout from '../layouts/PeopleLayout'
import EventsSection from './EventsSection'
import WaveSeparator from '../components/WaveSeprator'
import WaveSeparatorLayered from '../components/WaveSeparatorLayered'
import WaveSeparatorFlipped from '../components/WaveSeparatorFlipped'

function MainPage() {
  return (
  <>
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
  </>
  )
}

export default MainPage