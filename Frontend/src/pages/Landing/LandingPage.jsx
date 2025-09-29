import HeaderComponent from "../../components/Header/Header";
import HeroAnimationComponent from "../../components/Hero/HeroAnimation";
import HeroHeadingComponent from "../../components/Hero/HeroHeading";
import HeroFeatures from "../../components/Hero/HeroFeatures";
import DashboardPage from "../Portal/Dashboard/DashboardPage";
import Sidebar from "../../components/Portal/Sidebar/Sidebar";

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Slanted, Fading Blue Background */}
      <div
        className="absolute left-0 w-full h-full -z-10 transform -rotate-12 origin-top-left" // Added transform and origin back
        style={{
          // Adjust 'top' to move it down the page
          top: "70%", // Example: moves the background div down by 20% of its parent's height

          // Use a very light blue and a high angle for the gradient
          // The angle here for the gradient refers to the direction of the fade,
          // while 'rotate-6' creates the overall slant of the div.
          background: "linear-gradient(150deg, #E0F2FE 0%, transparent 60%)",

          // You might need to increase height/width to ensure it covers the area
          // especially after rotation and if moved down.
          height: "120%", // Increase height to prevent cut-off at bottom
          width: "150%", // Increase width to prevent cut-off at right
          // Also adjust left/top if the larger size shifts it too much
          // left: '-10%',
        }}
      ></div>

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
