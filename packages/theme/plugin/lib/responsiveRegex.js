// regex for all Tailwind CSS color utilities
// (bg|to|via|from|text|ring|fill|caret|stroke|border|divide|accent|shadow|outline|decoration|placeholder|ring-offset)

module.exports = [
  {
    pattern: /.*/
  },
  {
    // responsive utilites for project responsive modifiers
    pattern: /.(sm|md|lg|xl|2xl)/,
    variants: ["sm", "md", "lg", "xl", "2xl"]
  },
  {
    // color utilities for project colors
    pattern:
      /(bg|to|via|from|text|fill|stroke|border|outline)/,
    variants: [
      // "first",
      // "last",
      // "odd",
      // "even",
      // "visited",
      // "checked",
      // "empty",
      // "read-only",
      // "group-hover",
      // "group-focus",
      // "focus-within",
      "hover",
      "focus"
      // "focus-visible",
      // "active",
      // "disabled",
    ]
  }
];
