import { serverFetch } from "./fetch";

export const sensorMotor = async (
  ip: string,
  timeout: string = "60000",
  pinSensor: string = "36",
) => {
  const url = `${ip}/devices/IRsensor?pin=${pinSensor}&timeout=${timeout}`;
  const { detection } = await serverFetch(url);
  return detection;
};

export const activeMotor = async (ip: string, status: 'HIGH' | 'LOW', pin: string) => {
  const url = `${ip}/devices/setGPIO`;
  const { done } = await serverFetch(url, "post", status, pin);
  return done;
};

export const objectDetection = async (
  ip: string,
  status: 'HIGH' | 'LOW',
  timeout: string = "60000",
  pinSensor: string = "35", // Falta este sensor en el diagrama
  pinMotor: string = "36"
) => {
  const isDetected = await sensorMotor(ip, timeout, pinSensor);
  if (isDetected) activeMotor(ip, status, pinMotor);
};
