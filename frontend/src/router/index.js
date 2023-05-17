// LIBRARIES
import { Routes, Route } from "react-router-dom";

// COMPONENTS
import QuantumPoetry from "../views/quantum_poetry";

const router = () => {
  return (
    <Routes>
      {/* HOME */}
      <Route exact path="/" element={<></>} />

      {/* QUANTUM POETRY */}
      <Route exact path="/quantum_poetry" element={<QuantumPoetry />} />
    </Routes>
  );
};

export default router;