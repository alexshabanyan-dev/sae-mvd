import { MVD } from "./tokens";

/** Пробрасывает токены в :root для глобальных стилей (сырой <a>, утилиты). */
export function applyMvdCssVariables() {
  const r = document.documentElement.style;
  r.setProperty("--mvd-page-background", MVD.pageBackgroundColor);
  r.setProperty("--mvd-color-link", MVD.colorLink);
  r.setProperty("--mvd-color-link-menu-idle", MVD.colorLinkMenuIdle);
  r.setProperty("--mvd-color-link-underline-hover", MVD.colorLinkUnderlineHover);
  r.setProperty("--mvd-font-size-heading-link", MVD.fontSizeHeadingLink);
  r.setProperty("--mvd-header-gradient", MVD.headerGradient);
  r.setProperty("--mvd-header-text", MVD.headerTextColor);
  r.setProperty(
    "--mvd-header-watermark-opacity",
    String(MVD.headerWatermarkOpacity),
  );
  r.setProperty("--mvd-header-rule", MVD.headerRuleColor);
  r.setProperty(
    "--mvd-checkbox-hover-shadow",
    MVD.formCheckboxHoverBoxShadow,
  );
  r.setProperty(
    "--mvd-switch-hover-rail",
    MVD.formSwitchHoverRailColor,
  );
  r.setProperty(
    "--mvd-switch-disabled-rail",
    MVD.formSwitchDisabledRailColor,
  );
  r.setProperty(
    "--mvd-switch-disabled-rail-active",
    MVD.formSwitchDisabledActiveRailColor,
  );
  r.setProperty("--mvd-button-primary-gradient", MVD.buttonPrimaryGradient);
  r.setProperty(
    "--mvd-button-primary-gradient-hover",
    MVD.buttonPrimaryGradientHover,
  );
  r.setProperty(
    "--mvd-button-primary-gradient-pressed",
    MVD.buttonPrimaryGradientPressed,
  );
  r.setProperty(
    "--mvd-button-primary-text-shadow",
    MVD.buttonPrimaryTextShadow,
  );
  r.setProperty(
    "--mvd-button-success-gradient",
    MVD.buttonSuccessGradient,
  );
  r.setProperty(
    "--mvd-button-success-gradient-hover",
    MVD.buttonSuccessGradientHover,
  );
  r.setProperty(
    "--mvd-button-success-gradient-pressed",
    MVD.buttonSuccessGradientPressed,
  );
  r.setProperty(
    "--mvd-button-success-text-shadow",
    MVD.buttonSuccessTextShadow,
  );
}
