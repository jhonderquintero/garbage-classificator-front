import { serverFetch } from "./fetch";

export const activeMotor = async (ip: string, status: 'HIGH' | 'LOW', pin: string = '36') => {
  const url = `${ip}/devices/setGPIO`;
  const { done } = await serverFetch(url, "POST", { status, pin });
  return done;
};

export const LEDPin = async (ip: string, status: 'HIGH' | 'LOW', pin: string = '33') => {
  await activeMotor(ip, status, pin);
};

export const takePicture = async (ip: string) => {
  const url = `${ip}/devices/image-generator`;
  const image = await serverFetch(url, 'post', {}, undefined, false);

  return image;
};

export const displayString = async (ip: string, text: string) => {
  const url = `${ip}/devices/lcd-display?text=${text}`;
  await serverFetch(url);
};

export const moveServo = async (ip: string, pin: string, mode: '135' | '180') => {
  const url = `${ip}/devices/pwm-generator?pin=${pin}&mode=${mode}`;
  await serverFetch(url);
};

export const metalServo = (ip: string, mode: '135' | '180') => moveServo(ip, '29', mode);
export const plasticServo = (ip: string, mode: '135' | '180') => moveServo(ip, '31', mode);
export const paperServo = (ip: string, mode: '135' | '180') => moveServo(ip, '32', mode);
