const moment = require('moment');
const momentT = require('moment-timezone');

let workingTime = 8
let workingHours = 20

let workedTime = 00
let workedHours = 00

if(workingTime == workedTime && workingHours == workedHours){
    console.log(`Time is Over`);
} else {
  const currentTime = momentT().tz('Asia/Kolkata');
  const totalWorkingHours = moment.duration(8, 'hours').add((20, 'minutes'));
  const totalWorkedHours = moment.duration(workedTime, 'hours').add((workedHours, 'minutes'));
  const remainTime = moment.utc(totalWorkingHours.asMilliseconds() - totalWorkedHours.asMilliseconds());
console.log(`RemainTime:${remainTime.format('HH:mm:ss')}`);
  const finalTime = currentTime.add(remainTime); 
  const formattedFinalTime = finalTime.format('HH:mm:ss');
  console.log(`Time Ends in: ${formattedFinalTime}`);
}
