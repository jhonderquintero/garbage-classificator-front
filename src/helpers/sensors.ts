import { serverFetch } from "./fetch";

interface sensorArgs {
  ip: string,
  timeout?: string | false,
  pin: string,

};

export const readSensor = async ({ ip, timeout = "6000", pin }: sensorArgs): Promise<boolean> => {
  let url = '';

  if (timeout) {
    url = `${ip}/devices/IRsensor?pin=${pin}&timeout=${timeout}`;
  } else {
    console.log('Sensor without timeout')
    url = `${ip}/devices/IRsensor?pin=${pin}`;
  }

  const res = await serverFetch(url);
  console.log(res);
  
  return res.detection;
};

export const initialSensor = async (ip: string) => readSensor({ ip, pin: "35", timeout: false });
export const metalSensor = async (ip: string) => readSensor({ ip, pin: "37", timeout: false });
export const plasticSensor = async (ip: string) => readSensor({ ip, pin: "40", timeout: false });
export const paperSensor = async (ip: string) => readSensor({ ip, pin: "8", timeout: false });
export const cameraSensor = async (ip: string) => readSensor({ ip, pin: "38", timeout: false });