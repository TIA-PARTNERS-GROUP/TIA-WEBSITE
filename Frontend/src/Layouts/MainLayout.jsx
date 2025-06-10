import Header from "../components/Header/Header";
import TestimonialSlider from "../components/Testimonial/Testimonial";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet /> {}
      </main>

      <TestimonialSlider />
      <Footer />
    </>
  );
};

export default MainLayout;
