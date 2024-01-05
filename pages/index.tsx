import About from "@/components/About";
import ContactMe from "@/components/ContactMe";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import type { NextPage } from "next";
import Link from "next/link";
import ericPhoto from '../public/eric.jpeg'

const Home: NextPage = ()=> {
  return ( 
  <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
  <head><title>ERIC</title></head>
  <Header/>
    
  <section id="hero" className="snap-start">
    <Hero/>
  </section>

  <section id='about' className="snap-center">
    <About/>
  </section>
  
  <section id="experience" className=" snap-center ">
    <WorkExperience/>
  </section>

  <section id="skills" className=" snap-center ">
    <Skills/>
  </section>
  
  <section id="projects" className=" snap-center ">
    <Projects/>
  </section>
  
  <section id="contact" className=" snap-center ">
    <ContactMe/>
  </section>

  <Link href='#hero'>
    <footer className="sticky bottom-5 w-full cursor-pointer">
      <div className="flex items-center justify-center">
        <img className="h-10 w-10 rounded-full filter grayscale hover:grayscale-0 cursor-pointer" src={ericPhoto.src} alt="" />
      </div>
    </footer>
  </Link>
  
</div>
  )
}


export default Home