import { serverFetch } from "../helpers/fetch";

export const activeMotor = async (ip: string, status: 'HIGH' | 'LOW', pin: string = '36') => {
  const url = `${ip}/devices/setGPIO`;
  const { done } = await serverFetch(url, "POST", { status, pin });
  return done;
};

// export const objectDetection = async (
//   ip: string,
//   status: 'HIGH' | 'LOW',
//   timeout: string = "60000",
//   pinSensor: string = "35", // Falta este sensor en el diagrama
//   pinMotor: string = "36"
// ) => {
//   const isDetected = await sensorMotor(ip, timeout, pinSensor);
//   if (isDetected) activeMotor(ip, status, pinMotor);
// };
