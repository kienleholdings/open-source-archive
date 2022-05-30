# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.3] - 2022-05-10

### Added

- N / A

### Changed

- Replaced vite with tsup for a faster build time

### Removed

- N / A

## [3.1.2] - 2022-04-25

### Added

- N / A

### Changed

- Fixed a bug where the outputs had the wrong file name, preventing imports

### Removed

- N / A

## [3.1.1] - 2022-04-25

### Added

- N / A

### Changed

- Moved project to `technologies` repo
- Restructured folders for a better developer experience
- Replaced styleguidist with Ladle (internal only change, no outside users should notice)
- Upgraded all deps to latest

### Removed

- N / A

## [3.1.0] - 2022-03-02

### Added

- Added a wrapper for dark mode to react-styleguidist for easier testing
- Added `isLastInGroup` prop to `<Checkbox />` and `<RadioButton />` for margin standardization

### Changed

- Standardized all input bottom margins at `16px`
- Standardized all input error margins at `16px`
- Changed input error text color to `negative` for a better UX

### Removed

- N / A

## [3.0.0] - 2022-02-17

### Added

- Added a `classNames` prop to each component that allows the developer to adjust individual element
  styles of each component from one object, rather than requiring two props for each

### Changed

- Migrated from Yarn to Pnpm
- Migrated from Lerna to mrt
- **Breaking:** Updated `zephyr-core` to 3.x
- **Breaking:** Updated `zephyr-react` to 3.x
- Updated webpack to 5
- Changed all components from arrow to standard functions to satisfy the new AirBNB config
- **Breaking:** Refactored `computeClassName` to support new `classNames` prop

### Removed

- **Breaking:** Removed `<element>ClassNames` and `<element>ClassNameOverride` props from every
  component
- **Breaking:** Removed `CommonComponentProps` interface

## [2.1.0] - 2021-11-06

### Added

- Added typography component

### Changed

- Updated every component to use `<Typography />` when possible
- Updated every component to support dark mode when possible

### Removed

- N / A

## [2.0.1] - 2021-10-11

### Added

- Added documentation to `README.md` to help first-time users with setup and usage

### Changed

- Updated `.npmrc` to remove unnecessary files from the package to reduce download size

### Removed

- N / A

## [2.0.0] - 2021-10-10

### Added

- 2.0.0 Initial Release

### Changed

- N / A

### Removed

- N / A
