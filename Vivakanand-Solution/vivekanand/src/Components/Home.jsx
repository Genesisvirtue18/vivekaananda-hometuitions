import Courses from "./Courses"
import HeroSection from "./HeroSction"
import Feature from "./Feature"
import NavBar from "./NavBar"
import StepsSection from "./SetpSection"
import TutorsConnect from "./TutorConnect"
import JoinTutor from "./JoinTutor"
import Footer from "./Footer"
import BrightStudent from "./BrightStudent"


const Home = () => {
  return (
   <div>
    <NavBar />
    <HeroSection />
    <Courses  id="courses-section"/>
    <Feature />
    <StepsSection />
    <TutorsConnect />
    <JoinTutor />
    <BrightStudent />
    <Footer />
    </div>
  )
}

export default Home
