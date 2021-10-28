import { useHistory } from "react-router";
import {
  IGlobalState,
  useGlobalStatecontext,
} from "../../context/GlobalStateContext";
import { processState } from "../../helpers/types";

export const ConfigInfo = () => {
  const globalState: IGlobalState = useGlobalStatecontext();
  const history = useHistory();

  const handleProcessBegin = () => {
    if (globalState.get.classificationState === processState[1]) {
      // Set initial state to init classification
      globalState.set.setClassificationState(processState[2]);
    }
    history.push("dashboard");
  };

  const handleViewProcessClick = () => {
    history.push("dashboard");
  };

  const handleIPReset = () => {
    if (globalState.get.deviceCommunicationInstance) {
      globalState.get.deviceCommunicationInstance.stop();
    }
    globalState.set.removeDevicesIp();
    globalState.set.removeNeuralNetworkIp("");
    // globalState.set.setClassificationState(processState[0]);
  };

  return (
    <div className="bg-blue col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 flex flex-row justify-center p-4">
      <div>
        <h2 className="block text-2xl text-gray-800 font-bold mb-1 text-left py-2">
          Direcciones IP
        </h2>

        <div className="py-2">
          <p className="block text-gray-700 text-left mb-1 md:mb-0 pr-4">
            <span className="font-bold"> IP Raspberry: </span>
            <span className="text-gray-600">{globalState.get.devicesIp}</span>
          </p>

          <p className="block text-gray-700 text-left mb-1 md:mb-0 pr-4">
            <span className="font-bold"> IP Red Neuronal: </span>
            <span className="text-gray-600">
              {globalState.get.neuralNetworkIp}
            </span>
          </p>

          {globalState.get.classificationState !== processState[1] ? (
            <p className="block text-gray-500 text-left mb-1 mt-4 md:mb-0 pr-4">
              <span className="font-bold">
                {" "}
                Proceso de Clasificación Inicializado...
              </span>
            </p>
          ) : null}
        </div>

        {globalState.get.classificationState !== processState[1] ? (
          <div className="block mt-2">
            <button
              className="mt-4 shadow bg-blueGray-700 hover:bg-blueGray-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              onClick={handleViewProcessClick}
            >
              Ver Estado Actual del Proceso
            </button>
            <button
              onClick={handleIPReset}
              className="mt-4 ml-3 shadow bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Pausar Proceso y reasignar IPs
            </button>
          </div>
        ) : (
          <div className="block mt-2">
            <button
              className="mt-4 shadow bg-blueGray-700 hover:bg-blueGray-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              onClick={handleProcessBegin}
            >
              Iniciar Clasificación
            </button>

            <button
              onClick={handleIPReset}
              className="mt-4 ml-3 shadow bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Reiniciar IP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
