import { serverFetch } from "./fetch";
import { activeMotor } from "./sensorMotor";

export const sensorCamera = async (
  ip: string,
  timeout: string = "60000",
  pin: string = "36"
) => {
  const url = `${ip}/devices/IRsensor?pin=${pin}&timeout=${timeout}`;
  const { detection } = await serverFetch(url);
  return detection;
};

export const takePicture = async (ip: string) => {
  const url = `${ip}/devices/image-generator`;
  const image = await serverFetch(url, 'post');

  return image;
};


export const objectDetection = async (
  ip: string,
  status: 'HIGH' | 'LOW' = 'LOW',
  timeout: string = "60000",
  pinSensor: string = "38",
  pinMotor: string = "36",
  pinLights: string = "33",
) => {
  const isDetected = await sensorCamera(ip, timeout, pinSensor);
  if (isDetected) await activeMotor(ip, status, pinMotor);
  await activeMotor(ip, 'HIGH', pinLights);

  const image: File = await takePicture(ip);
  console.log(image);
  await activeMotor(ip, 'LOW', pinLights);
  
  return image;
};
