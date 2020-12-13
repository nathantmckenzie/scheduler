export function getAppointmentsForDay(state, day) {
    let appointmentArray = [];
    let selectedDay = state.days.filter(x => x.name === day)
    const appointments = selectedDay[0].appointments;
    for (let appointment of appointments) {
        appointmentArray.push(state.apoointments[appointment]);
    }
    return appointmentArray;

  }

  export function getInterviewersForDay(state, day) {
    const result = [];
  
    state.days.filter(tmpDay => {
      if (tmpDay.name === day) {
        for (const interview of tmpDay.interviewers) {
          result.push(state.interviewers[interview]);
        }
      }
    })
  
    return result;
  
  }


  export function getInterview(state, interview) {
    if (interview !== null) {
      return {
        student: interview.student,
        interviewer: state.interviewers[interview.interviewer]
      }
    }
  
    return null;
  
  }