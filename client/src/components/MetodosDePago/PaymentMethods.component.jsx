import React from "react";

const PaymentMethods = () => {
  return (
    <div className="flex justify-center pt-[50px]">
      <div className="grid w-full grid-cols-1">
        <div className="grid grid-rows-2 items-center">
          <div className="xs:grid-rows-2 xs:grid-cols-1 xs:gap-10 pl-20 pr-20 sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:justify-items-center sm:gap-10">
            <div className="xs:justify-center xs:pb-10 flex w-full sm:justify-end">
              <div className="xs:h-[200px] xs:w-[200px] flex justify-center rounded-lg bg-gray-200 sm:h-[300px] sm:w-[300px]">
                <img
                  className="xs:w-[100px] lg:w-[200px] xl:w-[200px] 2xl:w-[500px]"
                  src="/img/Credit_Card_Logo.svg"
                  alt="Logo"
                />
              </div>
            </div>
            <div className="xs:justify-center flex w-full sm:justify-end">
              <div className="xs:h-[200px] xs:w-[200px] flex justify-center rounded-lg bg-gray-200 sm:h-[300px] sm:w-[300px]">
                <img
                  className="xs:w-[100px] lg:w-[200px] xl:w-[200px] 2xl:w-[500px]"
                  src="/img/Bank_Transfer_Logo.svg"
                  alt="Logo"
                />
              </div>
            </div>
          </div>
          <div className="xs:justify-items-center xs:content-start xs:mb-[0px] xs:h-full mb:justify-items-center mb-[200px] grid grid-cols-1 pl-[200px] pr-[200px]">
            <button
              type="submit"
              className="focus:shadow-outline w-full rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600 focus:outline-none"
            >
              <span>Continuar a Pago</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
