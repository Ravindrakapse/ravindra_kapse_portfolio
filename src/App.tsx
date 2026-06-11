import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Features from './components/Features'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="bg-black">
      <Hero />
      <About />
      <Experience />
      <Features />
      <Skills />
      <Contact />
    </div>
  )
}
