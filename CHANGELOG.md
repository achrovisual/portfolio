# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/achrovisual/portfolio/compare/v0.2.0-beta...HEAD
[0.2.0-beta]: https://github.com/achrovisual/portfolio/compare/v0.1.0-beta...v0.2.0-beta
[0.1.0-beta]: https://github.com/achrovisual/portfolio/releases/tag/v0.1.0-beta
