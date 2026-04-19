/**
 * Токены по гайду ИСОД (§4.2 ссылки + типографика).
 * Единственное место для значений из макета: цвета, отступы и т.п.
 */
export const ISCOD = {
  colorLink: "#2c77ae",
  colorLinkMenuIdle: "#7392ae",
  /** Подчёркивание при наведении: 50% от цвета ссылки */
  colorLinkUnderlineHover: "rgba(44, 119, 174, 0.5)",
  fontSizeHeadingLink: "16px",
  /**
   * Шапка из PDF (скрин пользователя): вертикальный градиент, верх #1b67a6 → низ #004080.
   */
  headerGradient: "linear-gradient(180deg, #1b67a6 0%, #0a5a96 42%, #004080 100%)",
  /** Текст и иконки на шапке — по PDF */
  headerTextColor: "#ffffff",
  /** Вертикали справа: тонкие тёмные линии на синем градиенте (макет ИСОД) */
  headerRuleColor: "rgba(0, 0, 0, 0.38)",
  /** Белый «призрак» герба за цветным логотипом — едва заметный */
  headerWatermarkOpacity: 0.055,
  /**
   * Фон рабочей области страницы (`NLayout` + зоны под белыми блоками шапки),
   * [Figma 1-869](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=1-869&m=dev).
   */
  pageBackgroundColor: "#eef2f6",
  /**
   * Воздух между подзаголовком и основным контентом ([Figma 1-869](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=1-869&m=dev)).
   * Задаётся как `padding-top` у белой оболочки в `AppLayout`, не `margin` у SubHeader — иначе между двумя белыми блоками видна серая полоса фона страницы.
   */
  pageBodyPaddingTop: "40px",
  /**
   * Заголовок панели Collapse ([Figma 1-878](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=1-878&m=dev)) —
   * по гайду ИСОД §3 уровень **H3: 16px** (не основной текст 14px).
   */
  collapseSectionTitleFontSize: "16px",
  /** UI-kit form controls */
  formBorderColor: "#d7dee6",
  formTextColor: "#2a3c49",
  /** Main colours/blue — образцы ссылок в UI-kit ([Figma 62-6702](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6702&m=dev)). */
  colorUiKitBlue: "#1d6da8",
  formPlaceholderColor: "#b8bec6",
  /**
   * Текст подсказки ошибки под полем ([Figma 62-6886](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6886&m=dev)).
   */
  formFeedbackErrorTextColor: "#d94043",
  /**
   * Кегль текста подсказки / ошибки у `n-form-item` ([Figma 62-6886](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6886&m=dev)).
   * Без обёртки `n-form` и без `size` на item Naive использует **medium** → нужен и `feedbackFontSizeMedium` в теме.
   */
  formFeedbackFontSize: "10px",
  formReadonlyColor: "#f4f6f8",
  /**
   * Main colours/dark grey (Figma): точка выбранного radio 62-7076, штрих галочки
   * checkbox 62-7069. У Naive нет токена на форму path — только цвет `checkMarkColor`.
   */
  formRadioChosenDotColor: "#64727d",
  formSwitchRailColor: "#fafbfc",
  /** Рельс NSwitch при hover (выкл.), Figma 62-7096 */
  formSwitchHoverRailColor: "#d7dee6",
  formSwitchActiveRailColor: "#1d6da8",
  formSwitchErrorColor: "#fd8383",
  /**
   * NSwitch disabled ([Figma 62-7090](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-7090&m=dev)).
   * В naive-ui 2.44 нет `railColorDisabled`; на рельс вешается `opacity: 0.5` — визуал
   * подбираем непрозрачными цветами в global.css (как для hover без токена в теме).
   */
  formSwitchDisabledRailColor: "#eef1f5",
  /** Вкл. + disabled: приглушённый синий относительно `formSwitchActiveRailColor`. */
  formSwitchDisabledActiveRailColor: "#94b9d4",
  /**
   * Внешний glow Hover (Figma): checkbox 62-7071, radio 62-7082.
   * У checkbox тень в global.css; у NRadio — встроенный `boxShadowHover` в теме Naive.
   */
  formCheckboxHoverBoxShadow: "0 2px 8px rgba(29, 109, 168, 0.5)",
  /**
   * Primary `NButton` ([Figma 62-6913](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6913&m=dev)):
   * градиент, бордер #3978a8; hover / pressed — соседние варианты в том же COMPONENT_SET.
   */
  buttonPrimaryBorderColor: "#3978a8",
  buttonPrimaryGradient:
    "linear-gradient(180deg, #3f86ba 0%, #0e5c97 100%)",
  buttonPrimaryGradientHover:
    "linear-gradient(180deg, #4698d6 0%, #1670b4 100%)",
  buttonPrimaryGradientPressed:
    "linear-gradient(180deg, #06406c 0%, #256fa6 100%)",
  buttonPrimaryTextShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
  /**
   * Success `NButton` — состояния по макету:
   * [62-6937](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6937&m=dev),
   * [62-6947](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6947&m=dev),
   * [62-6953](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6953&m=dev),
   * [62-6959](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6959&m=dev).
   * Градиенты заданы как у primary (180deg); disabled — тот же градиент, что default + opacity кнопки в Naive.
   */
  buttonSuccessBorderColor: "#3f8f46",
  buttonSuccessGradient:
    "linear-gradient(180deg, #5aad5f 0%, #2e7d32 100%)",
  buttonSuccessGradientHover:
    "linear-gradient(180deg, #6bc070 0%, #3a9a42 100%)",
  buttonSuccessGradientPressed:
    "linear-gradient(180deg, #1f5c24 0%, #358a3c 100%)",
  buttonSuccessTextShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
  /**
   * Default `NButton` — hover / pressed / disabled ([Figma 62-6907](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6907&m=dev),
   * [62-6909](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6909&m=dev),
   * [62-6911](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6911&m=dev)).
   * Заливки hover/focus/disabled = `formReadonlyColor`; тень hover — `button-default.css` + `--iscod-checkbox-hover-shadow` (62-7071).
   */
  buttonDefaultColor: "#ffffff",
  /** Чуть темнее `formReadonlyColor` (pressed, [Figma 62-6909](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6909&m=dev)) */
  buttonDefaultColorPressed: "#e4ebf2",
} as const;
