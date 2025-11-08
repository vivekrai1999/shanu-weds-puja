import React from 'react';
import FloralDivider from '../components/FloralDivider';

const PeopleSection = () => {
  const peopleGroups = [
    {
      title: 'विनीत',
      people: [
        'श्रीमती गुलाबबाई गौड़',
        'श्रीमती रानी - दिनेश गौड़',
        'खुशाली गौड़',
      ],
    },
    {
      title: 'विशेष आग्रह',
      people: [
        'उमा - स्व. कैलाशचंदजी शर्मा',
        'माया - श्री राजेशजी शर्मा',
        'संगीता - श्री मनीषजी शर्मा',
        'स्वाति - श्री सुमेशजी गौड़',
        'रूपाली - श्री यशजी शर्मा',
        'सुमन - श्री पुष्करजी',
      ],
    },
    {
      title: 'स्वागतातुर',
      people: [
        'प्रहलादजी - मंजु गौड़',
        'गोपालजी - सुनीता गौड़',
        'गोविन्दजी - मीना गौड़',
        'दिपक - दिप्ती गौड़',
        'जितेन्द्र - सरिता',
        'अभिषेक, हर्षिता, वैशाली, मुस्कान, उमेश, दीपेश, शिवम',
      ],
    },
    {
      title: 'प्रतिक्षारत',
      people: [
        'सुश्री धवल गोड़, कपित गौड़',
        'श्रीमती श्यामा - श्री हरीश जी शर्मा',
        'सौरभ, राघव',
      ],
    },
    {
      title: 'दर्शनाभिलाषी',
      people: [
        'महेश - साधना गौड़',
        'प्रदीप - सुनीता गौड़',
        'हर्षित - दिव्या गौड़',
        'यश - शुभांगी गौड़',
      ],
    },
  ];

  return (
    <div className="w-full py-6 px-4" style={{ backgroundColor: '#FFC300' }}>
      {/* People Groups Flex Container */}
      <div className="flex flex-wrap gap-6 justify-center">
        {peopleGroups.map((group, index) => (
          <React.Fragment key={index}>
            <div className="flex-1 min-w-[280px] max-w-[400px]">
            {/* Subheading */}
            <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#E0115F' }}>
              {group.title}
            </h3>

            {/* People List */}
            <div className="space-y-3">
              {group.people.map((person, personIndex) => (
                <div
                  key={personIndex}
                  className="text-center text-white"
                >
                  {person}
                </div>
              ))}
            </div>
            </div>
            {index < peopleGroups.length - 1 && (
              <div className="w-full flex justify-center my-6">
                <FloralDivider color="#8B4513" height={40} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PeopleSection;

