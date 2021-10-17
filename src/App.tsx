import React, { useEffect, useState } from "react";
import { objectDetection as objectFirstDetection } from "./helpers/sensorMotor";
import { objectDetection as objectCameraDetection } from './helpers/sensorCamera';

export const App: React.FC = (): JSX.Element => {
  const [devicesIp, setDevicesIp] = useState<string | undefined>("");

  const [neuralNetworkIp, setNeuralNetworkIp] = useState<
    string | number | readonly string[] | undefined
  >(undefined);

  const [pageState, setPageState] = useState(0);
  const [file, setFile] = useState(null);

  const handleClick = (e: any) => {
    e.preventDefault();
    setPageState((prevState) => prevState + 1);
  };

  const handleInputChangeDevicesIp = (e: any) => {
    setDevicesIp(String(e.target.value));
  };

  const handleInputChangeNNIp = (e: any) => {
    setNeuralNetworkIp(String(e.target.value));
  };

  const handleReset = () => {
    setPageState(0);
    setDevicesIp(undefined);
  };

  useEffect(() => {
    if (pageState === 1 && devicesIp !== undefined) {
      objectFirstDetection(devicesIp, "HIGH").then(() => {
        setPageState(2)
        return objectCameraDetection(devicesIp);
      }).then((file) => {
        console.log('Imagen promise', file);
        setPageState(3)
        // Call NN
      })
      .then((classification) => {
        setPageState(4)
        //  Activate Sensor + Servo based on the classification
      })
      .then(() => {
        setPageState(1);
      });
    }
  }, [devicesIp, pageState]);

  return (
    <div>
      {pageState === 0 ? (
        <form>
          <label>
            IP Raspberry Devices:
            <input
              type="text"
              name="name"
              value={devicesIp}
              onChange={handleInputChangeDevicesIp}
            />
          </label>
          <label>
            IP Neural Network:
            <input
              type="text"
              name="name"
              value={neuralNetworkIp}
              onChange={handleInputChangeNNIp}
            />
          </label>
          <button type="submit" onClick={handleClick}>
            Iniciar Proceso
          </button>
        </form>
      ) : (
        <>
          <p>IP Raspberry Devices: {devicesIp}</p>
          <p>IP Neural Network: {devicesIp}</p>
          <button onClick={handleReset}>Reset</button>
        </>
      )}

      {pageState === 1 ? (
        <div>
          <p>Leyendo Sensor 1...</p>
        </div>
      ) : null}

      {
        file? <h1>hola</h1> : null
      }
    </div>
  );
};
