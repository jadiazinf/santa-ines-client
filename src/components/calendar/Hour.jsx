/* eslint-disable react/prop-types */
import { useState } from "react";
import { format, isSameMinute } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import { cn } from "../../helpers/calendar.helper";
import { useDispatch } from "react-redux";
import { crearCitaDate } from "../../store/reducers/crearCita.reducer";


const Horas_disponibles = ({ freeTimes }) => {
  const [selectedTime, setSelectedTime] = useState();
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <span>
        Horarios disponibles:{" "}
        <span className="font-semibold text-orange-950">
          {freeTimes.length}
        </span>
      </span>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6  text-md gap-2">
        {freeTimes.map((hour, hourIdx) => (
          <div key={hourIdx}>
            <button
              type="button"
              className={cn(
                "bg-green-200 rounded-lg px-2 text-gray-800 relative hover:border hover:border-green-400 w-[60px] h-[26px]",
                selectedTime &&
                  isSameMinute(selectedTime, hour) &&
                  "bg-green-400 text-gray-800"
              )}
              onClick={() => {
                setSelectedTime(hour)
                dispatch(crearCitaDate(format(hour, "yyyy-MM-dd HH:00:00").toString()))
              }}
            >
              <CheckCircle2
                className={cn(
                  "w-[16px] h-[16px] absolute hidden top-0 right-0 transform translate-x-1 -translate-y-1.5 text-green-700",
                  selectedTime && isSameMinute(selectedTime, hour) && "block"
                )}
              />
              {format(hour, "HH:mm")}
            </button>
          </div>
        ))}
      </div>
      {selectedTime && (
        <div className="w-full flex flex-row justify-end">
          <span>Hora seleccionada: </span>
          <span className="font-semibold text-rose-950 pl-1">
            {format(selectedTime, "HH:00")}
          </span>
        </div>
      )}
    </div>
  );
};
export default Horas_disponibles;
