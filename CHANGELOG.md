# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0-beta] - 2026-08-18

### Added

- Locked Hero section headline into a 2D line segment structure to enforce exact 4-line breaks during scaling.
- Implemented fluid `clamp()` text scaling for responsive headline typography without layout reflow.
- Added dedicated cursor-blink animation and cursor alignment logic to the typewriter effect.
- Updated project favicon assets.

### Fixed

- Fixed marquee full-bleed breakout alignment to eliminate right-side layout overflow offset.
- Resolved text whitespace collapse inside flex line segment containers using `whitespace-pre`.

### Removed

- Removed stale image assets.

## [0.3.0-beta] - 2026-08-18

### Added

- Responsive mobile layout support across core portfolio components.

### Fixed

- Updated Header and Footer padding (`px-4 md:px-8`) and hid GitHub commit info on mobile displays.
- Made Hero section headline typography scaling responsive (`text-2xl md:text-6xl`) with adjusted element margins.
- Scaled HeroBadge dimensions (`h-10 md:h-14`) and font sizes dynamically for small viewports and touch targets.
- Resized tech stack marquee tile cards (`w-24 h-24 md:w-28 md:h-28`) and icons (`w-8 h-8 md:w-10 md:h-10`) for mobile screen bounds.
- Replaced non-standard `text-md` utility with valid Tailwind `text-base` class in the Hero marquee text snippet.

## [0.2.0-beta] - 2026-08-17

### Added

- Root layout SEO metadata including dynamic title template, first-person bio description, OpenGraph/Twitter card tags, and crawler directives (`robots`).
- Reusable `NavItem` client component for unified touch-friendly header link states.

### Fixed

- Added WebKit vendor prefixes, hardware acceleration, and font-smoothing rules in `globals.css` for Safari/iOS rendering.
- Resolved `at-rule-no-vendor-prefix` stylelint violation by removing redundant `@-webkit-keyframes` block.
- Replaced CSS `:hover` states with React pointer event state handlers (`onPointerEnter` / `onPointerLeave`) across `Hero`, `HeroBadge`, and `Header` components.
- Updated PR branch validation GitHub Actions workflow to allow `develop` → `main` release PRs without requiring feature branch naming prefixes.

## [0.1.0-beta] - 2026-08-17

### Added

- Hero section with animated typewriter headline and skill badges
- Scrolling tech stack marquee with hover-to-reveal descriptions
- Header with GitHub commit info, social links
- Footer with version badge (hover reveals build stack)
- Static export deployment to GitHub Pages via GitHub Actions

[Unreleased]: https://github.com/achrovisual/portfolio/compare/v0.4.0-beta...HEAD
[0.4.0-beta]: https://github.com/achrovisual/portfolio/compare/v0.3.0-beta...v0.4.0-beta
[0.3.0-beta]: https://github.com/achrovisual/portfolio/compare/v0.2.0-beta...v0.3.0-beta
[0.2.0-beta]: https://github.com/achrovisual/portfolio/compare/v0.1.0-beta...v0.2.0-beta
[0.1.0-beta]: https://github.com/achrovisual/portfolio/releases/tag/v0.1.0-beta
