import { Outlet } from "react-router-dom";
import Navbar from "./shared/navbar/Navbar";
import Footer from "./shared/footer/Footer";

export default function Layout() {
  return (
    <div className="rtl bg-1 text-1">
      <div className="clear"></div>
      <Navbar />
      <div className="clear"></div>
      <Outlet />
      <div className="clear"></div>
      <Footer />
    </div>
  );
}
