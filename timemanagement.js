function calculateRemainingHours() {
  const startWorkingTime = new Date();
  startWorkingTime.setHours(9, 30, 0, 0);

  const totalWorkingHours = 9.5; // Total working hours per day

  const now = new Date();
  const elapsedTime = (now - startWorkingTime) / (1000 * 60 * 60); // Elapsed time in hours

  if (elapsedTime >= totalWorkingHours) {
    console.log("The workday has ended.");
  } else {
    const remainingHours = totalWorkingHours - elapsedTime;

    const endWorkingTime = new Date(now.getTime() + remainingHours * 60 * 60 * 1000);

    console.log(`Remaining working hours: ${remainingHours.toFixed(2)}`);
    console.log(`End time of workday: ${endWorkingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
  }
}

calculateRemainingHours();
