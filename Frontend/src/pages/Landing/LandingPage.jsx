import HeaderComponent from "../../components/Header/Header";
import HeroAnimationComponent from "../../components/Hero/HeroAnimation";
import HeroHeadingComponent from "../../components/Hero/HeroHeading";
import HeroFeatures from "../../components/Hero/HeroFeatures";
import DashboardPage from "../Portal/Dashboard/DashboardPage";
import Sidebar from "../../components/Portal/Sidebar/Sidebar";
import SlantedBackground from "../../components/Hero/SlantedBackground";

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden">
      <SlantedBackground />
      <main className="relative z-0">
        <div className="container mx-auto flex flex-col items-center gap-y-16 px-6 py-24 text-center">
          <HeroHeadingComponent />
          <div className="flex relative w-full max-w-6xl font-poppins pointer-events-none select-none opacity-90">
            <Sidebar activePage={"dashboard"} />
            <DashboardPage mock={true} />
            
            {/* Single overlay that covers both sidebar and dashboard */}
            <div className="absolute inset-0 z-50" 
                 style={{ pointerEvents: 'all' }} />
          </div>
          <HeroFeatures />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
