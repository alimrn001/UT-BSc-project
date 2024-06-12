import { Outlet } from "react-router-dom";
import EmbedNavbar from "./shared/navbar/EmbedNavbar";

export default function EmbedLayout() {
  return (
    <div className="rtl bg-1 text-1">
      <div className="clear"></div>
      <EmbedNavbar />
      <div className="clear"></div>
      <Outlet />
      <div className="clear"></div>
    </div>
  );
}
