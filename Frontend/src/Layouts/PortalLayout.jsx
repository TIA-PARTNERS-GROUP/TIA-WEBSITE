import Sidebar from "../components/Portal/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

// Alternate Layout for Portal pages

const PortalLayout = () => {
  return (
    <>
      <div className="font-poppins flex flex-col min-h-screen">
        <div className="flex flex-1">
            <aside class="h-screen sticky top-0">
                <Sidebar />
            </aside>
            
            <div className="flex-1 flex flex-col">
              <main className="flex-1">
                <Outlet /> {}
              </main>

              <Footer />
            </div>
        </div>
      </div>
    </>
  );
};

export default PortalLayout;