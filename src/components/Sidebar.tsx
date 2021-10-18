import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { DashboardSVG } from "../styles/svgs/DashboardSVG";
import { MainSVG } from "../styles/svgs/MainSVG";

const Sidebar: React.FC<ISidebar> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split("/")[1];

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="lg:w-64">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-gray-800 p-4 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Logo */}
          <NavLink exact to="/" className="block flex flex-row">
            <MainSVG />
            <p className="text-white ml-2 text-xs uppercase font-semibold mt-2">
              Clasificador de Residuos
            </p>
          </NavLink>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
            Vistas
          </h3>
          <ul className="mt-3">
            {/* Dashboard */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                page !== "" && "bg-gray-900"
              }`}
            >
              <NavLink
                exact
                to="/dashboard"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page !== "" && "hover:text-gray-200"
                }`}
              >
                <div className="flex flex-grow">
                  <DashboardSVG page={page} />
                  <span className="text-sm font-medium">Dashboard</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

interface ISidebar {
  sidebarOpen: boolean;
  setSidebarOpen: Function;
}
