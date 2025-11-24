import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAngleLeft,
  faAngleRight,
  faAnglesRight,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

const COLORS = {
  iconDefault: "var(--components-pagination-element-icon-default, #464F5E)",
  iconDisabled: "var(--components-pagination-element-icon-disabled, #8C95A8)",
  textDefault: "var(--components-pagination-element-text-default, #464F5E)",
  textActive: "var(--components-pagination-element-text-active, #2927B2)",
  bgActive: "var(--components-pagination-element-bg-active, #EAE8FB)",
  dropdownBg: "var(--components-dropdown-bg-default, #ffffff)",
  dropdownBorder: "var(--components-dropdown-border-default, #8C95A8)"
};

const baseInteractiveStyle = {
  width: 32,
  height: 32,
  padding: "4px 12px",
  borderRadius: 8,
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  border: "none",
  background: "transparent",
  fontFamily: "Poppins, 'Inter', sans-serif",
  fontSize: 14,
  lineHeight: "20px",
  letterSpacing: 0.3,
  cursor: "pointer"
};

const clamp = (value, minValue, maxValue) => Math.max(minValue, Math.min(value, maxValue));

const buildPages = (current, total, visible = 5) => {
  if (total <= visible) {
    return Array.from({ length: total }, (_, idx) => idx + 1);
  }
  const half = Math.floor(visible / 2);
  let start = Math.max(1, current - half);
  let end = start + visible - 1;
  if (end > total) {
    end = total;
    start = end - visible + 1;
  }
  return Array.from({ length: visible }, (_, idx) => start + idx);
};

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  pageSizeOptions = [10, 25, 50],
  pageSize = pageSizeOptions[0] || 10,
  onPageSizeChange
}) {
  if (totalPages < 1) return null;
  const safeCurrent = clamp(currentPage, 1, totalPages);
  const pages = buildPages(safeCurrent, totalPages);

  const handleChange = (value) => {
    const next = clamp(value, 1, totalPages);
    if (next === safeCurrent) return;
    onPageChange?.(next);
  };

  const handlePageSizeChange = (event) => {
    const nextSize = Number(event.target.value);
    onPageSizeChange?.(nextSize);
  };

  const renderPageButton = (pageNumber) => {
    const isActive = pageNumber === safeCurrent;
    return (
      <button
        key={pageNumber}
        type="button"
        style={{
          ...baseInteractiveStyle,
          borderRadius: isActive ? 50 : 8,
          background: isActive ? COLORS.bgActive : "transparent",
          color: isActive ? COLORS.textActive : COLORS.textDefault,
          fontWeight: 400
        }}
        aria-current={isActive ? "page" : undefined}
        onClick={() => handleChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const buildIconButton = ({ label, icon, disabled, onClick }) => (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseInteractiveStyle,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{
          fontSize: 14,
          color: disabled ? COLORS.iconDisabled : COLORS.iconDefault
        }}
      />
    </button>
  );

  return (
    <div
      style={{
        width: "100%",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
        fontFamily: "Poppins, 'Inter', sans-serif",
        color: COLORS.textDefault
      }}
    >
      {buildIconButton({
        label: "Go to first page",
        icon: faAnglesLeft,
        disabled: safeCurrent === 1,
        onClick: () => handleChange(1)
      })}
      {buildIconButton({
        label: "Previous page",
        icon: faAngleLeft,
        disabled: safeCurrent === 1,
        onClick: () => handleChange(safeCurrent - 1)
      })}

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>{pages.map(renderPageButton)}</div>

      {buildIconButton({
        label: "Next page",
        icon: faAngleRight,
        disabled: safeCurrent === totalPages,
        onClick: () => handleChange(safeCurrent + 1)
      })}
      {buildIconButton({
        label: "Go to last page",
        icon: faAnglesRight,
        disabled: safeCurrent === totalPages,
        onClick: () => handleChange(totalPages)
      })}

      {pageSizeOptions.length > 0 && (
        <div
          style={{
            width: 72,
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 4
          }}
        >
          <div
            style={{
              width: "100%",
              height: 32,
              borderRadius: 8,
              padding: "6px 12px",
              background: COLORS.dropdownBg,
              outline: `1px solid ${COLORS.dropdownBorder}`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxSizing: "border-box"
            }}
          >
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              style={{
                flex: "1 1 auto",
                border: "none",
                background: "transparent",
                fontFamily: "Poppins, 'Inter', sans-serif",
                fontSize: 14,
                color: "var(--components-placeholder-text-filled, #464F5E)",
                appearance: "none",
                outline: "none",
                cursor: "pointer"
              }}
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              style={{
                height: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                style={{ fontSize: 12, color: "var(--components-input-after-icon-default, #464F5E)" }}
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

