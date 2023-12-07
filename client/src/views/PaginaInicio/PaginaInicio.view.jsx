import React from "react";
import Header from "../../components/Header/Header.component";
import InputIdUsuario from "../../components/InputIdUsuario/InputIdUsuario.component";

const PaginaInicial = () => {
  return (
    <div className="grid h-screen grid-rows-[auto,1fr,auto]">
      <Header></Header>
      <InputIdUsuario></InputIdUsuario>
    </div>
  );
};

export default PaginaInicial;
