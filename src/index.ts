import validate from "./tools/validate.js";
import {
  calculateArrival,
  parseArrivalData,
} from "./tools/calculateArrival.js";

const inputEl = document.getElementById("brackets") as HTMLInputElement;
const btn = document.getElementById("checkBtn") as HTMLButtonElement;
const out = document.getElementById("result") as HTMLOutputElement;

btn.addEventListener("click", () => {
  const value = inputEl.value.trim();
  const res = validate(value);
  if (res.valid) {
    out.textContent =
      "Строка валидна " + (res.reason ? " — " + res.reason : "");
  } else {
    out.textContent =
      "Строка не валидна — " + (res.reason ?? "неизвестная причина");
  }
});

const scheduledHourEl = document.getElementById(
  "scheduledHour"
) as HTMLInputElement;
const delayHoursEl = document.getElementById("delayHours") as HTMLInputElement;
const calculateBtn = document.getElementById(
  "calculateBtn"
) as HTMLButtonElement;
const arrivalResult = document.getElementById(
  "arrivalResult"
) as HTMLOutputElement;

calculateBtn.addEventListener("click", () => {
  const scheduledHourStr = scheduledHourEl.value;
  const delayHoursStr = delayHoursEl.value;

  const parseResult = parseArrivalData(scheduledHourStr, delayHoursStr);

  if (parseResult.success === false) {
    arrivalResult.textContent = "Ошибка: " + parseResult.error;
    return;
  }

  const newArrivalHour = calculateArrival(
    parseResult.scheduledHour,
    parseResult.delayHours
  );
  arrivalResult.textContent = `Новое время прибытия: ${newArrivalHour} час(ов)`;
});