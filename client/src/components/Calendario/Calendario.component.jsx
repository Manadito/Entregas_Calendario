import React, { useState } from "react";
import { generateDate, months } from "../../utils/Calendar.utils";
import cn from "../../utils/Cn.utils";
import dayjs from "dayjs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Calendario = () => {
  // I) Hooka and variables
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  return (
    <div className="mx-auto flex w-2/3">
      <div className="h-96 w-1/2">
        <div className="flex justify-between">
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
        <div className="grid w-full grid-cols-7">
          {daysOfWeek.map((day, index) => {
            return (
              <h1 key={index} className="grid h-14 place-content-center">
                {day}
              </h1>
            );
          })}
        </div>
        <div className="grid w-full grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="grid h-14 place-content-center border-t"
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
                      currentMonth ? "" : "text-gray-400",
                      today ? "bg-red-600 text-white" : "",
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-black text-white"
                        : "",
                      " grid h-10 w-10 cursor-pointer place-content-center rounded-full transition-all hover:bg-black hover:text-white",
                    )}
                    onClick={() => {
                      setSelectDate(date);
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
      <div className="w-1/2">
        <h1>Horario para {selectDate.toDate().toDateString()} </h1>
        <p>Dato</p>
      </div>
    </div>
  );
};

export default Calendario;
