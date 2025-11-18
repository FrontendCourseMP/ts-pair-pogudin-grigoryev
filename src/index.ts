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
