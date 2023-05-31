// LIBRARIES
import { Routes, Route } from "react-router-dom";

// COMPONENTS
import Home from "../views/home";
import About from "../views/about"
import QuantumPoetry from "../views/quantum_poetry";

const router = () => {
  return (
    <Routes>
      {/* HOME */}
      <Route exact path="/" element={<Home/>} />

      {/* ABOUT */}
      <Route exact path="/about" element={<About/>} />

      {/* QUANTUM POETRY */}
      <Route exact path="/quantum_poetry" element={<QuantumPoetry />} />
    </Routes>
  );
};

export default router;