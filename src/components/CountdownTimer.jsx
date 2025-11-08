import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ weddingDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(weddingDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'दिन' },
    { value: timeLeft.hours, label: 'घंटे' },
    { value: timeLeft.minutes, label: 'मिनट' },
    { value: timeLeft.seconds, label: 'सेकंड' }
  ];

  return (
    <div className="flex gap-2 md:gap-8 justify-center items-center px-4">
      {timeUnits.map((unit, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            {/* Time Circle */}
            <div className="relative">
              <div className="w-14 h-14 md:w-24 md:h-24 rounded-full border-4 border-double border-yellow-400 flex items-center justify-center">
                <span className="text-xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Rozha One', serif" }}>
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border border-yellow-300 opacity-50" style={{ transform: 'scale(1.1)' }}></div>
            </div>
            
            {/* Label */}
            <div className="mt-2">
              <span className="text-xs md:text-sm font-semibold text-white tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {unit.label}
              </span>
            </div>
            
            {/* Decorative Bottom Border */}
            <div className="w-full flex justify-center mt-1">
              <div className="h-0.5 w-8 md:w-12 bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
            </div>
          </div>
          
          {/* Separator Dots */}
          {index < timeUnits.length - 1 && (
            <div className="flex flex-col gap-1 -mt-8">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-300"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-300"></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CountdownTimer;

