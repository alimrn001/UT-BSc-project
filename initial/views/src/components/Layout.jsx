import { Outlet } from "react-router-dom";
import Navbar from "./shared/navbar/Navbar";

export default function Layout() {
  return (
    <div className="rtl">
      <div className="clear"></div>
      <Navbar />
      <div className="clear"></div>
      <Outlet />
      <div className="clear"></div>
      {/* <Footer /> */}
    </div>
  );
}
