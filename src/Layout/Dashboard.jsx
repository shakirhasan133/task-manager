// import { CustomScroll } from "react-custom-scroll";
// import DashNav from "../Components/Dashboard/DashNav";
import DashNav from "../Component/Dashboard/DashNav";
import UseAuth from "../Hooks/UseAuth";

import { Outlet } from "react-router";
import SideMenu from "./../Component/Dashboard/SideMenu";

const Dashboard = () => {
  const { isSideMenuOpen } = UseAuth();
  return (
    <div className="font-primary bg-bodyColor min-h-screen">
      <DashNav></DashNav>
      <div className="flex font-primary">
        <div className={`${isSideMenuOpen ? "w-3/12" : "w-0"} `}>
          <div className={` ${isSideMenuOpen ? "block" : "hidden "}`}>
            <SideMenu></SideMenu>
          </div>
        </div>

        <div
          className={`${isSideMenuOpen ? " md:w-9/12" : "md:w-full"} w-screen`}
        >
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
