import { useEffect, useState } from "react";
import {
  IGlobalState,
  useGlobalStatecontext,
} from "../../context/GlobalStateContext";
import { DeviceCommunication } from "../../helpers/DeviceCommunication";
import { processState } from "../../helpers/types";
import LottieAnimation1 from "../../styles/lottiefiles/data.json";
import { LottieComponent } from "./LottieComponent";

const classificationParser = (classification: string | null) => {
  switch (classification) {
    case 'metal':
      return 'Metal';
    case 'paper':
    case 'cardboard':
      return 'Papel/Cartón';
    case 'plastic':
      return 'Plastico';
    default:
      return '';
  }
};

export const MainProcessCard = () => {
  const globalState: IGlobalState = useGlobalStatecontext();
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [classification, setClassification] = useState<string | null>(null);

  useEffect(() => { 
    let instance: null | DeviceCommunication = null;
    if (globalState.get.deviceCommunicationInstance) {
      instance = globalState.get.deviceCommunicationInstance;
    } else {
      instance = new DeviceCommunication(
        globalState.get.devicesIp,
        globalState.get.neuralNetworkIp,
        null
      );

      globalState.set.setDeviceCommunicationInstance(instance);
    };

    instance.init();

    const callback = (event: any) => {
      const { nextStage, url, classification } = event.detail;
      globalState.set.setClassificationState(nextStage);
      if (url) setImgUrl(url);
      if (classification) setClassification(classification);

      // Reset Image
      if (nextStage === processState[2]) {
        setImgUrl(null);
        setClassification(null);
      }
    };

    const errorCallback = (event: any) => {
      const { error } = event.detail;
      console.error('Error in the listener:', error);
    };

    instance.addEventListener('next', callback);
    instance.addEventListener('error', errorCallback);

    // Remove listeners when component unmount, class will still be running in the backgound
    function cleanUp() {
      instance?.removeEventListener('next', callback);
      instance?.removeEventListener('error', errorCallback);
    }

    return cleanUp;
  }, [globalState.get.classificationState, globalState.get.deviceCommunicationInstance, globalState.get.devicesIp, globalState.get.neuralNetworkIp, globalState.set]);

  useEffect(() => {
    console.log(globalState.get.classificationState);
  }, [globalState.get.classificationState]);

  return (
    <div className="img-container bg-blue col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 flex flex-col justify-center p-4">
      <div style={{ width: 'fit-content' }} className="mr-auto">
        {
          imgUrl && (
            <>
              <h2 className="text-2xl text-gray-800 font-bold mb-1 p-4 text-center">Imagen Detectada</h2>
              <img
                alt="Material Detectado"
                src={imgUrl}
                width="328"
                height="246"
              />
            </>
          )
        }
      </div>

      <div style={{ width: 'fit-content'}} className="m-auto">
        <h2 className="text-2xl text-gray-800 font-bold mb-1 p-4 text-center">
          {globalState.get.classificationState === processState[2]
            ? "Detectando material..."
            : null}
          {globalState.get.classificationState === processState[3]
            ? "Material Detectado"
            : null}
          {globalState.get.classificationState === processState[4]
            || globalState.get.classificationState === processState[5]
            ? "Leyendo Sensor Infrarrojo en Cámara..."
            : null}
          {globalState.get.classificationState === processState[6]
            ? "Encendiendo Luces LED..."
            : null}
          {globalState.get.classificationState === processState[7]
            ? "Capturando Imagen..."
            : null}
          {globalState.get.classificationState === processState[8]
            ? "Inteligencia Artificial Analizando Imagen..."
            : null}
          {globalState.get.classificationState === processState[9]
            ? "Encendiendo Motor..."
            : null}
          {globalState.get.classificationState === processState[10]
            ? `Leyendo Sensor ${classificationParser(classification)}`
            : null}
          {globalState.get.classificationState === processState[11]
            || globalState.get.classificationState === processState[12]
            ? `Activando Servomotor ${classificationParser(classification)}`
            : null}
          {globalState.get.classificationState === processState[13]
            ? `Material Clasificado: ${classificationParser(classification)}`
            : null}
        </h2>

        <LottieComponent
          width={250}
          height={250}
          LottieAnimation={LottieAnimation1}
          autoPlay={false}
        />
      </div>
    </div>
  );
};
