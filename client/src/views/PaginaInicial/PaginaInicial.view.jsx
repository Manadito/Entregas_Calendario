import React from "react";
import FormularioDeUsuario from "../../components/FormularioDeUsuario/FormularioDeUsuario.component";
import Header from "../../components/Header/Header.component";

const PaginaInicial = () => {
  return (
    <div className="grid h-screen grid-rows-[auto,1fr,auto]">
      <Header></Header>
      <FormularioDeUsuario></FormularioDeUsuario>
    </div>
  );
};

export default PaginaInicial;
