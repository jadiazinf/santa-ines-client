/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { eachMinuteOfInterval, endOfDay, isSameMinute, set, startOfDay } from 'date-fns';
import  { memo } from 'react';
import { cn } from '../../helpers/calendar.helper';

const Calendario = memo(({ times }) => {
  const StartOfWeek = startOfDay(times[0]);
  const EndtOfWeek = endOfDay(times[0]);
  const startHour = set(StartOfWeek, { hours: 1 });
  const endHour = set(EndtOfWeek, { hours: 17, minutes: 45 });
  let hoursInDay = eachMinuteOfInterval(
    {
      start: startHour,
      end: endHour,
    },
    { step: 30 }
  );

  return (
    <div className={cn(`w-[42px]`, 'flex justify-center rounded-md overflow-hidden ')}>
      <div className='flex rounded-md'>
        {hoursInDay.map((hour, i) => {
          return (
            <div
              key={i}
              className={cn(
                times.some((time) => isSameMinute(hour, time)) && 'h-[4px] w-[.5px] bg-green-300 text-red-500',
                !times.some((time) => isSameMinute(hour, time)) && 'h-[4px] w-[1px] bg-black-100'
              )}
            />
          );
        })}
      </div>
    </div>
  );
});

export default Calendario;
