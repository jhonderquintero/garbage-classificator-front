import React, { ReactNode } from "react";

const WelcomeBanner: React.FC<IWelcomeBanner> = ({
  messageTitle,
  messageContent,
  SVG,
}): JSX.Element => {
  return (
    <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Background illustration */}

      <div
        className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
        aria-hidden="true"
      >
        {SVG}
      </div>

      {/* Content */}
      <div className="relative d-flex">
        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold mb-1 mr-auto">
          {messageTitle}
        </h1>
        
        <div>{messageContent}</div>
      </div>
    </div>
  );
};

export default WelcomeBanner;

interface IWelcomeBanner {
  messageTitle: string;
  messageContent: string | ReactNode;
  SVG: JSX.Element;
}
