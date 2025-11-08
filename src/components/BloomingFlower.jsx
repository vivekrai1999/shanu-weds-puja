import React from 'react';

const BloomingFlower = ({ children }) => {
  return (
    <div className="blooming-flower-wrapper">
      <div id="flower">
        <section className="one"></section>
        <section className="two"></section>
        <section className="three"></section>
        <section className="four"></section>
        <div className="flower-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BloomingFlower;

