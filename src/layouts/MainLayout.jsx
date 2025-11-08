import React, { ReactNode } from 'react';


const Layout= ({ content }) => {
  return (
      <div className="w-full h-full bg-pink-100">
        {content}
      </div>
  );
};

export default Layout;

