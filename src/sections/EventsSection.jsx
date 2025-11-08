import React from 'react';
import FloralDivider from '../components/FloralDivider';
import CountdownTimer from '../components/CountdownTimer';
import mandala from '../assets/svgs/mandala.svg';

const EventsSection = () => {
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
        { time: 'प्रातः 9:00 बजे', name: 'माताजी पूजन', location: 'निज निवास' },
        { time: 'दोपहर 1:30 बजे', name: 'हल्दी', location: 'केसर पैलेस', mapLink: 'https://maps.app.goo.gl/Lccxq9r3kNnaAFD9A' },
        { time: 'सायं 7:00 बजे', name: 'महिला संगीत (डी. जे. नाईट)', location: 'केसर पैलेस', mapLink: 'https://maps.app.goo.gl/Lccxq9r3kNnaAFD9A' },
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
        { time: 'प्रातः 11:00 बजे', name: 'सगाई/फलदान', location: 'राज बाग ग्वालियर', mapLink: 'https://share.google/szw84F0A6QaS0KuVR' },
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
        { time: 'प्रातः 11:00 बजे', name: 'मामेरा (भात)', location: 'सेठीया मैरिज गार्डन रतलाम', mapLink: 'https://share.google/iH9qmGrdJfB5ISHm9' },
        { time: 'सायं 7:00 बजे से', name: 'आशीर्वाद समारोह/माधुर्यभोज', location: 'सेठीया मैरिज गार्डन रतलाम', mapLink: 'https://share.google/iH9qmGrdJfB5ISHm9' },
      ],
    },
  ];

  return (
    <div className="w-full py-12 px-4" style={{ backgroundColor: '#E0115F' }}>
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl text-white mb-8">
          मांगलिक पलों का सफर
        </h2>
        <CountdownTimer weddingDate="2025-11-30T10:30:00" />
      </div>

      {/* Events List */}
      <div className="pb-12">
        {events.map((event, index) => (
          <React.Fragment key={index}>
            <div className="w-full flex relative">
            {/* Odd rows: 70% content (left aligned) + 30% mandala container */}
            {index % 2 === 0 ? (
              <>
                {/* Event Content - 70% width, text left aligned */}
                <div className="w-[70%] text-left">
                  {/* Day - Date Row */}
                  <div className="mb-4">
                    <h3 className="text-2xl text-white">
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
                              <div className="text-xl font-semibold" style={{ color: '#FFC300' }}>
                                {item.name}
                              </div>
                              <div className="text-base mt-1">
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
                                      className="text-xs underline hover:text-yellow-300 transition-colors"
                                    >
                                      स्थल देखें
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {/* Third function in a separate row */}
                        <div className="text-white">
                          <div className="text-xl font-semibold" style={{ color: '#FFC300' }}>
                            {event.items[2].name}
                          </div>
                          <div className="text-base mt-1">
                            {event.items[2].time}
                          </div>
                          {event.items[2].location && (
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm">{event.items[2].location}</span>
                              {event.items[2].mapLink && (
                                <a
                                  href={event.items[2].mapLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs underline hover:text-yellow-300 transition-colors"
                                >
                                  स्थल देखें
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      event.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-white">
                          <div className="text-xl font-semibold" style={{ color: '#FFC300' }}>
                            {item.name}
                          </div>
                          <div className="text-base mt-1">
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
                                  className="text-xs underline hover:text-yellow-300 transition-colors"
                                >
                                  स्थल देखें
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Mandala Container - 30% width, positioned at right edge */}
                <div className="w-[30%] h-64 md:h-80 relative overflow-hidden">
                  <div 
                    className="absolute -right-32 md:-right-40 top-1/2 w-64 h-64 md:w-80 md:h-80 animate-spin-slow"
                    style={{ 
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
                </div>
              </>
            ) : (
              <>
                {/* Mandala Container - 30% width, positioned at left edge */}
                <div className="w-[30%] h-64 md:h-80 relative overflow-hidden">
                  <div 
                    className="absolute -left-32 md:-left-40 top-1/2 w-64 h-64 md:w-80 md:h-80 animate-spin-slow"
                    style={{ 
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
                </div>

                {/* Event Content - 70% width, text right aligned */}
                <div className="w-[70%] text-right">
                  {/* Day - Date Row */}
                  <div className="mb-4">
                    <h3 className="text-2xl text-white">
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
                              <div className="text-xl font-semibold" style={{ color: '#FFC300' }}>
                                {item.name}
                              </div>
                              <div className="text-base mt-1">
                                {item.time}
                              </div>
                              {item.location && (
                                <div className="flex items-center justify-end gap-2 mt-1">
                                  <span className="text-sm">{item.location}</span>
                                  {item.mapLink && (
                                    <a
                                      href={item.mapLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs underline hover:text-yellow-300 transition-colors"
                                    >
                                      स्थल देखें
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {/* Third function in a separate row */}
                        <div className="text-white">
                          <div className="text-xl font-semibold" style={{ color: '#FFC300' }}>
                            {event.items[2].name}
                          </div>
                          <div className="text-base mt-1">
                            {event.items[2].time}
                          </div>
                          {event.items[2].location && (
                            <div className="flex items-center justify-end gap-2 mt-1">
                              <span className="text-sm">{event.items[2].location}</span>
                              {event.items[2].mapLink && (
                                <a
                                  href={event.items[2].mapLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs underline hover:text-yellow-300 transition-colors"
                                >
                                  स्थल देखें
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      event.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-white">
                          <div className="text-xl font-semibold" style={{ color: '#FFC300' }}>
                            {item.name}
                          </div>
                          <div className="text-base mt-1">
                            {item.time}
                          </div>
                          {item.location && (
                            <div className="flex items-center justify-end gap-2 mt-1">
                              <span className="text-sm">{item.location}</span>
                              {item.mapLink && (
                                <a
                                  href={item.mapLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs underline hover:text-yellow-300 transition-colors"
                                >
                                  स्थल देखें
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

