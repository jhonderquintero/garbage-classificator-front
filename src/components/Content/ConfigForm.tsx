import { SyntheticEvent, useState } from "react";
import {
  IGlobalState,
  useGlobalStatecontext,
} from "../../context/GlobalStateContext";
import { validateIP } from "../../helpers/validation";

export const ConfigForm = () => {
  const globalState: IGlobalState = useGlobalStatecontext();

  const [devicesIp, setDevicesIp] = useState<string>("");
  const [neuralNetworkIp, setNeuralNetworkIp] = useState<string>("");
  const [formError, setFormError] = useState<IFormError | null>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const correctDevicesIp: boolean = validateIP(devicesIp);
    const notNullNeuralNetworkIp: boolean = neuralNetworkIp !== "";

    if (correctDevicesIp) {
      setFormError((prevState) => {
        return {
          ...prevState,
          devicesIpError: "",
        };
      });
      globalState.set.setDevicesIp(`http://${devicesIp}`);
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          devicesIpError: "IP de Raspberry Incorrecta.",
        };
      });
    }

    if (notNullNeuralNetworkIp) {
      globalState.set.setNeuralNetworkIp(neuralNetworkIp);
      setFormError((prevState) => {
        return {
          ...prevState,
          neuralNetworkIp: "",
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          neuralNetworkIp: "IP de Red Neuronal Incorrecta.",
        };
      });
    }

    if (correctDevicesIp && notNullNeuralNetworkIp) {
      setFormError(null);
      globalState.set.setClassificationState("1");
    }
  };

  const handleInputChangeDevicesIp = (e: SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setDevicesIp(String(target.value));
  };

  const handleInputChangeNNIp = (e: SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setNeuralNetworkIp(String(target.value));
  };

  return (
    <div className="bg-blue col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 flex flex-row justify-center p-4">
      <div>
        <h2 className="text-2xl text-gray-800 font-bold mb-1 p-4 text-center">
          Introduce las direcciones IP
        </h2>
        <form className="w-full max-w-sm p-4" onSubmit={handleSubmit}>
          <div className="flex items-center mb-6">
            <div className="md:w-1/3">
              <label
                className={`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4`}
                htmlFor="inline-full-name"
              >
                IP Raspberry:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className={`${
                  formError?.devicesIpError ? "border-red-700" : ""
                } bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
                  ${
                    formError?.devicesIpError ? "" : "focus:border-coolGray-700"
                  }
                focus:outline-none focus:bg-white`}
                id="inline-full-name"
                type="text"
                onBlur={handleInputChangeDevicesIp}
              />
            </div>
          </div>
          <div className="flex items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                IP Red Neuronal:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className={`${
                  formError?.neuralNetworkIp ? "border-red-700" : ""
                } bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight 
                ${formError?.neuralNetworkIp ? "" : "focus:border-coolGray-700"}
              focus:outline-none focus:bg-white`}
                id="inline-full-name"
                type="text"
                onBlur={handleInputChangeNNIp}
              />
            </div>
          </div>
          <p className="text-red-500 text-right">{formError?.devicesIpError}</p>
          <p className="text-red-500 text-right">
            {formError?.neuralNetworkIp}
          </p>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="mt-4 shadow bg-blueGray-700 hover:bg-blueGray-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Guardar Datos
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

interface IFormError {
  devicesIpError?: string;
  neuralNetworkIp?: string;
}
