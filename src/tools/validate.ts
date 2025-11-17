import Stack from "./Stack.js";

function validate(s: string): { valid: boolean; reason?: string } {
    if (s.length === 0) {
      return { valid: true, reason: "Пустая строка считается валидной." };
    }

    const stack = new Stack();
    const brackets = {
      '{': '}',
      '[': ']',
      '(': ')'
    }

    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (!Object.keys(brackets).includes(ch) && !Object.values(brackets).includes(ch)) {
        return {
          valid: false,
          reason: `Недопустимый символ '${ch}' на позиции ${i + 1}.`,
        };
      }
      if (Object.keys(brackets).includes(ch)) {
        stack.add(ch);
      } else {
        if (stack.size() === 0) {
          return {
            valid: false,
            reason: `Найдена закрывающая скобка '${ch}' без соответствующей открывающей (позиция ${
              i + 1
            }).`,
          };
        }
        const top = stack.remove();
        if (brackets[top] !== ch) {
          return {
            valid: false,
            reason: `Скобка '${ch}' на позиции ${
              i + 1
            } не соответствует открывающей '${top}'.`,
          };
        }
      }
    }

    if (stack.size() !== 0) {
      return {
        valid: false,
        reason: `Открытые скобки не закрыты. Осталось ${stack.size()} открытой(ых) скобки(ок).`,
      };
    }

    return { valid: true };
  }
  export default validate