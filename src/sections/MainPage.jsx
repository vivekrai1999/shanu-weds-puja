import React from 'react'
import HeroLayout from '../layouts/HeroLayout'
import EventsLayout from '../layouts/EventsLayout'
import PeopleLayout from '../layouts/PeopleLayout'
import EventsSection from './EventsSection'
import WaveSeparator from '../components/WaveSeprator'
import WaveSeparatorLayered from '../components/WaveSeparatorLayered'

function MainPage() {
  return (
  <>
    <HeroLayout/>
    <div className="-mt-14 relative z-20">
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