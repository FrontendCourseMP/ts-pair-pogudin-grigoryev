class BracketValidator {
  private pairs: Record<string, string> = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  private openSet = new Set(["(", "[", "{"]);
  private closeSet = new Set([")", "]", "}"]);

  validate(s: string): { valid: boolean; reason?: string } {
    if (s.length === 0) {
      return { valid: true, reason: "Пустая строка считается валидной." };
    }

    const stack: string[] = [];

    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (!this.openSet.has(ch) && !this.closeSet.has(ch)) {
        return {
          valid: false,
          reason: `Недопустимый символ '${ch}' на позиции ${i + 1}.`,
        };
      }
      if (this.openSet.has(ch)) {
        stack.push(ch);
      } else {
        if (stack.length === 0) {
          return {
            valid: false,
            reason: `Найдена закрывающая скобка '${ch}' без соответствующей открывающей (позиция ${
              i + 1
            }).`,
          };
        }
        const top = stack.pop()!;
        if (this.pairs[ch] !== top) {
          return {
            valid: false,
            reason: `Скобка '${ch}' на позиции ${
              i + 1
            } не соответствует открывающей '${top}'.`,
          };
        }
      }
    }

    if (stack.length !== 0) {
      return {
        valid: false,
        reason: `Открытые скобки не закрыты. Осталось ${stack.length} открытой(ых) скобки(ок).`,
      };
    }

    return { valid: true };
  }
}

const validator = new BracketValidator();
const inputEl = document.getElementById("brackets") as HTMLInputElement;
const btn = document.getElementById("checkBtn") as HTMLButtonElement;
const out = document.getElementById("result") as HTMLOutputElement;

btn.addEventListener("click", () => {
  const value = inputEl.value.trim();
  const res = validator.validate(value);
  if (res.valid) {
    out.textContent =
      "Строка валидна " + (res.reason ? " — " + res.reason : "");
  } else {
    out.textContent =
      "Строка не валидна — " + (res.reason ?? "неизвестная причина");
  }
});
