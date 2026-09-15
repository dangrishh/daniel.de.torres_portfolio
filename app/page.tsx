import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <div className="divider"></div>
      <About />
      <div className="divider"></div>
      <Skills />
      <div className="divider"></div>
      <Experience />
      <div className="divider"></div>
      <Portfolio />
      <div className="divider"></div>
      <Testimonials />
      <div className="divider"></div>
      <Clients />
      <div className="divider"></div>
      <Contact />
      <Footer />
      <ScrollTop />
    </>
  );
}
