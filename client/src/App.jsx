import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Calendario from "./components/Calendario/Calendario.component";

function App() {
  return (
    <div className="grid h-screen w-screen bg-white">
      {/*  <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/pago" element={<PaginaDePagos />} />
        <Route path="/transferencias" element={<PaginaDeTransferencia />} />
      </Routes> */}
      <Calendario></Calendario>
    </div>
  );
}

export default App;
