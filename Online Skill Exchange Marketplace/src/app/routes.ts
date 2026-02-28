import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { Chat } from "./pages/Chat";
import { ExploreSkills } from "./pages/ExploreSkills";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { MySkills } from "./pages/MySkills";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/chat",
    Component: Chat,
  },
  {
    path: "/chat/:userId",
    Component: Chat,
  },
  {
    path: "/explore",
    Component: ExploreSkills,
  },
  {
    path: "/profile/:userId",
    Component: Profile,
  },
  {
    path: "/my-skills",
    Component: MySkills,
  },
  {
    path: "/settings",
    Component: Settings,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
]);
