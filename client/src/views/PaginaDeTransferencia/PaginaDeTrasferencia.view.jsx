import React from "react";
import Header from "../../components/Header/Header.component";
import CargaDeDocumentos from "../../components/CargaDeDocumentos/CargaDeDocumentos.component";

const PaginaDeTransferencia = () => {
  return (
    <div className="grid h-screen grid-rows-[auto,1fr,auto]">
      <Header></Header>
      <CargaDeDocumentos></CargaDeDocumentos>
    </div>
  );
};

export default PaginaDeTransferencia;
