import Lottie from "react-lottie";

import LottieAnimation from "../../styles/lottiefiles/robot.json"

export const LottieCard = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="p-4">
      <Lottie options={defaultOptions} height={250} width={300} />
    </div>
  );
};
