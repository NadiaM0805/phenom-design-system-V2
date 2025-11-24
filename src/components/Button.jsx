import React from "react";
import { tokens } from "../tokens";

const VARIANT_STYLES = {
  primary: {
    backgroundColor: tokens.colors.primary,
    color: "#fff",
    border: `1px solid ${tokens.colors.primary}`
  },
  secondary: {
    backgroundColor: tokens.colors.background,
    color: tokens.colors.neutralText,
    border: `1px solid ${tokens.colors.neutralBorder}`
  }
};

const SIZE_STYLES = {
  sm: {
    paddingInline: tokens.spacing.sm,
    paddingBlock: tokens.spacing.xs,
    fontSize: "12px"
  },
  md: {
    paddingInline: tokens.spacing.md,
    paddingBlock: tokens.spacing.sm,
    fontSize: tokens.typography.baseFontSize
  },
  lg: {
    paddingInline: tokens.spacing.lg,
    paddingBlock: tokens.spacing.md,
    fontSize: "16px"
  }
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  style,
  children,
  ...rest
}) {
  const variantStyles = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
  const sizeStyles = SIZE_STYLES[size] || SIZE_STYLES.md;

  const composedStyles = {
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.buttonFontWeight,
    borderRadius: tokens.radii.md,
    cursor: disabled ? "not-allowed" : "pointer",
    width: fullWidth ? "100%" : "auto",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing.xs,
    transition: "opacity 150ms ease",
    opacity: disabled ? 0.5 : 1,
    ...variantStyles,
    ...sizeStyles,
    ...style
  };

  return (
    <button type="button" style={composedStyles} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

