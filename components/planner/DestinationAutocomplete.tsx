"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { inputClassName } from "@/components/ui/Button";
import {
  filterDestinations,
  findDestinationMatch,
  getDestinationValidationError,
  normalizeDestination,
} from "@/lib/destinations";

interface DestinationAutocompleteProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: string | null;
}

export function DestinationAutocomplete({
  id: idProp,
  value,
  onChange,
  onBlur,
  disabled = false,
  error = null,
}: DestinationAutocompleteProps) {
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const listboxId = `${inputId}-listbox`;

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const suggestions = useMemo(() => filterDestinations(value), [value]);
  const normalizedValue = normalizeDestination(value);
  const exactMatch = findDestinationMatch(value);
  const showCustomOption =
    normalizedValue.length > 0 &&
    !exactMatch &&
    !getDestinationValidationError(value);

  const optionCount = suggestions.length + (showCustomOption ? 1 : 0);

  const closeList = () => {
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  const selectDestination = (label: string) => {
    onChange(label);
    closeList();
    inputRef.current?.focus();
  };

  const handleInputChange = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(true);
    setHighlightIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightIndex((current) => (current + 1) % Math.max(optionCount, 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightIndex((current) =>
        current <= 0 ? Math.max(optionCount - 1, 0) : current - 1,
      );
      return;
    }

    if (event.key === "Enter" && isOpen && highlightIndex >= 0) {
      event.preventDefault();
      if (highlightIndex < suggestions.length) {
        selectDestination(suggestions[highlightIndex].label);
      } else if (showCustomOption) {
        selectDestination(normalizedValue);
      }
      return;
    }

    if (event.key === "Escape") {
      closeList();
    }
  };

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        closeList();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const getOptionId = (index: number) => `${listboxId}-option-${index}`;

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={
          highlightIndex >= 0 ? getOptionId(highlightIndex) : undefined
        }
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : `${inputId}-hint`}
        value={value}
        disabled={disabled}
        placeholder="Search cities or type your own..."
        autoComplete="off"
        className={`${inputClassName()} ${error ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/30" : ""}`}
        onChange={(event) => handleInputChange(event.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
      />
      <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-mist">
        Pick a popular bleisure city or enter any destination.
      </p>

      {isOpen && optionCount > 0 ? (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-line bg-panel shadow-glow"
        >
          {suggestions.map((destination, index) => {
            const isHighlighted = highlightIndex === index;
            return (
              <li
                key={destination.label}
                id={getOptionId(index)}
                role="option"
                aria-selected={isHighlighted}
                className={`cursor-pointer px-3 py-2.5 transition ${
                  isHighlighted ? "bg-sky/15 text-white" : "text-slate-200 hover:bg-panel2"
                }`}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setHighlightIndex(index)}
                onClick={() => selectDestination(destination.label)}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{destination.label}</span>
                  <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-wide text-mist">
                    {destination.region}
                  </span>
                </div>
              </li>
            );
          })}

          {showCustomOption ? (
            <li
              id={getOptionId(suggestions.length)}
              role="option"
              aria-selected={highlightIndex === suggestions.length}
              className={`cursor-pointer border-t border-line px-3 py-2.5 transition ${
                highlightIndex === suggestions.length
                  ? "bg-sky/15 text-white"
                  : "text-slate-200 hover:bg-panel2"
              }`}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => setHighlightIndex(suggestions.length)}
              onClick={() => selectDestination(normalizedValue)}
            >
              <span className="text-sm">
                Use custom destination:{" "}
                <strong className="font-medium text-sky">{normalizedValue}</strong>
              </span>
            </li>
          ) : null}
        </ul>
      ) : null}

      {error ? (
        <p id={`${inputId}-error`} role="alert" className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
