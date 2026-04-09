import Hero from "../components/Hero";
import About from "../components/About";
import Club from "../components/Club";
import Speakers from "../components/Speakers";
import Location from "../components/Location";
import FAQ from "../components/FAQ";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

export default function EmbedPage() {
  return (
    <main>
      <Hero />
      <About />
      <Club />
      <Speakers />
      <Location />
      <Gallery />
      <FAQ />
      <Footer />
    </main>
  );
}
