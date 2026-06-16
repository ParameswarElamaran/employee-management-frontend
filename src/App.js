import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import EmployeeList from "./components/EmployeeList";

function HomePage() {
  return (
    <>
      <Hero
        name="Parameswar"
        role="Java Full Stack Developer"
        message="Building websites, APIs, and Android apps."
      />
      <Skills />
      <Projects />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </HashRouter>
  );
}

export default App;