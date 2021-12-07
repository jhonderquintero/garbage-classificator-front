import { initialSensor, cameraSensor, metalSensor, plasticSensor, paperSensor } from "./sensors";
import { LEDPin, takePicture, activeMotor as changeMotorState, metalServo, plasticServo, paperServo, displayString } from "./actuators";
import { processState } from "./types";
import { getClassification } from "./DeepLearning";

const sleep = (time: number = 1500) : Promise<void> => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, time);
  })
}

// API Doc: https://developer.mozilla.org/en-US/docs/Web/API/Event/target
export class DeviceCommunication extends EventTarget {
  devicesIp: string;
  neuralNetworkIp: string;
  private shouldStop: boolean;
  private stage = processState[2]; // Inits in stage two, on init, scale as needed

  // For the classification process only
  image: null | Blob = null;
  classification: null | string = null;

  constructor(devicesIp: string, neuralNetworkIp: string, initialStage: string | null) {
    super();
    this.devicesIp = devicesIp;
    this.neuralNetworkIp = neuralNetworkIp;
    this.shouldStop = true;
    if(initialStage) this.stage = initialStage;
  }

  async init() {
    // This will avoid running the same instance more then once
    // on multiple init calls across the app, must be stopped before init again
    if (this.shouldStop === false) return;
    this.shouldStop = false;

    const updateState = () => {
      const keys = Object.keys(processState);
      const ix = keys.findIndex((key, ix) => (processState[ix] === this.stage));
  
      if (ix === keys.length - 1) {
        // Reset for next loop
        this.dispatchEvent(new CustomEvent('next', { detail: { nextStage: processState[2] } }));
        this.stage = processState[2]; // Update stage for the new iteration
      } else {
        this.dispatchEvent(new CustomEvent('next', { detail: { nextStage: processState[ix + 1] } }));
        this.stage = processState[ix + 1]; // Update stage for the new iteration
      }
    }
    
    try {
      while (!this.shouldStop) {
        if (this.stage === processState[2]) {
          await displayString(this.devicesIp, encodeURI('Esperando\r\nMaterial'));
          while (!(await initialSensor(this.devicesIp))) await sleep()
          updateState();
        };

        if (this.stage === processState[3]) {
          await displayString(this.devicesIp, 'Identificando...');
          await changeMotorState(this.devicesIp, 'HIGH');
          updateState();
        };
      
        if (this.stage === processState[4]) {
          while (!(await cameraSensor(this.devicesIp))) await sleep();
          while (await cameraSensor(this.devicesIp)) await sleep();
          await sleep(1500);
          updateState();
        };
      
        if (this.stage === processState[5] || this.stage === processState[11]) {
          await changeMotorState(this.devicesIp, 'LOW');
          updateState();
        };
      
        if (this.stage === processState[6]) {
          await LEDPin(this.devicesIp, 'HIGH');
          updateState();
        };
      
        if (this.stage === processState[7]) {
        const image = await takePicture(this.devicesIp);
        await LEDPin(this.devicesIp, 'LOW');
        // Save image locally as blob to ease send it to the NN server
        this.image = await image.blob();
        const url = URL.createObjectURL(this.image);

        // Send a custom event to allow the front end access the url image
        this.dispatchEvent(new CustomEvent('next', { detail: { nextStage: processState[8], url } }));
        this.stage = processState[8]; // Update stage for the new iteration
        };
      
        if (this.stage === processState[8]) {
        // Get classification from the Deep Learning server
          if (this.image) {
            this.classification = await getClassification(this.neuralNetworkIp, this.image);
            this.dispatchEvent(new CustomEvent('next', {
              detail: {
                nextStage: processState[9],
                classification: this.classification,
              }
            }));
            this.stage = processState[9]; // Update stage for the new iteration
          } else {
            throw new Error("Classification step reached without image");
          }
        };

        if (this.stage === processState[9]) {
          if (this.classification === 'metal') {
            await displayString(this.devicesIp, encodeURI('Material:\r\nMetal'));
          };
          if (this.classification === 'plastic') {
            await displayString(this.devicesIp, encodeURI('Material:\r\nPlastico'));
          }
          if (this.classification === 'paper' || this.classification === 'cardboard') {
            await displayString(this.devicesIp, encodeURI('Material: Papel\r\nCarton'));
          };

          await changeMotorState(this.devicesIp, 'HIGH');
          updateState();
        };
      
        if (this.stage === processState[10]) {
          // Read material sensor
          if (this.classification === 'metal') {
            while (!(await metalSensor(this.devicesIp))) await sleep();
          };
          if (this.classification === 'plastic') {
            while (!(await plasticSensor(this.devicesIp))) await sleep();
          }
          if (this.classification === 'paper' || this.classification === 'cardboard') {
            while (!(await paperSensor(this.devicesIp))) await sleep();
          };

          await sleep(4250);

          updateState();
        };
      
        if (this.stage === processState[12]) {
          if (this.classification === 'metal') {
            await metalServo(this.devicesIp, '135');
            await metalServo(this.devicesIp, '180');
          };
          if (this.classification === 'plastic') {
            await plasticServo(this.devicesIp, '135');
            await plasticServo(this.devicesIp, '180');
          }
          if (this.classification === 'paper' || this.classification === 'cardboard') {
            await paperServo(this.devicesIp, '135');
            await paperServo(this.devicesIp, '180');
          };
          updateState();
        };
      
        if (this.stage === processState[13]) {
          console.log('Final del Loop alcanzado, reiniciando en 2 segundos');
          
          // Reset props
          this.classification = null;
          this.image = null;
          // Wait 2 seconds before next iteration
          await sleep(2000);
          updateState();
        };
      }
    } catch (error: any) {
      console.error(error);
      this.dispatchEvent(new CustomEvent('error', { detail: error.toString() }));
      this.stop(); // Auto Stop, let the user choose to reinit or not
    }
  }

  stop() {
    console.log('Stopping Class, the unresolved promises will still be resolved...');
    this.shouldStop = true;
  }
}

// const a = new DeviceCommunication('1', '2');
// a.init();
// 
// setTimeout(() => {
  // console.log('Attempting to stop');
  // a.stop();
// }, 5000);
