import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import VisaCategories from "../components/Sections/VisaCategories";
import PopularCountries from "../components/Sections/PopularCountries";
import WhyChooseUs from "../components/Sections/WhyChooseUs";
import VisaProcess from "../components/Sections/VisaProcess";
import Stats from "../components/Sections/Stats";
import Testimonials from "../components/Sections/Testimonials";
import FAQ from "../components/Sections/FAQ";
import Footer from "../components/Footer/Footer";
import WhatsappButton from "../components/Buttons/WhatsappButton";
function Home() {

  return (
    <>
      <Navbar />
      <Hero />
      <VisaCategories />
      <PopularCountries />
      <WhyChooseUs />
<Stats />
<VisaProcess />
<Testimonials />
<FAQ />
<WhatsappButton />
<Footer />

    </>
  );
}

export default Home;