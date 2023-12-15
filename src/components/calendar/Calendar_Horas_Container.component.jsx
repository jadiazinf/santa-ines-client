/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react"
import { cn, dayNames } from "../../helpers/calendar.helper"
import {
  add,
  addDays,
  addHours,
  eachDayOfInterval,
  eachMinuteOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isSameMonth,
  isThisMonth,
  isToday,
  parse,
  parseISO,
  set,
  startOfDay,
  startOfToday,
  startOfWeek,
  startOfYesterday,
} from "date-fns"
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { da, es } from "date-fns/locale"
import Horas_disponibles from "./Hour"
import Calendario from "./Calendario"
import { capitalizeFirstLetter } from "../../helpers/capitalize.helper"
import { useDispatch, useSelector } from "react-redux"
import { crearCitaDate } from "../../store/reducers/crearCita.reducer"

export const Calendar = ({ touch, dateEditable, dateEditable1 }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (dateEditable1) {
      dispatch(crearCitaDate(obtenerFechaDesdeCadenaFecha(dateEditable1)+" "+obtenerHoraDesdeCadenaFecha(dateEditable1)+":00"))
    }
  }, []);

  //Captamos las citas que se encuentran ya registradas al doctor
  const { appointments } = useSelector( state => state.createAppointment)

  const reservations =  recorrerCitas(appointments);

  const [calendarTouched, setCalendarTouched] = useState(touch)
  // Dia actual
  let today = startOfToday()
  // Estado mes actual
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"))
  // Dia seleccionado
  let [selectedDay, setSelectedDay] = useState(today)
  // Primer dia del mes
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date())
  // Obtenemos los dias del mes
  let days = useMemo(() => eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  }), [firstDayCurrentMonth])

  // Horas disponibles po cada dia, uno en formato de numbers y otro en Dates
  const [availableTimesInThisMonth, setAvailableTimesInThisMonth] = useState([])
  const [availableTimesInThisMonthForEachDay, setAvailableTimesInThisMonthForEachDay] = useState([])

  // Siguiente y pasado mes
  function prevMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
  }
  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
  }

  // Obtenemos las horas disponibles para el dia seleciconado
  const freeTimes = useMemo(() => {
    const StartOfToday = startOfDay(selectedDay)  //Define el inicio del dia
    const endOfToday = endOfDay(selectedDay)      //Define el final del dia

    // Rango de horas por día
    const startHour = set(StartOfToday, { hours: 7 })           //Desde las 7am
    const endHour = set(endOfToday, { hours: 17, minutes: 0 })  //Hasta las 5pm

    // Define el intervalo de cada hora (60 min)  -> Esto seria lo que dure la cita (diria que 60 min por cita)
    let hoursInDay = eachMinuteOfInterval(
      {
        start: startHour,
        end: endHour,
      },
      { step: 60 }
    )

    //Dentro del arreglo de objetos, solo se mostraran las horas que no esten dentro de las reservaciones
    let freeTimes = hoursInDay.filter(
      (hour) => !reservations.includes(parseISO(hour.toISOString()).toString())
    )

    return (freeTimes)
  }, [selectedDay])

  // calculate the number of available times for each day in this month
  useMemo(() => {
    let thisMonthTimesLength = []
    let thisMonthTimesEachDay = []
    // eslint-disable-next-line no-unused-vars
    days.map((day, dayIdx) => {
      const StartOfToday = startOfDay(day)    //Define el inicio del dia
      const endOfToday = endOfDay(day)        //Define el final del dia

      // Rango de horas por día
      const startHour = set(StartOfToday, { hours: 7 })
      const endHour = set(endOfToday, { hours: 17, minutes: 0 })
      let hoursInDay = eachMinuteOfInterval(
        {
          start: startHour,
          end: endHour,
        },
        { step: 60 }
      )
      // filter the available hours
      let freeTimes = hoursInDay.filter(
        (hour) =>
          !reservations.includes(parseISO(hour.toISOString()).toString())
      )

      thisMonthTimesLength.push(freeTimes.length)   // Objeto que tiene la cantida de horas (integer) disponibles por dia
      thisMonthTimesEachDay.push(freeTimes)         // Objeto que contiene arrays por dia, de los objetos tipo date
    })
    setAvailableTimesInThisMonth(thisMonthTimesLength)
    setAvailableTimesInThisMonthForEachDay(thisMonthTimesEachDay)
  }, [currentMonth])

  return (
    <div className="flex flex-row justify-center items-center gap-2 m-10">
      {/* calendar implementation */}
      <div className="flex flex-col gap-2 w-[388px] bg-gray-50 p-3 rounded-lg">
        {/* calendar header */}
        <div className="grid grid-cols-3">
          <button
            type="button"
            onClick={prevMonth}
            disabled={isThisMonth(new Date(currentMonth))}
          >
            <ChevronLeft
              size={20}
              aria-hidden="true"
              className={cn(
                isThisMonth(new Date(currentMonth)) && "text-gray-300"
              )}
            />
          </button>
          <h2 className="font-semibold text-orange-950 justify-center flex">
            {format(firstDayCurrentMonth, " MMMM yyyy")}
          </h2>
          <button
            type="button"
            className="flex justify-end"
            onClick={nextMonth}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>

        {/* calendar body */}
        <div>
          <div className="grid grid-cols-7 mt-4">
            {dayNames.map((day, i) =>
            {
              return(
              <div
                key={i}
                className={cn(
                  "flex justify-center items-center text-sm text-blue-500 w-full py-2",
                  {
                    "text-orange-400 bg-orange-50 rounded-t-lg":
                      day === "Sun" || day === "Sat",
                  }
                )}
                >
                {day}
              </div>
            )})}
          </div>

          <div className="grid grid-cols-7 text-sm">
            {days.map((day, dayIdx) => {
              return (
                <div
                  key={day.toString()}
                  className={cn(
                    dayIdx === 0 && colStartClasses[getDay(day) - 1],
                    "h-14 justify-center flex items-center",
                    (getDay(day) === 0 || getDay(day) === 6) &&
                      "bg-orange-50 rounded-lg"
                  )}
                >
                  <button
                    onClick={() => {
                      setCalendarTouched(true)
                      setSelectedDay(day)
                    }}
                    className={cn(
                      "w-12 h-12 flex flex-col p-2 justify-center items-center rounded-xl gap-0 group bg-gray-50 relative group",
                      isEqual(day, selectedDay) &&
                        "bg-orange-100 text-slate-900 text-lg",
                        isEqual(today, day) && "text-blue-900 bg-blue-50",
                        (isBefore(day, today) || day.getDay() === 6 || day.getDay() === 0) &&"text-red-800 bg-red-50 cursor-not-allowed", //Bloqueamos el cursor
                        isEqual(today, day) && "text-blue-900 bg-blue-50",
                        (isBefore(day, today) || day.getDay() === 6 || day.getDay() === 0) && "cursor-not-allowed", //Bloqueamos el cursor los
                        isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-blue-200",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900"
                    )}
                    disabled={isBefore(day, today) || day.getDay() === 6 || day.getDay() === 0} // Bloquea los días anteriores y los fines de semana
                  >
                    {isAfter(day, startOfYesterday()) && day.getDay() !== 6 && day.getDay() !== 0 && ( //Ya no se muestra el mensaje de available en los fines
                      <span className="hidden group-hover:flex absolute top-0 -translate-x-.5 -translate-y-4 z-10 text-[11px] bg-slate-900 text-slate-100 px-1 rounded-md gap-1">
                        <span>{availableTimesInThisMonth[dayIdx]}</span>
                        <span>Available</span>
                      </span>
                    )}

                    <time
                      dateTime={format(day, "yyyy-MM-dd")}
                      className={cn(
                        "group-hover:text-lg",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          "font-semibold"
                      )}
                    >
                      {format(day, "d")}
                    </time>

                    <CheckCircle2
                      className={cn(
                        "hidden",
                        isEqual(day, selectedDay) &&
                          "absolute block top-0 right-0 h-[18px] w-[18px] translate-x-1 -translate-y-1 text-orange-900",
                        isEqual(day, today) && "text-blue-900"
                      )}
                    />

                    {isAfter(day, startOfYesterday()) && day.getDay() !== 6 && day.getDay() !== 0 && (    //Aca solo mostramos en los dias de semana
                      <Calendario
                        times={availableTimesInThisMonthForEachDay[dayIdx]}
                      />
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className={cn(`hidden`, calendarTouched && "block ml-10")}>
        {touch
          ? <div className="flex flex-col">
              <h1>Fecha a actualizar:
                <span className="font-semibold text-rose-950 pl-1">
                  {/* {capitalizeFirstLetter(
                    format(dateEditable, "EEEE dd 'de' MMMM 'de' yyyy' a las ", {
                      locale: es,
                    }).toString()
                  )} */}
                  {obtenerFechaDesdeCadenaFecha(dateEditable1)}
                  {' a las '}
                  {obtenerHoraDesdeCadenaFecha(dateEditable1)}
                </span>
              </h1>
              <div className="w-full border my-10"></div>
            </div>
          : null
        }
        <span className="flex items-center w-full justify-center gap-1">

        {getDay(selectedDay) === 0 || getDay(selectedDay) === 6
          ? <span className="text-red-800 font-semibold">No hay citas disponibles para los fines de semana</span>
          :  <span>
                Horarios disponible para citas el
                <span className="text-orange-950 font-semibold pl-1">
                  {capitalizeFirstLetter(
                    format(selectedDay, "EEEE dd 'de' MMMM 'de' yyyy'.'", {
                      locale: es,
                    }).toString()
                  )}
                </span>
              </span>
        }
        </span>
        {getDay(selectedDay) === 0 || getDay(selectedDay) === 6 ?  null : <Horas_disponibles freeTimes={freeTimes}/>}
      </div>
    </div>
  )
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
]

function convertirFecha(fecha) {
  // Nov 12 2023 19:35:50 GMT-0800 (Pacific Standard Time)
  const parsedDate = parseISO(fecha);
  const referenceString = new Date().toString()
  let formattedDate = format(parsedDate, 'EEE MMM dd yyyy HH:mm:ss ') + referenceString.slice(25);
  return formattedDate;
}


function recorrerCitas(citas2) {
  const newArray = []
  citas2.forEach((cita) => {
    const date = cita.appointmentDate.slice(0, 10)
    const time = cita.appointmentDate.slice(11, 16)
    newArray.push(convertirFecha(`${date} ${time}`));                            //Como String
  });
  return newArray;
}
function obtenerHoraDesdeCadenaFecha(fechaString) {
  const time = fechaString.slice(11, 16)
  return time;
}
function obtenerFechaDesdeCadenaFecha(fechaString) {
  const time = fechaString.slice(0, 10)
  return time;
}