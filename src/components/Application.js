import React, { useState, useEffect} from "react";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import "components/Application.scss";
import axios from 'axios';
import { getAppointmentsForDay } from '../helpers/selectors'



//const appointments = [
//  {
//    id: 1,
//    time: "12pm",
//  },
//  {
//    id: 2,
//    time: "1pm",
//    interview: {
//      student: "Lydia Miller-Jones",
//      interviewer: {
//        id: 1,
//        name: "Sylvia Palmer",
//        avatar: "https://i.imgur.com/LpaY82x.png",
//      }
//    }
//  },
//  {
//    id: 3,
//    time: "5pm",
//    interview: {
//      student: "Chad McChad",
//      interviewer: {
//        id: 6,
//        name: "Johnny Appleseed",
//        avatar: "https://i.imgur.com/LpaY82x.png",
//      }
//    }
//  },
//  {
//    id: 4,
//    time: "2pm",
//    interview: {
//      student: "Jimmy Twotimes",
//      interviewer: {
//        id: 7,
//        name: "Big Boy",
//        avatar: "https://i.imgur.com/LpaY82x.png",
//      }
//    }
//  },
//  {
//    id: 5,
//    time: "1pm",
//    interview: {
//      student: "Jim Jam",
//      interviewer: {
//        id: 1,
//        name: "Stevey Steve",
//        avatar: "https://i.imgur.com/LpaY82x.png",
//      }
//    }
//  }
//];





export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    Promise.all([
      axios({
        method: "GET",
        url: `/api/days`
      }),
      axios({
        method: "GET",
        url: `/api/appointments`
      }),
      axios({
        method: "GET",
        url: `/api/interviewers`
      }),
    ]).then(([days, appointments, interviewers]) => {
      setState({ ...state, days: days.data, appointments: appointments.data, interviewers: interviewers.data})
    }).catch(error => console.log(error));
  }, []);
    

  return (
    <main className="layout">
      <section className="sidebar">
          <img
           className="sidebar--centered"
           src="images/logo.png"
           alt="Interview Scheduler"
         />
         <hr className="sidebar__separator sidebar--centered" />
         <nav className="sidebar__menu">
           <DayList
             days={state.days}
             day={state.day}
             setDay={setDay}
           /></nav>
         <img
           className="sidebar__lhl sidebar--centered"
           src="images/lhl.png"
           alt="Lighthouse Labs"
         />
      </section>
      <section className="schedule">
        {
          appointments.map(appointment => {
            return (
              <Appointment key={appointment.id} {...appointment} />
            )
            })
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
