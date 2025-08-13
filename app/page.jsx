// app/page.jsx
import Hero from "./components/hero";
import Categories from "./components/category";
import HowItWorks from "./components/howitworks";
import SuccessStories from "./components/testimonial";
import { WhyChooseUs, UpcomingEvents } from "./components/whychooseus";
import FAQ from "./components/faq";
import GlobalPlanes from "./components/planes";

export default function Home() {
  return (
    <div className="bg-white relative">
      {/* Planes background - fixed position covers entire viewport */}
      <GlobalPlanes />
      
      {/* Content container with higher z-index */}
      <div className="relative z-10">
        <Hero/>
        <Categories/>
        <HowItWorks/>
        <SuccessStories/>
        <WhyChooseUs />
        <UpcomingEvents />
        <FAQ/>
      </div>
    </div>
  );
}