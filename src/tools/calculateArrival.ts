function parseArrivalData(
  scheduledHourStr: string,
  delayHoursStr: string
):
  | { success: true; scheduledHour: number; delayHours: number }
  | { success: false; error: string } {
  const scheduledHour = Number(scheduledHourStr.trim());
  const delayHours = Number(delayHoursStr.trim());

  if (isNaN(scheduledHour) || isNaN(delayHours)) {
    return {
      success: false,
      error: "Оба значения должны быть числами",
    };
  }

  if (!Number.isInteger(scheduledHour) || !Number.isInteger(delayHours)) {
    return {
      success: false,
      error: "Оба значения должны быть целыми числами",
    };
  }

  if (scheduledHour < 0 || scheduledHour > 23) {
    return {
      success: false,
      error: "Час прибытия должен быть от 0 до 23",
    };
  }

  if (delayHours < 0) {
    return {
      success: false,
      error: "Количество часов опоздания не может быть отрицательным",
    };
  }

  return {
    success: true,
    scheduledHour,
    delayHours,
  };
}

function calculateArrival(scheduledHour: number, delayHours: number): number {
  return (scheduledHour + delayHours) % 24;
}

export { calculateArrival, parseArrivalData };
