import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import EmployeeList from "./components/EmployeeList";
function App() {
  return (
    <div>
      <Navbar />

      <Hero
        name="Parameswar"
        role="Java Full Stack Developer"
        message="Building websites, APIs, and Android apps."
      />

      <Skills />

      <Projects />
      <EmployeeList />
    </div>
  );
}

export default App;