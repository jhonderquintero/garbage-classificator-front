import Lottie from "react-lottie";

export const LottieComponent: React.FC<ILottieComponent> = ({
  LottieAnimation,
  options,
  height,
  width,
  isPaused = false,
  autoPlay = true,
}): JSX.Element => {
  const defaultOptions = {
    loop: true,
    autoplay: autoPlay,
    animationData: LottieAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    ...options,
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={height}
        width={width}
        isPaused={isPaused}
      />
    </div>
  );
};

interface ILottieComponent {
  LottieAnimation: any;
  options?: object;
  height: number;
  width: number;
  isPaused?: boolean;
  autoPlay?: boolean;
}
