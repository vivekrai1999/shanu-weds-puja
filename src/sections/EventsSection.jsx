import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloralDivider from '../components/FloralDivider';
import CountdownTimer from '../components/CountdownTimer';
import mandala from '../assets/svgs/mandala.svg';

gsap.registerPlugin(ScrollTrigger);

const EventsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const timerRef = useRef(null);
  const eventRefs = useRef([]);
  const events = [
    {
      day: 'बुधवार',
      date: '26 नवम्बर 2025',
      items: [
        { time: 'सायं 5:00 बजे', name: 'गणेश पूजन/चाक', location: 'निज निवास' },
      ],
    },
    {
      day: 'गुरुवार',
      date: '27 नवम्बर 2025',
      items: [
        { time: 'प्रातः 9:00 बजे', name: 'माता पूजन', location: 'निज निवास' },
        { time: 'दोपहर 1:30 बजे', name: 'हल्दी', location: 'केसर पैलेस', mapLink: 'https://maps.app.goo.gl/Lccxq9r3kNnaAFD9A' },
        { time: 'सायं 7:00 बजे', name: 'संगीत (डीजे नाईट)', location: 'केसर पैलेस', mapLink: 'https://maps.app.goo.gl/Lccxq9r3kNnaAFD9A' },
      ],
    },
    {
      day: 'शुक्रवार',
      date: '28 नवम्बर 2025',
      items: [
        { time: 'प्रातः 10:00 बजे', name: 'मंडप/यज्ञोपवित संस्कार', location: 'केसर पैलेस', mapLink: 'https://maps.app.goo.gl/Lccxq9r3kNnaAFD9A' },
        { time: 'सायं 5:00 बजे', name: 'वर निकासी', location: 'निज निवास' },
      ],
    },
    {
      day: 'शनिवार',
      date: '29 नवम्बर 2025',
      items: [
        { time: 'प्रातः 11:00 बजे', name: 'सगाई/फलदान', location: 'राज बाग ग्वालियर', mapLink: 'https://maps.app.goo.gl/fT5ZymviyuN3DzCEA' },
      ],
    },
    {
      day: 'रविवार',
      date: '30 नवम्बर 2025',
      items: [
        { time: 'प्रातः 10:30 बजे', name: 'शुभलग्न' },
      ],
    },
    {
      day: 'सोमवार',
      date: '1 दिसम्बर 2025',
      items: [
        { time: 'प्रातः 11:00 बजे', name: 'मामेरा (भात)', location: 'सेठीया मैरिज गार्डन रतलाम', mapLink: 'https://maps.app.goo.gl/CmjuX7MwLk5Ec8Wh8' },
        { time: 'सायं 7:00 बजे से', name: 'आशीर्वाद समारोह माधुर्यभोज', location: 'सेठीया मैरिज गार्डन रतलाम', mapLink: 'https://maps.app.goo.gl/CmjuX7MwLk5Ec8Wh8' },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Timer animation
      gsap.from(timerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 0.3,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Stagger event items
      eventRefs.current.forEach((eventEl, index) => {
        if (eventEl) {
          gsap.from(eventEl, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: eventEl,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="w-full py-12" 
      style={{ backgroundColor: '#DC3545' }}
    >
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl text-white mb-8"
        >
          मांगलिक पलों का सफर
        </h2>
        <div ref={timerRef}>
          <CountdownTimer weddingDate="2025-11-30T10:30:00" />
        </div>
      </div>

      {/* Events List */}
      <div className="pb-12">
        {events.map((event, index) => (
          <React.Fragment key={index}>
            <div 
              ref={el => eventRefs.current[index] = el}
              className="w-full relative"
            >
            {/* Odd rows: content left aligned, mandala on right */}
            {index % 2 === 0 ? (
              <>
                {/* Event Content - full width, text left aligned */}
                <div className="w-full text-left pl-8 md:pl-12 pr-32 md:pr-40">
                  {/* Day - Date Row */}
                  <div className="mb-4">
                    <h3 className="text-3xl text-white">
                      {event.day}, {event.date}
                    </h3>
                  </div>

                  {/* Ceremony - Time Rows */}
                  <div className={event.items.length === 3 ? "space-y-4" : "space-y-4"}>
                    {event.items.length === 3 ? (
                      <>
                        {/* First row with 2 functions */}
                        <div className="grid grid-cols-2 gap-4">
                          {event.items.slice(0, 2).map((item, itemIndex) => (
                            <div key={itemIndex} className="text-white">
                              <div className="text-2xl" style={{ color: '#FFC300' }}>
                                {item.name}
                              </div>
                              <div className="text-lg mt-1">
                                {item.time}
                              </div>
                              {item.location && (
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm">{item.location}</span>
                                  {item.mapLink && (
                                    <a
                                      href={item.mapLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="transition-all duration-300 hover:scale-125 animate-bounce-diagonal"
                                      title="स्थान देखें"
                                    >
                                      <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#FFC300"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                      </svg>
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {/* Third function in a separate row */}
                        <div className="text-white">
                          <div className="text-2xl" style={{ color: '#FFC300' }}>
                            {event.items[2].name}
                          </div>
                          <div className="text-lg mt-1">
                            {event.items[2].time}
                          </div>
                          {event.items[2].location && (
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-base">{event.items[2].location}</span>
                              {event.items[2].mapLink && (
                                <a
                                  href={event.items[2].mapLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="transition-all duration-300 hover:scale-125 animate-bounce-diagonal"
                                  title="स्थान देखें"
                                >
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#FFC300"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      event.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-white">
                          <div className="text-2xl" style={{ color: '#FFC300' }}>
                            {item.name}
                          </div>
                          <div className="text-lg mt-1">
                            {item.time}
                          </div>
                          {item.location && (
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-base">{item.location}</span>
                              {item.mapLink && (
                                <a
                                  href={item.mapLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="transition-all duration-300 hover:scale-125 animate-bounce-diagonal"
                                  title="स्थान देखें"
                                >
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#FFC300"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Mandala - absolutely positioned at right */}
                <div 
                  className="absolute top-1/2 w-64 h-64 md:w-80 md:h-80 animate-spin-slow"
                  style={{ 
                    right: '-30%',
                    WebkitMaskImage: `url(${mandala})`,
                    maskImage: `url(${mandala})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    backgroundColor: '#FFC300',
                    transform: 'translateY(-50%)'
                  }} 
                />
              </>
            ) : (
              <>
                {/* Mandala - absolutely positioned at left */}
                <div 
                  className="absolute top-1/2 w-64 h-64 md:w-80 md:h-80 animate-spin-slow"
                  style={{ 
                    left: '-30%',
                    WebkitMaskImage: `url(${mandala})`,
                    maskImage: `url(${mandala})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    backgroundColor: '#FFC300',
                    transform: 'translateY(-50%)'
                  }} 
                />

                {/* Event Content - full width, text right aligned */}
                <div className="w-full text-right pr-8 md:pr-12 pl-32 md:pl-40">
                  {/* Day - Date Row */}
                  <div className="mb-4">
                    <h3 className="text-3xl text-white">
                      {event.day}, {event.date}
                    </h3>
                  </div>

                  {/* Ceremony - Time Rows */}
                  <div className={event.items.length === 3 ? "space-y-4" : "space-y-4"}>
                    {event.items.length === 3 ? (
                      <>
                        {/* First row with 2 functions */}
                        <div className="grid grid-cols-2 gap-4">
                          {event.items.slice(0, 2).map((item, itemIndex) => (
                            <div key={itemIndex} className="text-white">
                              <div className="text-2xl" style={{ color: '#FFC300' }}>
                                {item.name}
                              </div>
                              <div className="text-lg mt-1">
                                {item.time}
                              </div>
                              {item.location && (
                                <div className="flex items-center justify-end gap-2 mt-1">
                                  <span className="text-base">{item.location}</span>
                                  {item.mapLink && (
                                    <a
                                      href={item.mapLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="transition-all duration-300 hover:scale-125 animate-bounce-diagonal"
                                      title="स्थान देखें"
                                    >
                                      <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#FFC300"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                      </svg>
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {/* Third function in a separate row */}
                        <div className="text-white">
                          <div className="text-2xl" style={{ color: '#FFC300' }}>
                            {event.items[2].name}
                          </div>
                          <div className="text-lg mt-1">
                            {event.items[2].time}
                          </div>
                          {event.items[2].location && (
                            <div className="flex items-center justify-end gap-2 mt-1">
                              <span className="text-base">{event.items[2].location}</span>
                              {event.items[2].mapLink && (
                                <a
                                  href={event.items[2].mapLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="transition-all duration-300 hover:scale-125 animate-bounce-diagonal"
                                  title="स्थान देखें"
                                >
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#FFC300"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      event.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-white">
                          <div className="text-2xl" style={{ color: '#FFC300' }}>
                            {item.name}
                          </div>
                          <div className="text-lg mt-1">
                            {item.time}
                          </div>
                          {item.location && (
                            <div className="flex items-center justify-end gap-2 mt-1">
                              <span className="text-base">{item.location}</span>
                              {item.mapLink && (
                                <a
                                  href={item.mapLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="transition-all duration-300 hover:scale-125 animate-bounce-diagonal"
                                  title="स्थान देखें"
                                >
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#FFC300"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
            </div>
            {index < events.length - 1 && (
              <div className="my-8">
                <FloralDivider color="#FFC300" height={50} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;

