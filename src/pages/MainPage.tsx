import React, { useEffect, useState } from "react";
import { ConfigForm } from "../components/Content/ConfigForm";
import { Content } from "../components/Content/Content";
import { GridWrapper } from "../components/GridWrapper";
import { LottieCard } from "../components/Content/LottieCard";
import { MainSVG } from "../styles/svgs/MainSVG";
import {
  IGlobalState,
  useGlobalStatecontext,
} from "../context/GlobalStateContext";
import Sidebar from "../components/Sidebar";
import WelcomeBanner from "../components/WelcomeBanner";
import { ConfigInfo } from "../components/Content/ConfigInfo";
import { processState } from "../helpers/types";

export const MainPage = () => {
  // Design pattern recommended by Kent C. Dodds (Google Expert and creator of React Testing Library)
  // https://epicreact.dev/one-react-mistake-thats-slowing-you-down/

  const [sidebarBoolean, setSidebarBoolean] = useState(true);
  const globalState: IGlobalState = useGlobalStatecontext();
  const { classificationState } = globalState.get;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarBoolean}
        setSidebarOpen={setSidebarBoolean}
      />

      <Content
        Header={
          <WelcomeBanner
            messageTitle={
              classificationState === processState[0] ? "Bienvenido馃" : ""
            }
            messageContent={
              classificationState === processState[0]
                ? "Para iniciar el proceso de clasificaci贸n de residuos s贸lidos inorg谩nicos debes llenar el formulario que se encuentra debajo con la informaci贸n de tus dispositivos."
                : "Puedes monitorizar el estado actual del proceso de clasificaci贸n de residuos s贸lidos inorg谩nicos, o si deseas puedes iniciarlo nuevamente o cambiar la configuraci贸n."
            }
            SVG={<MainSVG />}
          />
        }
        CentralContent={
          <GridWrapper>
            {classificationState === processState[0] ? (
              <ConfigForm />
            ) : (
              <ConfigInfo />
            )}
            <LottieCard />
          </GridWrapper>
        }
      />
    </div>
  );
};
