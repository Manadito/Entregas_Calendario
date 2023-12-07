import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import PaginaInicio from "./views/PaginaInicio/PaginaInicio.view";
import Calendario from "./components/Calendario/Calendario.component";

function App() {
  return (
    <div className="grid h-screen w-screen bg-white">
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/calendario" element={<Calendario />} />
      </Routes>
    </div>
  );
}

export default App;
