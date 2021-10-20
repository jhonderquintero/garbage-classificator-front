import Lottie from "react-lottie";

import LottieAnimation from "../../styles/lottiefiles/data.json";

export const MainProcessCard = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="bg-blue col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 flex flex-col justify-center p-4">
      <div>
        <h2 className="text-2xl text-gray-800 font-bold mb-1 p-4 text-center">
          Detectando material...
        </h2>
      </div>
      <div>
        <Lottie options={defaultOptions} height={250} width={250} />
      </div>
    </div>
  );
};
