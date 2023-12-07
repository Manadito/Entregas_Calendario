import React from "react";
import MetodosDePago from "../../components/MetodosDePago/MetodosDePago.component";
import Header from "../../components/Header/Header.component";

const PaginaDePagos = () => {
  return (
    <div className="grid h-screen grid-rows-[auto,1fr,auto]">
      <Header></Header>
      <MetodosDePago></MetodosDePago>
      {/* <PaymentMethods></PaymentMethods>  */}
    </div>
  );
};

export default PaginaDePagos;
