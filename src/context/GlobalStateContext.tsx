import { createContext, useContext } from "react";
import { processState } from "../helpers/types";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const GlobalStateContext = createContext(null);

export function useGlobalStatecontext() {
  const context = useContext(GlobalStateContext);
  if (!context)
    throw new Error(
      "Global State Context must be used inside the Global State Provider"
    );
  return context;
}

export const GlobalStateContextProvider = ({ children, ...props }: any) => {
  const [devicesIp, setDevicesIp, removeDevicesIp] = useLocalStorageState(
    "raspberry-ip",
    ""
  );

  const [neuralNetworkIp, setNeuralNetworkIp, removeNeuralNetworkIp] =
    useLocalStorageState("neuralnetwork-ip", "");

  const [
    classificationState,
    setClassificationState,
    removeClassificationState,
  ] = useLocalStorageState("classification-state", processState[0]);

  const state: IGlobalState = {
    // Getters
    get: {
      devicesIp,
      neuralNetworkIp,
      classificationState,
    },
    // Setters
    set: {
      setDevicesIp,
      setNeuralNetworkIp,
      setClassificationState,
      removeDevicesIp,
      removeNeuralNetworkIp,
      removeClassificationState,
    },
  };

  return (
    <GlobalStateContext.Provider
      value={state}
      children={children}
      {...props}
    ></GlobalStateContext.Provider>
  );
};

export interface IGlobalState {
  get: GlobalStateGetters;
  set: GlobalStateSetters;
}

interface GlobalStateGetters {
  devicesIp: string;
  neuralNetworkIp: string;
  classificationState: string;
}

interface GlobalStateSetters {
  setDevicesIp: Function;
  setNeuralNetworkIp: Function;
  removeDevicesIp: Function;
  removeNeuralNetworkIp: Function;
  setClassificationState: Function;
  removeClassificationState: Function;
}
