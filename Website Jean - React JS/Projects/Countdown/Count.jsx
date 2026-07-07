import { useState } from 'react';

const Count = (date) => {
  const [seconds, setSeconds] = useState();
  const [minutes, setMinutes] = useState();
  const [hours, setHours] = useState();
  const [days, setDays] = useState();

  const countDown = () => {
    const countDate = new Date(date).getTime();
    const now = new Date().getTime();
    const interval = countDate - now;

    const prevSeconds = interval / 1000;
    const prevMinutes = prevSeconds / 60;
    const prevHours = prevMinutes / 60;
    const prevDays = prevHours / 24;

    const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

    const daysValue = addLeadingZero(Math.floor(prevDays));
    const hoursValue = addLeadingZero(Math.floor(prevHours - daysValue * 24));
    const minutesValue = addLeadingZero(
      Math.floor(prevMinutes - daysValue * 24 * 60 - hoursValue * 60),
    );
    const secondsValue = addLeadingZero(
      Math.floor(prevSeconds - daysValue * 24 * 60 * 60 - hoursValue * 60 * 60 - minutesValue * 60),
    );

    setSeconds(secondsValue);
    setMinutes(minutesValue);
    setHours(hoursValue);
    setDays(daysValue);
  };

  setInterval(countDown, 1000);

  return [seconds, minutes, hours, days];
};

export default Count;
