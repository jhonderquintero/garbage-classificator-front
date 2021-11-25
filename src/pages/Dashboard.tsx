import { Content } from "../components/Content/Content";
import { GridWrapper } from "../components/GridWrapper";
import { MainProcessCard } from "../components/Dashboard/MainProcessCard";
import { ProcessCard } from "../components/Dashboard/ProcessCard";
import { SecondaryProcessCard } from "../components/Dashboard/SecondaryProcessCard";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Sidebar from "../components/Sidebar";
import WelcomeBanner from "../components/WelcomeBanner";
import {
  IGlobalState,
  useGlobalStatecontext,
} from "../context/GlobalStateContext";
import { MainSVG } from "../styles/svgs/MainSVG";
import { processState } from "../helpers/types";

export const Dashboard = () => {
  const [sidebarBoolean, setSidebarBoolean] = useState<boolean>(true);
  const history = useHistory();

  const globalState: IGlobalState = useGlobalStatecontext();

  useEffect(() => {
    if (
      globalState.get.classificationState === processState[0] ||
      globalState.get.classificationState === processState[1]
    ) {
      history.replace("/");
    }
  }, [globalState.get.classificationState, history]);

  const handleStop = () => {
    if (globalState.get.deviceCommunicationInstance) {
      globalState.get.deviceCommunicationInstance.stop();
    } else {
      alert("No hay proceso para detener");
    }
  };

  const handleInit = () => {
    if (globalState.get.deviceCommunicationInstance) {
      globalState.get.deviceCommunicationInstance.init();
    } else {
      alert("No hay proceso para continuar");
    }
  };

  const handleIPChange = () => history.push("/");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarBoolean}
        setSidebarOpen={setSidebarBoolean}
      />

      <Content
        Header={
          <WelcomeBanner
            messageTitle="Proceso iniciado⏱"
            messageContent={
              <div>
                <button className="btn btn-primary mr-1.5" onClick={handleStop}>
                  Detener Proceso
                </button>
                <button className="btn btn-primary mr-1.5" onClick={handleInit}>
                  Continuar Proceso
                </button>
                <button className="btn btn-primary" onClick={handleIPChange}>
                  Reasignar Direcciones IP
                </button>
              </div>
            }
            SVG={<MainSVG />}
          />
        }
        CentralContent={
          <GridWrapper>
            <MainProcessCard />
            <SecondaryProcessCard />
          </GridWrapper>
        }
        Footer={
          <ProcessCard
            spanSize="12"
            title="Integrantes: Jhonder Quintero, Omer Marquez, Diego Campos"
          />
        }
      />
    </div>
  );
};
