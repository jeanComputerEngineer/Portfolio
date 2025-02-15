import { useState } from 'react';
const Count = (date) => {

    const [segundos, setSegundos] = useState();
    const [minutos, setMinutos] = useState();
    const [horas, setHoras] = useState();
    const [dias, setDias] = useState();

    const countDown = () => {
        const countDate = new Date(date).getTime();
        const now = new Date().getTime();

        const intervalo = countDate - now;
        const segundosprev = intervalo / 1000
        const minutosprev = segundosprev / 60
        const horasprev = minutosprev / 60;
        const diasprev = horasprev / 24;

        const addLeadingZero = (value) => {
            return value < 10 ? `0${value}` : value;
        }

        const dias = addLeadingZero(Math.floor(diasprev));
        const horas = addLeadingZero(Math.floor(horasprev - (dias * 24)));
        const minutos = addLeadingZero(Math.floor((minutosprev - dias * 24 * 60) - (horas * 60)));
        const segundos = addLeadingZero(Math.floor((segundosprev - (dias * 24 * 60 * 60)) - (horas * 60 * 60) - (minutos * 60)));



        console.log(countDate, now, segundos, minutos, horas, dias);

        setSegundos(segundos);
        setMinutos(minutos);
        setHoras(horas);
        setDias(dias);

    }

    setInterval(countDown, 1000);
    return [
        segundos,
        minutos,
        horas,
        dias
    ]


}

export default Count;
