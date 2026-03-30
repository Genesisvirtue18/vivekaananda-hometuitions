import { useState } from 'react'
import Home from './Components/Home';
import About from './About/about';
import Demo from './Demo/Demo-class';
import Contact from './Contact/contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tutor from './Tutor/Tutor';
import Expertteam from './Team/Expertteam'
import Grade from './Grade/grade';
import Dashboard from './Dashboard/Dashboard';
import TutorRegistration from './Tutor/TutorRegistration';
import FeeStructureForm from './FeeStructure/FeeStructureForm';
import PrivacyPolicy from './PrivacyPolicy/privacypolicy';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/demo' element={<Demo />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/tutor' element={<Tutor />} />
        <Route path='/expert' element={<Expertteam />} />
        <Route path='/info' element={<Grade />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tutor-registration" element={<TutorRegistration />} />
        <Route path="/fee-details" element={<FeeStructureForm />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />





      </Routes>
    </Router>
  )
}

export default App
