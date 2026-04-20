import type { GlobalThemeOverrides } from "naive-ui";

import { MVD } from "./tokens";

/** Типографика гайда: body 14px / 22px интерлиньяж ≈ 22/14 */
const BODY_SIZE = "14px";
const BODY_LINE_HEIGHT = "22px";

/**
 * Единая тема Naive UI: шрифт и базовые размеры как в design-system.md
 */
export const naiveThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily:
      '"PT Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
    fontSize: BODY_SIZE,
    fontSizeMini: "12px",
    fontSizeTiny: "12px",
    fontSizeSmall: "13px",
    fontSizeMedium: BODY_SIZE,
    fontSizeLarge: "16px",
    fontSizeHuge: "18px",
    lineHeight: BODY_LINE_HEIGHT,
    /** Согласовано с цветом ссылок §4.2 */
    primaryColor: MVD.colorLink,
    primaryColorHover: "#256b9c",
    primaryColorPressed: "#1f5984",
    primaryColorSuppl: MVD.colorLinkMenuIdle,
  },
  /** Фон страницы и прозрачная оболочка под кастомную шапку ИСОД */
  Layout: {
    color: MVD.pageBackgroundColor,
    headerColor: "transparent",
    headerBorderColor: "transparent",
  },
  Typography: {
    headerFontWeight: "700",
    headerTextColor: "inherit",
    headerFontSize1: "24px",
    headerFontSize2: "18px",
    headerFontSize3: "16px",
    headerFontSize4: "15px",
    headerFontSize5: "14px",
    pFontSize: BODY_SIZE,
    pLineHeight: BODY_LINE_HEIGHT,
    /** <n-a> внутри типографики */
    aTextColor: MVD.colorLink,
  },
  Input: {
    heightSmall: "36px",
    heightMedium: "36px",
    fontSizeSmall: "13px",
    fontSizeMedium: "13px",
    lineHeight: "20px",
    borderRadius: "3px",
    border: `1px solid ${MVD.formBorderColor}`,
    borderHover: `1px solid ${MVD.formBorderColor}`,
    borderFocus: `1px solid ${MVD.formBorderColor}`,
    /**
     * Фокус поля ([Figma 62-6845](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6845&m=dev)):
     * glow #1d6da8, radius 4.
     */
    boxShadowFocus: `0 0 4px ${MVD.colorUiKitBlue}`,
    color: "#ffffff",
    colorFocus: "#ffffff",
    colorDisabled: MVD.formReadonlyColor,
    textColor: MVD.formTextColor,
    textColorDisabled: "#64727d",
    placeholderColor: MVD.formPlaceholderColor,
    placeholderColorDisabled: MVD.formPlaceholderColor,
    iconColor: MVD.formPlaceholderColor,
    iconColorHover: MVD.formPlaceholderColor,
    iconColorPressed: MVD.formPlaceholderColor,
  },
  DatePicker: {
    panelBorderRadius: "3px",
    panelColor: "#ffffff",
    panelTextColor: MVD.formTextColor,
    itemBorderRadius: "3px",
    itemTextColor: MVD.formTextColor,
    iconColor: MVD.formPlaceholderColor,
    iconColorDisabled: MVD.formPlaceholderColor,
    panelBoxShadow: "0 4px 12px rgba(42, 60, 73, 0.12)",
  },
  Switch: {
    /**
     * Рельс выкл.: [Figma 62-7087](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-7087&m=dev) —
     * тот же нейтральный fill, что `formReadonlyColor` (#f4f6f8), не `#e2e8f1`.
     */
    railColor: MVD.formReadonlyColor,
    railColorActive: MVD.formSwitchActiveRailColor,
    buttonColor: "#ffffff",
    /**
     * В naive-ui 2.44 у NSwitch в стилях нет отдельного :hover по рельсу и нет
     * токена railColorHover — только фон вкл/выкл. Усиливаем видимый отклик по фокусу
     * (клавиатура), по духу ближе к макетному Hover glow (#1D6DA880, blur 8).
     */
    boxShadowFocus: "0 2px 8px rgba(29, 109, 168, 0.5)",
    /**
     * Disabled: в naive-ui 2.44 нет отдельных токенов рельса; внешний вид — global.css
     * (Figma 62-7090, `--mvd-switch-disabled-rail*`).
     */
  },
  Radio: {
    /** Figma UI Kit: круг 20px (как checkbox small). */
    radioSizeSmall: "20px",
    radioSizeMedium: "20px",
    /** Покой: светлый фон круга (как неотмеченный в макете). */
    color: MVD.formSwitchRailColor,
    /**
     * Figma 62-7076 (Chosen): заливка круга #f4f6f8 — в Naive это `colorActive`
     * на `.n-radio__dot` в состоянии checked (radio.cssr.ts).
     */
    colorActive: MVD.formReadonlyColor,
    /** Внутренняя точка (::before) — серый диск, не синий primary. */
    dotColorActive: MVD.formRadioChosenDotColor,
    /** Кольцо в покое — нейтральный бордер, как в макете. */
    boxShadow: `inset 0 0 0 1px ${MVD.formBorderColor}`,
    /**
     * Figma 62-7082 (hover): тот же inset-бордер + внешний glow, как у checkbox.
     * В Naive это именно токен `boxShadowHover` (см. radio.cssr.ts).
     */
    boxShadowHover: `inset 0 0 0 1px ${MVD.formBorderColor}, ${MVD.formCheckboxHoverBoxShadow}`,
    /** Figma 62-7076: выбран — inset-бордер #d7dee6. */
    boxShadowActive: `inset 0 0 0 1px ${MVD.formBorderColor}`,
    boxShadowDisabled: `inset 0 0 0 1px ${MVD.formBorderColor}`,
    boxShadowFocus: `inset 0 0 0 1px ${MVD.formBorderColor}, ${MVD.formCheckboxHoverBoxShadow}`,
  },
  Checkbox: {
    sizeSmall: "20px",
    sizeMedium: "20px",
    borderRadius: "3px",
    border: `1px solid ${MVD.formBorderColor}`,
    /**
     * Figma 62-7071 (hover): бордер остаётся #d7dee6. В Naive hover подставляет
     * `borderChecked` — держим как у `border`, тень hover задаётся в global.css
     * через --mvd-checkbox-hover-shadow (у Naive нет токена тени на :hover).
     */
    borderChecked: `1px solid ${MVD.formBorderColor}`,
    borderFocus: `1px solid ${MVD.formBorderColor}`,
    color: MVD.formSwitchRailColor,
    colorChecked: MVD.formSwitchRailColor,
    /** Figma 62-7069: серая галочка; геометрия — дефолт Naive (path не настраивается). */
    checkMarkColor: MVD.formRadioChosenDotColor,
    boxShadowFocus: "none",
  },
  /**
   * Заголовок панели ([Figma 1-878](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=1-878&m=dev)):
   * кегль `collapseSectionTitleFontSize` (H3 в гайде — 16px), 700, цвет текста ИСОД; стрелка мягче.
   */
  Collapse: {
    titleFontSize: MVD.collapseSectionTitleFontSize,
    titleFontWeight: "700",
    titleTextColor: MVD.formTextColor,
    arrowColor: MVD.formPlaceholderColor,
    dividerColor: MVD.formBorderColor,
  },
  /**
   * Primary: бордер и «сплошные» токены под ripple/фолбэк; градиент — `button-primary.css`.
   */
  Button: {
    borderPrimary: `1px solid ${MVD.buttonPrimaryBorderColor}`,
    borderHoverPrimary: `1px solid ${MVD.buttonPrimaryBorderColor}`,
    borderPressedPrimary: `1px solid ${MVD.buttonPrimaryBorderColor}`,
    borderFocusPrimary: `1px solid ${MVD.buttonPrimaryBorderColor}`,
    borderDisabledPrimary: `1px solid ${MVD.buttonPrimaryBorderColor}`,
    colorPrimary: "#3f86ba",
    colorHoverPrimary: "#4698d6",
    colorPressedPrimary: "#06406c",
    colorFocusPrimary: "#4698d6",
    colorDisabledPrimary: "#3f86ba",
    rippleColorPrimary: "#3f86ba",
    borderSuccess: `1px solid ${MVD.buttonSuccessBorderColor}`,
    borderHoverSuccess: `1px solid ${MVD.buttonSuccessBorderColor}`,
    borderPressedSuccess: `1px solid ${MVD.buttonSuccessBorderColor}`,
    borderFocusSuccess: `1px solid ${MVD.buttonSuccessBorderColor}`,
    borderDisabledSuccess: `1px solid ${MVD.buttonSuccessBorderColor}`,
    colorSuccess: "#5aad5f",
    colorHoverSuccess: "#6bc070",
    colorPressedSuccess: "#1f5c24",
    colorFocusSuccess: "#6bc070",
    colorDisabledSuccess: "#5aad5f",
    rippleColorSuccess: "#5aad5f",
    /**
     * Default: заливка/бордер/текст из токенов формы и синего UI-kit; hover-glow — `button-default.css`.
     */
    color: MVD.buttonDefaultColor,
    colorHover: MVD.formReadonlyColor,
    colorPressed: MVD.buttonDefaultColorPressed,
    colorFocus: MVD.formReadonlyColor,
    colorDisabled: MVD.formReadonlyColor,
    textColor: MVD.formTextColor,
    textColorHover: MVD.colorLink,
    textColorPressed: MVD.colorLink,
    textColorFocus: MVD.colorLink,
    textColorDisabled: MVD.formRadioChosenDotColor,
    border: `1px solid ${MVD.formBorderColor}`,
    borderHover: `1px solid ${MVD.colorUiKitBlue}`,
    borderPressed: `1px solid ${MVD.colorUiKitBlue}`,
    borderFocus: `1px solid ${MVD.colorUiKitBlue}`,
    borderDisabled: `1px solid ${MVD.formBorderColor}`,
    rippleColor: MVD.colorUiKitBlue,
  },
  /**
   * Выпадающие меню (`n-dropdown`): панель и пункты в духе полей и DatePicker
   * ([Figma 62-6939](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6939&m=dev) — позиция/стрелка на триггере задаются пропсами).
   */
  Dropdown: {
    borderRadius: "3px",
    color: "#ffffff",
    optionTextColor: MVD.formTextColor,
    optionTextColorHover: MVD.formTextColor,
    optionTextColorActive: MVD.colorLink,
    optionTextColorChildActive: MVD.colorLink,
    dividerColor: MVD.formBorderColor,
    optionColorHover: MVD.formReadonlyColor,
    optionColorActive: "rgba(44, 119, 174, 0.1)",
    peers: {
      Popover: {
        borderRadius: "3px",
        boxShadow: "0 4px 12px rgba(42, 60, 73, 0.12)",
      },
    },
  },
  Form: {
    asteriskColor: "#fb000f",
    labelTextColor: MVD.formTextColor,
    labelFontWeight: "700",
    labelFontSizeLeftSmall: "14px",
    labelFontSizeLeftMedium: "14px",
    labelHeightSmall: "16px",
    labelHeightMedium: "16px",
    labelPaddingHorizontal: "0 8px 0 0",
    /**
     * Подсказка под контролом ([Figma 62-6886](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6886&m=dev)):
     * `feedbackFontSize*` → `--n-feedback-font-size`. У item без `size` дефолт **medium** (см. `form/src/utils.mjs`).
     */
    feedbackFontSizeSmall: MVD.formFeedbackFontSize,
    feedbackFontSizeMedium: MVD.formFeedbackFontSize,
    feedbackTextColorError: MVD.formFeedbackErrorTextColor,
    feedbackHeightSmall: "18px",
    feedbackHeightMedium: "18px",
  },
  /** Подзаголовок: хлебные крошки ([Figma 62-7265](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-7265&m=dev)). */
  Breadcrumb: {
    fontSize: "12px",
    itemLineHeight: "12px",
    itemTextColor: "#2a3c49",
    itemTextColorHover: "#2a3c49",
    itemTextColorPressed: "#2a3c49",
    itemTextColorActive: "#2a3c49",
    separatorColor: "#b8bec6",
  },
};
