import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloralDivider from '../components/FloralDivider';
import { emojiBlast } from '../utils/confetti';

gsap.registerPlugin(ScrollTrigger);

const PeopleSection = () => {
  const sectionRef = useRef(null);
  const groupRefs = useRef([]);
  const [sonalTapCount, setSonalTapCount] = useState(0);
  const peopleGroups = [
    {
      title: 'विनीत',
      people: [
        'श्रीमती गुलाबबाई गौड़',
        'श्रीमती रानी - श्री दिनेश गौड़',
        'सुश्री खुशाली गौड़',
      ],
    },
    {
        title: 'दर्शनाभिलाषी',
        people: [
          'श्रीमती साधना - श्री महेश गौड़',
          'श्रीमती सुनीता - श्री प्रदीप गौड़',
          'श्रीमती दिव्या - श्री हर्षित गौड़',
          'श्रीमती शुभांगी - श्री यश गौड़',
        ],
      },
      {
        title: 'प्रतिक्षारत',
        people: [
          'सुश्री धवल गौड़, कल्पित गौड़',
        ],
      },
      {
        title: 'स्वागतातुर',
        people: [
          'श्रीमती मंजु - श्री प्रहलादजी गौड़',
          'श्रीमती सुनीता - श्री गोपालजी गौड़',
          'श्रीमती मीना - श्री गोविन्दजी गौड़',
          'श्रीमती दिप्ती - श्री दिपक गौड़',
          'श्रीमती सरिता - श्री जितेन्द्र गौड़',
          'अभिषेक, हर्षिता, वैशाली, मुस्कान, उमेश, दीपेश, शिवम',
        ],
      },
    {
      title: 'विशेष आग्रह',
      people: [
        'श्रीमती उमा - स्व. कैलाशचंदजी शर्मा',
        'श्रीमती माया - श्री राजेशजी शर्मा',
        'श्रीमती संगीता - श्री मनीषजी शर्मा',
        'श्रीमती स्वाति - श्री सुमेशजी गौड़',
        'श्रीमती रूपाली - श्री यशजी शर्मा',
        'श्रीमती सुमन - श्री पुष्करजी',
      ],
    },
    {
      title: 'ननिहाल पक्ष',
      people: [
        'श्रीमती कमलाबाई - श्री मोहनलालजी गौड़',
        'श्री राधेश्यामजी गौड़ (रतलाम)',
        'श्रीमती रानी शर्मा - श्री उमाशंकरजी',
        'श्री श्यामजी गौड़',
        'श्रीमती मयंका - दिनेशजी',
        'श्रीमती भारती - सचिन शर्मा',
        'SONAL_EASTER_EGG, कशिश, सक्षम',
      ],
    },
  ];

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Filter out null refs
        const validRefs = groupRefs.current.filter(el => el !== null);
        
        console.log('People Section - Valid refs:', validRefs.length);
        
        validRefs.forEach((groupEl, index) => {
          const isEven = index % 2 === 0;
          
          // Set initial state
          gsap.set(groupEl, {
            opacity: 0,
            x: isEven ? -100 : 100,
            scale: 0.9,
          });
          
          // Create animation
          gsap.to(groupEl, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: groupEl,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              markers: false, // Set to true for debugging
              onEnter: () => console.log(`Group ${index} entered`),
            },
          });
        });
        
        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();
      }, sectionRef);

      return () => {
        ctx.revert();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={sectionRef}

      className="w-full pt-6 pb-32 px-4" 
      style={{ backgroundColor: '#DC3545' }}
    >
      {/* People Groups Flex Container */}
      <div className="flex flex-wrap gap-4 justify-center">
        {peopleGroups.map((group, index) => (
          <React.Fragment key={index}>
            <div 
              ref={el => {
                if (el && !groupRefs.current.includes(el)) {
                  groupRefs.current[index] = el;
                }
              }}
              className="flex-1 min-w-[280px] max-w-[400px]"
            >
              {/* Subheading */}
              <h3 className="text-3xl mb-4 text-center" style={{ color: '#FFC300' }}>
                {group.title}
              </h3>

              {/* People List */}
              <div className="space-y-2">
                {group.people.map((person, personIndex) => {
                  // Check if this person entry contains the easter egg
                  if (person.includes('SONAL_EASTER_EGG')) {
                    const parts = person.split('SONAL_EASTER_EGG');
                    return (
                      <div
                        key={personIndex}
                        className="text-center text-lg"
                        style={{ color: '#FFFFFF' }}
                      >
                        {parts[0]}
                        <span
                          onClick={() => {
                            setSonalTapCount(prev => prev + 1);
                            emojiBlast('💩', 2);
                          }}
                          style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                          {sonalTapCount >= 5 ? '💩' : 'सोनल'}
                        </span>
                        {parts[1]}
                      </div>
                    );
                  }
                  
                  // Check for Bharti - white heart blast
                  if (person.includes('श्रीमती भारती')) {
                    return (
                      <div
                        key={personIndex}
                        className="text-center text-lg"
                        style={{ color: '#FFFFFF' }}
                      >
                        <span
                          onClick={() => emojiBlast('🤍', 2)}
                          style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                          {person}
                        </span>
                      </div>
                    );
                  }
                  
                  // Check for Rani Sharma - sunflower blast
                  if (person.includes('श्रीमती रानी शर्मा')) {
                    return (
                      <div
                        key={personIndex}
                        className="text-center text-lg"
                        style={{ color: '#FFFFFF' }}
                      >
                        <span
                          onClick={() => emojiBlast('🌻', 2)}
                          style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                          {person}
                        </span>
                      </div>
                    );
                  }
                  
                  return (
                    <div
                      key={personIndex}
                      className="text-center text-lg"
                      style={{ color: '#FFFFFF' }}
                    >
                      {person}
                    </div>
                  );
                })}
              </div>
            </div>
            {index < peopleGroups.length - 1 && (
              <div className="w-full flex justify-center my-4">
                <FloralDivider color="#FFC300" height={50} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PeopleSection;
