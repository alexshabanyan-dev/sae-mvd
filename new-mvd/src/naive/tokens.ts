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
} as const;
