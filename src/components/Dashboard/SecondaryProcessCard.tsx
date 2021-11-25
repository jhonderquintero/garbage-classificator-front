import {
  IGlobalState,
  useGlobalStatecontext,
} from "../../context/GlobalStateContext";
import LottieAnimation from "../../styles/lottiefiles/trackmachine.json";
import { processState } from "../../helpers/types";
import { LottieComponent } from "./LottieComponent";

export const SecondaryProcessCard = () => {
  const globalState: IGlobalState = useGlobalStatecontext();

  const motorIsActive =
    globalState.get.classificationState === processState[3] ||
    globalState.get.classificationState === processState[4] ||
    globalState.get.classificationState === processState[9] ||
    globalState.get.classificationState === processState[10];

  return (
    <div className="bg-blue col-span-4 bg-white shadow-lg rounded-sm border border-gray-200 flex flex-col justify-center p-4">
      <div>
        <h2
          className={`text-2xl ${
            !motorIsActive ? "text-red-500" : "text-gray-800"
          } font-bold mb-1 p-4 text-center`}
        >
          {motorIsActive ? "Motor Encendido" : "Motor Apagado"}
        </h2>
      </div>

      <LottieComponent
        height={250}
        width={250}
        isPaused={false}
        LottieAnimation={LottieAnimation}
      />
    </div>
  );
};
