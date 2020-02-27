const dayMap = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

const transformForTable = (derivedSchedule, pausedDays) => {
  const scheduleTable = [];
  const orderOfDays = Object.keys(derivedSchedule);

  orderOfDays.forEach(key => {
    const splitTimes = [];

    // check derivedSchedule key name and provide full day name instead
    const dayName = dayMap[key];

    for (let i = 0; i < derivedSchedule[key].length; i += 1) {
      const splitHourAndMinutes = derivedSchedule[key][i].split(':');
      const removeZero = number => {
        if (number < 10) {
          return number.substring(1);
        }
        return number;
      };
      splitTimes.push({
        value: {
          hours: parseInt(removeZero(splitHourAndMinutes[0]), 10),
          minutes: parseInt(removeZero(splitHourAndMinutes[1]), 10),
        },
      });
    }

    scheduleTable.push({
      dayName,
      key,
      postingTimesTotal: derivedSchedule[key].length,
      times: splitTimes,
      paused: pausedDays.includes(key),
    });
  });
  return scheduleTable;
};

const mergeSchedules = (profileSchedules = [], pausedSchedules = []) => {
  const mergedSchedules = [];
  profileSchedules.forEach((schedule, index) => {
    mergedSchedules.push({ ...schedule });
    pausedSchedules.forEach(pausedSchedule => {
      if (pausedSchedule.days[0] === schedule.days[0]) {
        mergedSchedules[index].times = pausedSchedule.times;
      }
    });
  });
  return mergedSchedules;
};

const transformSchedules = (profileSchedules, pausedSchedules = []) => {
  const schedule = {
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  };

  // create empty arrays for each day
  const allScheduleTimesOnMon = [];
  const allScheduleTimesOnTue = [];
  const allScheduleTimesOnWed = [];
  const allScheduleTimesOnThu = [];
  const allScheduleTimesOnFri = [];
  const allScheduleTimesOnSat = [];
  const allScheduleTimesOnSun = [];

  // iterate through schedules in profile
  for (let i = 0; i < profileSchedules.length; i += 1) {
    const schedules = profileSchedules[i];
    const dayInSchedule = schedules.days;
    const times = schedules.times;

    // iterate through days in a schedule
    for (let y = 0; y < dayInSchedule.length; y += 1) {
      // check if a day in a schedule is a specific day
      if (dayInSchedule[y] === 'mon') {
        // push times from that day from multiple schedules to temporary array
        allScheduleTimesOnMon.push(times);
      } else if (dayInSchedule[y] === 'tue') {
        allScheduleTimesOnTue.push(times);
      } else if (dayInSchedule[y] === 'wed') {
        allScheduleTimesOnWed.push(times);
      } else if (dayInSchedule[y] === 'thu') {
        allScheduleTimesOnThu.push(times);
      } else if (dayInSchedule[y] === 'fri') {
        allScheduleTimesOnFri.push(times);
      } else if (dayInSchedule[y] === 'sat') {
        allScheduleTimesOnSat.push(times);
      } else if (dayInSchedule[y] === 'sun') {
        allScheduleTimesOnSun.push(times);
      }
    }
  }

  // check the length of the temporary array
  for (let x = 0; x < allScheduleTimesOnMon.length; x += 1) {
    // spread items from temporary array (of which have arrays) into our desired object
    schedule.mon.push(...allScheduleTimesOnMon[x]);
  }
  for (let x = 0; x < allScheduleTimesOnTue.length; x += 1) {
    schedule.tue.push(...allScheduleTimesOnTue[x]);
  }
  for (let x = 0; x < allScheduleTimesOnWed.length; x += 1) {
    schedule.wed.push(...allScheduleTimesOnWed[x]);
  }
  for (let x = 0; x < allScheduleTimesOnThu.length; x += 1) {
    schedule.thu.push(...allScheduleTimesOnThu[x]);
  }
  for (let x = 0; x < allScheduleTimesOnFri.length; x += 1) {
    schedule.fri.push(...allScheduleTimesOnFri[x]);
  }
  for (let x = 0; x < allScheduleTimesOnSat.length; x += 1) {
    schedule.sat.push(...allScheduleTimesOnSat[x]);
  }
  for (let x = 0; x < allScheduleTimesOnSun.length; x += 1) {
    schedule.sun.push(...allScheduleTimesOnSun[x]);
  }
  const pausedDays = pausedSchedules.map(
    pausedSchedule => pausedSchedule.days[0]
  );
  return transformForTable(schedule, pausedDays);
};

export { transformSchedules, dayMap, mergeSchedules };
