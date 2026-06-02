import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GSAPEffects from './components/GSAPEffects';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <GSAPEffects />
      <Navbar />
      <Hero />
      <Stats />
      <Skills />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
