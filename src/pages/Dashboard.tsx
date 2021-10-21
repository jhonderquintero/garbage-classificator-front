import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Content } from "../components/Content/Content";
import { MainProcessCard } from "../components/Dashboard/MainProcessCard";
import { ProcessCard } from "../components/Dashboard/ProcessCard";
import { SecondaryProcessCard } from "../components/Dashboard/SecondaryProcessCard";
import { GridWrapper } from "../components/GridWrapper";
import Sidebar from "../components/Sidebar";
import WelcomeBanner from "../components/WelcomeBanner";
import {
  IGlobalState,
  useGlobalStatecontext,
} from "../context/GlobalStateContext";
import { processState } from "../helpers/types";
import { MainSVG } from "../styles/svgs/MainSVG";

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
            messageContent=""
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
