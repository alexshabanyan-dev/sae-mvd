import { ruRU } from "naive-ui";

/**
 * Русская локаль Naive с правками под ИСОД: без подстановки «Ввести» в поля,
 * если `placeholder` у `NInput` / `NInputNumber` не задан (иначе — из `ruRU`).
 */
export const naiveAppLocaleRu = {
  ...ruRU,
  Input: {
    ...ruRU.Input,
    placeholder: "",
  },
  InputNumber: {
    ...ruRU.InputNumber,
    placeholder: "",
  },
} satisfies typeof ruRU;
