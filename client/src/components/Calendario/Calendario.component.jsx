import React, { useState } from "react";
import { generateDate, months } from "../../utils/Calendar.utils";
import cn from "../../utils/Cn.utils";
import dayjs from "dayjs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Calendario = () => {
  // I) Hooks and variables
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  console.log(generateDate());
  return (
    <div className=" bg-zinc-600 lg:m-10  lg:rounded-xl">
      <div className="sm:grid sm:h-full sm:grid-cols-none md:grid md:h-full md:grid-cols-none md:max-lg:grid-rows-6 lg:grid lg:h-full lg:grid-cols-3 lg:grid-rows-1">
        <div className="grid justify-items-center sm:row-span-1 sm:grid sm:content-start sm:justify-items-center sm:pb-0 sm:pt-0 md:row-span-1 md:grid md:w-full md:content-center md:justify-center md:pb-0 md:pt-0 lg:grid lg:h-full lg:content-start lg:justify-center lg:gap-3 lg:rounded-l-xl lg:border-b-4 lg:border-l-4 lg:border-r-2 lg:border-t-4 lg:border-indigo-500 lg:pt-10">
          <img
            className="w-[200px] pb-2 pl-0 pr-0 pt-10 sm:w-[200px] sm:pb-2 sm:pl-0 sm:pr-0 sm:pt-10 md:w-full md:pb-2 md:pt-10 lg:w-[200px] lg:pl-0 lg:pr-0 lg:pt-0 xl:w-[200px] "
            src="/img/Grupo_Entregas_Logo.svg"
            alt="Logo"
          />
          <div className="flex justify-center">
            <h1 className="xs:pb-2 xs:pt-2 xs:text-xl xs:font-semibold sm:pb-2 sm:pt-2 sm:text-xl sm:font-semibold md:pb-2 md:pt-2 md:text-xl md:font-semibold">
              Bienvenido
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <p className="pb-4">Elija la fecha de retiro de su documento</p>
          </div>
        </div>
        <div className="grid sm:row-span-5 md:row-span-5 lg:col-span-2 lg:h-full lg:rounded-r-xl lg:border-b-4 lg:border-l-2 lg:border-r-4 lg:border-t-4 lg:border-indigo-500 lg:bg-slate-300">
          <div className="grid h-full w-full justify-items-center sm:grid sm:grid-rows-3 md:grid md:grid-rows-3 lg:grid lg:h-full lg:grid-cols-3 lg:grid-rows-1 lg:justify-items-center">
            <div className="grid w-full justify-items-center bg-white sm:row-span-1 sm:pl-28 sm:pr-28 md:row-span-1 md:pl-36 md:pr-36 lg:col-span-2 lg:w-full lg:pl-0 lg:pr-0 lg:pt-10">
              <div className="grid h-full content-center justify-items-center sm:w-[500px] sm:pb-5 sm:pl-10 sm:pr-10 sm:pt-5 md:max-lg:w-[500px] lg:h-full lg:w-full lg:content-start lg:pt-0">
                <div className="mx-auto pb-5">
                  Por favor seleccione una fecha y hora
                </div>
                <div className="flex w-[315px] justify-between sm:w-[335px] md:w-[335px] lg:w-[335px] xl:w-[375px]">
                  {/* We import "months" from our Calendar utility and use it to
              display the name of the current month. This way, "today.month()"
              gives us, today the value of "12". Our array "months[0]" is obtains 
              the string "Diciembre". 
           */}
                  <h1>
                    {months[today.month()]}, {today.year()}
                  </h1>
                  <div className="flex cursor-pointer items-center gap-5">
                    <GrFormPrevious
                      className="cursor-pointer"
                      onClick={() => {
                        setToday(today.month(today.month() - 1));
                      }}
                    />
                    <h1 className="cursor-pointer">Hoy</h1>
                    <GrFormNext
                      className="cursor-pointer"
                      onClick={() => {
                        setToday(today.month(today.month() + 1));
                      }}
                    />
                  </div>
                </div>
                <div className="grid w-[325px] grid-cols-7 sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[400px]">
                  {daysOfWeek.map((day, index) => {
                    return (
                      <h1
                        key={index}
                        className="grid h-10 place-content-center sm:max-xl:h-14"
                      >
                        {day}
                      </h1>
                    );
                  })}
                </div>
                <div className="grid w-[325px] grid-cols-7 sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[400px]">
                  {generateDate(today.month(), today.year()).map(
                    (
                      { date, currentMonth, today, saturday, sunday },
                      index,
                    ) => {
                      return (
                        <div
                          key={index}
                          className="grid h-12 place-content-center sm:max-xl:h-14"
                        >
                          {/*     
              The cn util allows us to check conditions. For example, if current
              month is "false" then we apply "text-gray-400" and if today is "true"
              we apply "bg-red-600". In the last line, don't forget to add a space 
              like so " grid..." and not leave it like "grid", else the styles will
              be read like "text-whiteh-10 ..." instead of "text-white h-10"!
               */}
                          <h1
                            className={cn(
                              "grid h-8 w-8 cursor-pointer place-content-center rounded-full transition-all hover:bg-orange-500 hover:text-white",
                              currentMonth &&
                                !saturday &&
                                !sunday &&
                                " bg-[#FAE8D7] text-orange-500",
                              currentMonth
                                ? ""
                                : " pointer-events-none text-white",
                              today && " bg-red-600 text-white",
                              (saturday || sunday) &&
                                !today &&
                                " pointer-events-none",
                              selectDate.toDate().toDateString() ===
                                date.toDate().toDateString() &&
                                !today &&
                                !saturday &&
                                !sunday
                                ? " bg-orange-500 text-white"
                                : " cursor-pointer hover:bg-orange-500 hover:text-white",
                            )}
                            onClick={() => {
                              if (currentMonth && !saturday && !sunday) {
                                setSelectDate(date);
                              }
                            }}
                          >
                            {date.date()}
                          </h1>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
            <div className="w-full pb-10 pt-10 sm:row-span-2 md:row-span-2">
              <div className="flex justify-center">
                <h1>Horario para {selectDate.toDate().toDateString()} </h1>
              </div>
              <div className="flex justify-center">
                <p>Dato</p>
              </div>
              <div className="grid w-full grid-rows-5">
                <div className="h-14"></div>
                <div className="h-14"></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendario;
