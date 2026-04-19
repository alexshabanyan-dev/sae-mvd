import { ISCOD } from "./tokens";

/** Пробрасывает токены в :root для глобальных стилей (сырой <a>, утилиты). */
export function applyIscodCssVariables() {
  const r = document.documentElement.style;
  r.setProperty("--iscod-page-background", ISCOD.pageBackgroundColor);
  r.setProperty("--iscod-color-link", ISCOD.colorLink);
  r.setProperty("--iscod-color-link-menu-idle", ISCOD.colorLinkMenuIdle);
  r.setProperty("--iscod-color-link-underline-hover", ISCOD.colorLinkUnderlineHover);
  r.setProperty("--iscod-font-size-heading-link", ISCOD.fontSizeHeadingLink);
  r.setProperty("--iscod-header-gradient", ISCOD.headerGradient);
  r.setProperty("--iscod-header-text", ISCOD.headerTextColor);
  r.setProperty(
    "--iscod-header-watermark-opacity",
    String(ISCOD.headerWatermarkOpacity),
  );
  r.setProperty("--iscod-header-rule", ISCOD.headerRuleColor);
  r.setProperty(
    "--iscod-checkbox-hover-shadow",
    ISCOD.formCheckboxHoverBoxShadow,
  );
  r.setProperty(
    "--iscod-switch-hover-rail",
    ISCOD.formSwitchHoverRailColor,
  );
  r.setProperty(
    "--iscod-switch-disabled-rail",
    ISCOD.formSwitchDisabledRailColor,
  );
  r.setProperty(
    "--iscod-switch-disabled-rail-active",
    ISCOD.formSwitchDisabledActiveRailColor,
  );
  r.setProperty("--iscod-button-primary-gradient", ISCOD.buttonPrimaryGradient);
  r.setProperty(
    "--iscod-button-primary-gradient-hover",
    ISCOD.buttonPrimaryGradientHover,
  );
  r.setProperty(
    "--iscod-button-primary-gradient-pressed",
    ISCOD.buttonPrimaryGradientPressed,
  );
  r.setProperty(
    "--iscod-button-primary-text-shadow",
    ISCOD.buttonPrimaryTextShadow,
  );
  r.setProperty(
    "--iscod-button-success-gradient",
    ISCOD.buttonSuccessGradient,
  );
  r.setProperty(
    "--iscod-button-success-gradient-hover",
    ISCOD.buttonSuccessGradientHover,
  );
  r.setProperty(
    "--iscod-button-success-gradient-pressed",
    ISCOD.buttonSuccessGradientPressed,
  );
  r.setProperty(
    "--iscod-button-success-text-shadow",
    ISCOD.buttonSuccessTextShadow,
  );
}
