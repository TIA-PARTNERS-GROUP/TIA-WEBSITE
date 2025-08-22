import Header from "../components/Header/Header";
import TestimonialSlider from "../components/Testimonial/Testimonial";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import LoadingSpinner from "../components/Hero/LoadingSpinner";

const MainLayout = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Header />

        <main>
          <Outlet /> {}
        </main>

        <TestimonialSlider />
        <Footer />
      </Suspense>
    </>
  );
};

export default MainLayout;
