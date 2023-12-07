import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // STATE VARIABLES
  const [guiaMasterData, setGuiaMasterData] = useState({
    instrucciones: "Embajada",
    comentario: "",
    personaContacto: "",
    descripcion: "",
    fechaHoraEntrega: "",
  });

  const [guiaHijaData, setGuiaHijaData] = useState({
    clienteid: "234",
    proyectoid: "366",
    centrocostoid: "1",
    tipopaqueteid: "194",
    comentario: "",
    peso: "0,4",
    cantidad: "1",
    valor: "0",
    direccionEntrega: "",
    referenciaEntrega: "",
    cantonEntrega: "",
    codigoPostalEntrega: "",
    destinatarioNombre: "",
    destinatarioEmpresa: "",
    destinatarioRuc: "",
    destinatarioTelefono: "",
    destinatarioCorreo: "",
    personalizado1: "",
    personalizado2: "",
    personalizado3: "",
    personalizado4: "",
    customId: "Pasaporte",
  });

  // JSX
  return (
    <AppContext.Provider
      value={{
        guiaMasterData,
        setGuiaMasterData,
        guiaHijaData,
        setGuiaHijaData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// We will import useAppContext into the components that require specific states from this file
// We will import them like so: import { useAppContext } from '../contexts/AppContext'
export const useAppContext = () => {
  return useContext(AppContext);
};
