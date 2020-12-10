export function getAppointmentsForDay(state, day) {
    let appointmentArray = [];
    let selectedDay = state.days.filter(x => x.name === day)
    const appointments = selectedDay[0].appointments;
    for (let appointment of appointments) {
        appointmentArray.push(state.apoointments[appointment]);
    }
    return appointmentArray;

  }