import React from "react";
import { Link } from "react-router-dom";

const MetodosDePago = () => {
  return (
    <div className="grid content-center justify-items-center bg-white">
      <div className="grid h-[500px] w-[500px] content-center justify-items-center gap-10 rounded-xl bg-gray-300 pb-[50px] pl-[50px] pr-[50px] pt-[50px] drop-shadow-md">
        {" "}
        <span>Por favor seleccione su metodo de pago</span>{" "}
        <div className="w-full lg:flex lg:justify-center lg:rounded-xl">
          <Link>
            <div className="mr-[30px] flex h-[170px] w-[170px] items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200">
              <img
                className="w-[150px]"
                src="/img/Credit_Card_Logo.svg"
                alt="Logo"
              />
            </div>
          </Link>
          <Link to="/transferencias">
            <div className="ml-[30px] flex h-[170px] w-[170px] items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200">
              <img
                className="w-[150px]"
                src="/img/Bank_Transfer_Logo.svg"
                alt="Logo"
              />
            </div>
          </Link>
        </div>
        <button
          type="submit"
          className="focus:shadow-outline w-full rounded bg-orange-500 px-4 py-4 font-bold text-white hover:bg-orange-600 focus:outline-none"
        >
          <span>Continuar</span>
        </button>
      </div>
    </div>
  );
};

export default MetodosDePago;
