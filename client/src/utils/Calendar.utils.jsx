import dayjs from "dayjs";

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year(),
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month"); // Obtain the first day of the current month of the current year
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month"); // Obtain the last day of the current month of the current year

  const arrayOfDate = []; // This is where we will be storing the days

  // I)
  //  Generate previous month days (prefix date)
  // .day obtains the day of the month and places it accordingly
  //  between a value of 0 - 6 (days of the week from sun-sat).
  //  So, if Dec 1 of 2023 is on a friday, then this day is placed
  //  at index 5. 5 extra days will be pushed into the arrayOfDate.
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayOfDate.push({ currentMonth: false, date: firstDateOfMonth.day(i) });
  }

  // II)
  // Generate current month days
  // Obtaining all the days in the current month.
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  // III)
  // Generate the extra days of the next month (suffix date)
  // Initially we will need to calculate the remaining days
  // in our calendar setup. This calendar setup consists of
  // a design of 6 rows by 7 cols (7 days of the week)

  const remainingDays = 42 - arrayOfDate.length;

  for (
    let i = lastDateOfMonth.date() + 1; // dayjs.date() returns the specific day (a value between 1-31).
    // i will start at 32 and go to 42, which translates to 28 of dec going to 6 of jan
    i <= lastDateOfMonth.date() + remainingDays;
    i++
  ) {
    arrayOfDate.push({ currentMonth: false, date: lastDateOfMonth.date(i) });
  }

  return arrayOfDate;
};

export const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
