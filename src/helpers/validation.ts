export const emailRegex =
  /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex =
  /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
export const usernameRegex = /^[A-Za-z]{3,16}$/;
export const ipRegex =
  /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i;
export const numericDashRegex = /^[\d\-\s]+$/;
export const urlRegex =
  /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
export const dateRegex = /\d{4}-\d{1,2}-\d{1,2}/;
export const IPRegex =
  /(\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b)/;

export const validateEmail = (email: string) => {
  // Typical email validation
  return emailRegex.test(email);
};

export const validatePasswordModerate = (password: string) => {
  //Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long
  return passwordRegex.test(password);
};

export const validateUsername = (username: string) => {
  //Alphanumeric string that may include _ and – having a length of 3 to 16 characters –
  return usernameRegex.test(username);
};

export const validateIP = (ip: string) => {
  return IPRegex.test(ip);
};
