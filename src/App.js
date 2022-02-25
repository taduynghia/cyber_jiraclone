import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Router,
  useHistory,
} from "react-router-dom";
import "./App.css";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";

import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import LoginCyberBugs from "./templates/CyberBug/LoginCyberBugs/LoginCyberBugs";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import { useDispatch } from "react-redux";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import IndexCyberBugs from "./pages/ProjectDetail/IndexCyberBugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import ModalCyberbugs from "./HOC/CyberHOC/DrawerCyberbugs";
import DrawerCyberbugs from "./HOC/CyberHOC/DrawerCyberbugs";
import DemoDragDrop from "./pages/DemoDragDrop/DemoDragDrop";
import DragAnddropDnd from "./pages/DragAnddropDnd/DragAnddropDnd";

//import { history } from "./ultil/libs/history";
function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "ADD_HISTORY",
      history: history,
    });
  }, []);
  return (
    <>
      <LoadingComponent />
      <DrawerCyberbugs />

      <Switch>
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/about" Component={About} />
        <HomeTemplate exact path="/demodragdrop" Component={DemoDragDrop} />
        <HomeTemplate exact path="/draganddropdnd" Component={DragAnddropDnd} />
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <CyberbugsTemplate exact path="/cyberbugs" Component={IndexCyberBugs} />
        <CyberbugsTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />
        <CyberbugsTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
        <CyberbugsTemplate
          exact
          path="/projectdetail/:projectId"
          Component={IndexCyberBugs}
        />
        <CyberbugsTemplate exact path="/" Component={ProjectManagement} />
      </Switch>
    </>
  );
}

export default App;
