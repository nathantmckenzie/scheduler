import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const spotsRemaining = (spot) => {
    const selectedDay = state.days.find((dayToSelect) => {
      return dayToSelect.name === state.day;
    });
    return (selectedDay.spots += spot);
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const diff = !state.appointments[id].interview ? -1 : 0;
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        spotsRemaining(diff);
        setState({
          ...state,
          appointments,
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        spotsRemaining(1);
        setState({
          ...state,
          appointments,
        });
      });
  }

  useEffect(() => {
    Promise.all([
      axios({
        method: "GET",
        url: `/api/days`,
      }),
      axios({
        method: "GET",
        url: `/api/appointments`,
      }),
      axios({
        method: "GET",
        url: `/api/interviewers`,
      }),
    ])
      .then(([days, appointments, interviewers]) => {
        setState({
          ...state,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        });
      })
      .catch((error) => console.log(error));
  }, []);
  
  return { bookInterview, cancelInterview, state, setDay };
}
