import type { GlobalThemeOverrides } from "naive-ui";

import { ISCOD } from "./tokens";

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
    primaryColor: ISCOD.colorLink,
    primaryColorHover: "#256b9c",
    primaryColorPressed: "#1f5984",
    primaryColorSuppl: ISCOD.colorLinkMenuIdle,
  },
  /** Фон страницы и прозрачная оболочка под кастомную шапку ИСОД */
  Layout: {
    color: ISCOD.pageBackgroundColor,
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
    aTextColor: ISCOD.colorLink,
  },
  Input: {
    heightSmall: "36px",
    heightMedium: "36px",
    fontSizeSmall: "13px",
    fontSizeMedium: "13px",
    lineHeight: "20px",
    borderRadius: "3px",
    border: `1px solid ${ISCOD.formBorderColor}`,
    borderHover: `1px solid ${ISCOD.formBorderColor}`,
    borderFocus: `1px solid ${ISCOD.formBorderColor}`,
    /**
     * Фокус поля ([Figma 62-6845](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6845&m=dev)):
     * glow #1d6da8, radius 4.
     */
    boxShadowFocus: `0 0 4px ${ISCOD.colorUiKitBlue}`,
    color: "#ffffff",
    colorFocus: "#ffffff",
    colorDisabled: ISCOD.formReadonlyColor,
    textColor: ISCOD.formTextColor,
    textColorDisabled: "#64727d",
    placeholderColor: ISCOD.formPlaceholderColor,
    placeholderColorDisabled: ISCOD.formPlaceholderColor,
    iconColor: ISCOD.formPlaceholderColor,
    iconColorHover: ISCOD.formPlaceholderColor,
    iconColorPressed: ISCOD.formPlaceholderColor,
  },
  DatePicker: {
    panelBorderRadius: "3px",
    panelColor: "#ffffff",
    panelTextColor: ISCOD.formTextColor,
    itemBorderRadius: "3px",
    itemTextColor: ISCOD.formTextColor,
    iconColor: ISCOD.formPlaceholderColor,
    iconColorDisabled: ISCOD.formPlaceholderColor,
    panelBoxShadow: "0 4px 12px rgba(42, 60, 73, 0.12)",
  },
  Switch: {
    /**
     * Рельс выкл.: [Figma 62-7087](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-7087&m=dev) —
     * тот же нейтральный fill, что `formReadonlyColor` (#f4f6f8), не `#e2e8f1`.
     */
    railColor: ISCOD.formReadonlyColor,
    railColorActive: ISCOD.formSwitchActiveRailColor,
    buttonColor: "#ffffff",
    /**
     * В naive-ui 2.44 у NSwitch в стилях нет отдельного :hover по рельсу и нет
     * токена railColorHover — только фон вкл/выкл. Усиливаем видимый отклик по фокусу
     * (клавиатура), по духу ближе к макетному Hover glow (#1D6DA880, blur 8).
     */
    boxShadowFocus: "0 2px 8px rgba(29, 109, 168, 0.5)",
    /**
     * Disabled: в naive-ui 2.44 нет отдельных токенов рельса; внешний вид — global.css
     * (Figma 62-7090, `--iscod-switch-disabled-rail*`).
     */
  },
  Radio: {
    /** Figma UI Kit: круг 20px (как checkbox small). */
    radioSizeSmall: "20px",
    radioSizeMedium: "20px",
    /** Покой: светлый фон круга (как неотмеченный в макете). */
    color: ISCOD.formSwitchRailColor,
    /**
     * Figma 62-7076 (Chosen): заливка круга #f4f6f8 — в Naive это `colorActive`
     * на `.n-radio__dot` в состоянии checked (radio.cssr.ts).
     */
    colorActive: ISCOD.formReadonlyColor,
    /** Внутренняя точка (::before) — серый диск, не синий primary. */
    dotColorActive: ISCOD.formRadioChosenDotColor,
    /** Кольцо в покое — нейтральный бордер, как в макете. */
    boxShadow: `inset 0 0 0 1px ${ISCOD.formBorderColor}`,
    /**
     * Figma 62-7082 (hover): тот же inset-бордер + внешний glow, как у checkbox.
     * В Naive это именно токен `boxShadowHover` (см. radio.cssr.ts).
     */
    boxShadowHover: `inset 0 0 0 1px ${ISCOD.formBorderColor}, ${ISCOD.formCheckboxHoverBoxShadow}`,
    /** Figma 62-7076: выбран — inset-бордер #d7dee6. */
    boxShadowActive: `inset 0 0 0 1px ${ISCOD.formBorderColor}`,
    boxShadowDisabled: `inset 0 0 0 1px ${ISCOD.formBorderColor}`,
    boxShadowFocus: `inset 0 0 0 1px ${ISCOD.formBorderColor}, ${ISCOD.formCheckboxHoverBoxShadow}`,
  },
  Checkbox: {
    sizeSmall: "20px",
    sizeMedium: "20px",
    borderRadius: "3px",
    border: `1px solid ${ISCOD.formBorderColor}`,
    /**
     * Figma 62-7071 (hover): бордер остаётся #d7dee6. В Naive hover подставляет
     * `borderChecked` — держим как у `border`, тень hover задаётся в global.css
     * через --iscod-checkbox-hover-shadow (у Naive нет токена тени на :hover).
     */
    borderChecked: `1px solid ${ISCOD.formBorderColor}`,
    borderFocus: `1px solid ${ISCOD.formBorderColor}`,
    color: ISCOD.formSwitchRailColor,
    colorChecked: ISCOD.formSwitchRailColor,
    /** Figma 62-7069: серая галочка; геометрия — дефолт Naive (path не настраивается). */
    checkMarkColor: ISCOD.formRadioChosenDotColor,
    boxShadowFocus: "none",
  },
  /**
   * Заголовок панели ([Figma 1-878](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=1-878&m=dev)):
   * кегль `collapseSectionTitleFontSize` (H3 в гайде — 16px), 700, цвет текста ИСОД; стрелка мягче.
   */
  Collapse: {
    titleFontSize: ISCOD.collapseSectionTitleFontSize,
    titleFontWeight: "700",
    titleTextColor: ISCOD.formTextColor,
    arrowColor: ISCOD.formPlaceholderColor,
    dividerColor: ISCOD.formBorderColor,
  },
  /**
   * Primary: бордер и «сплошные» токены под ripple/фолбэк; градиент — `button-primary.css`.
   */
  Button: {
    borderPrimary: `1px solid ${ISCOD.buttonPrimaryBorderColor}`,
    borderHoverPrimary: `1px solid ${ISCOD.buttonPrimaryBorderColor}`,
    borderPressedPrimary: `1px solid ${ISCOD.buttonPrimaryBorderColor}`,
    borderFocusPrimary: `1px solid ${ISCOD.buttonPrimaryBorderColor}`,
    borderDisabledPrimary: `1px solid ${ISCOD.buttonPrimaryBorderColor}`,
    colorPrimary: "#3f86ba",
    colorHoverPrimary: "#4698d6",
    colorPressedPrimary: "#06406c",
    colorFocusPrimary: "#4698d6",
    colorDisabledPrimary: "#3f86ba",
    rippleColorPrimary: "#3f86ba",
    borderSuccess: `1px solid ${ISCOD.buttonSuccessBorderColor}`,
    borderHoverSuccess: `1px solid ${ISCOD.buttonSuccessBorderColor}`,
    borderPressedSuccess: `1px solid ${ISCOD.buttonSuccessBorderColor}`,
    borderFocusSuccess: `1px solid ${ISCOD.buttonSuccessBorderColor}`,
    borderDisabledSuccess: `1px solid ${ISCOD.buttonSuccessBorderColor}`,
    colorSuccess: "#5aad5f",
    colorHoverSuccess: "#6bc070",
    colorPressedSuccess: "#1f5c24",
    colorFocusSuccess: "#6bc070",
    colorDisabledSuccess: "#5aad5f",
    rippleColorSuccess: "#5aad5f",
    /**
     * Default: заливка/бордер/текст из токенов формы и синего UI-kit; hover-glow — `button-default.css`.
     */
    color: ISCOD.buttonDefaultColor,
    colorHover: ISCOD.formReadonlyColor,
    colorPressed: ISCOD.buttonDefaultColorPressed,
    colorFocus: ISCOD.formReadonlyColor,
    colorDisabled: ISCOD.formReadonlyColor,
    textColor: ISCOD.formTextColor,
    textColorHover: ISCOD.colorLink,
    textColorPressed: ISCOD.colorLink,
    textColorFocus: ISCOD.colorLink,
    textColorDisabled: ISCOD.formRadioChosenDotColor,
    border: `1px solid ${ISCOD.formBorderColor}`,
    borderHover: `1px solid ${ISCOD.colorUiKitBlue}`,
    borderPressed: `1px solid ${ISCOD.colorUiKitBlue}`,
    borderFocus: `1px solid ${ISCOD.colorUiKitBlue}`,
    borderDisabled: `1px solid ${ISCOD.formBorderColor}`,
    rippleColor: ISCOD.colorUiKitBlue,
  },
  /**
   * Выпадающие меню (`n-dropdown`): панель и пункты в духе полей и DatePicker
   * ([Figma 62-6939](https://www.figma.com/design/gYFtjvqz9BOa97CPbA77xg/Untitled?node-id=62-6939&m=dev) — позиция/стрелка на триггере задаются пропсами).
   */
  Dropdown: {
    borderRadius: "3px",
    color: "#ffffff",
    optionTextColor: ISCOD.formTextColor,
    optionTextColorHover: ISCOD.formTextColor,
    optionTextColorActive: ISCOD.colorLink,
    optionTextColorChildActive: ISCOD.colorLink,
    dividerColor: ISCOD.formBorderColor,
    optionColorHover: ISCOD.formReadonlyColor,
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
    labelTextColor: ISCOD.formTextColor,
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
    feedbackFontSizeSmall: ISCOD.formFeedbackFontSize,
    feedbackFontSizeMedium: ISCOD.formFeedbackFontSize,
    feedbackTextColorError: ISCOD.formFeedbackErrorTextColor,
    feedbackHeightSmall: "18px",
    feedbackHeightMedium: "18px",
  },
};
