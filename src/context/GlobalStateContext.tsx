import { createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const GlobalStateContext = createContext(null);

export const GlobalStateContextProvider = ({ children, ...props }: any) => {
  const [devicesIp, setDevicesIp, removeDevicesIp] = useLocalStorageState(
    "raspberry-ip",
    ""
  );

  const [neuralNetworkIp, setNeuralNetworkIp, removeNeuralNetworkIp] =
    useLocalStorageState("neuralnetwork-ip", "");

  const state = {
    // Getters
    get: {
      devicesIp,
      neuralNetworkIp,
    },
    // Setters
    set: {
      setDevicesIp,
      setNeuralNetworkIp,
      removeDevicesIp,
      removeNeuralNetworkIp,
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
