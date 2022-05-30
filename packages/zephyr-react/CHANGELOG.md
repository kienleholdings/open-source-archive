# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.1] - 2022-05-10

### Added

- N / A

### Changed

- Replaced vite with tsup for a faster build time

### Removed

- N / A

## [3.2.0] - 2022-04-26

### Added

- Added a `loading` state to buttons for actions that make API calls or otherwise have long load
  times

### Changed

- N / A

### Deleted

- N / A

## [3.1.2] - 2022-04-25

### Added

- N / A

### Changed

- Moved project to `technologies` repo
- Restructured folders for a better developer experience
- Replaced styleguidist with Ladle (internal only change, no outside users should notice)
- Upgraded all deps to latest

### Deleted

- N / A

## [3.1.1] - 2022-03-23

### Added

- N / A

## Changed

- Changed imports for all fontawesome icons to be directly from their respective files instead of
  destructured from the module's index to reduce bundle size
- Fixed a bug where `<Footer />` would return the error
  `Each child in a list should have a unique "key" prop.`
- Fixed a bug where the footer's individual bottom links were styled with `bottomLinkList` and the
  list itself wasn't styleable

## Deleted

- N / A

## [3.1.0] - 2022-03-02

### Added

- Added a wrapper for dark mode to react-styleguidist for easier testing
- Added `isLastInGroup` prop to `<Checkbox />` and `<RadioButton />` for margin standardization
- Added a `responsiveHeader` prop to `<Typography />` to allow smaller headings on mobile
- Added `break-word` to `<Typography />`'s `wrapper` class for a better mobile UX

### Changed

- Fixed `<Alert />` using incorrect font color
- Fixed `<Alert />` close button being improperly named for screen readers
- Made `onClick()` an optional prop for `<Button />` (use-case for `htmlType="submit"`)
- Fixed secondary colors not working for `<Button />`
- Standardized all input bottom margins at `16px`
- Fixed grid widths not working due to computed values
- Made `<Footer />` smaller (feedback from CMC team)
- Made `<Navbar />` smaller (feedback from CMC team)
- Fixed react missing key error in `<Navbar />`
- Fixed text color in `<Pagination />`
- Disable `Next` and `Previous` buttons in pagination instead of hiding them for a less jumpy UX
- Fixed improper hover and keyboard select colors in `<SingleSelect />`
- Fixed light border showing in dark mode in `<TextArea />`

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
- Updated webpack to 5
- Changed all components from arrow to standard functions to satisfy the new AirBNB config
- **Breaking:** Refactored `computeClassName` to support new `classNames` prop

### Removed

- **Breaking:** Removed `<element>ClassNames` and `<element>ClassNameOverride` props from every
  component
- **Breaking:** Removed `CommonComponentProps` interface

## [2.1.2] - 2021-11-06

### Added

- N / A

### Changed

- Changed the default container size in `<Navbar />` to `four-column` to match `<Footer />`
- Fixed a bug in `<Navbar />` where text wasn't vertically centered
- Fixed a bug in `<Footer />` where the container's margin was overrided from auto
- Fixed a bug in `<Footer />` where the spacer between the bottom links was black, regardless of the
  primary theme color

### Removed

- N / A

## [2.1.1] - 2021-11-06

### Added

- Added `<Footer />` to the exports in `index.ts`

### Changed

- N / A

### Removed

- N / A

## [2.1.0] - 2021-11-06

### Added

- Added typography component

### Changed

- Updated every component to use `<Typography />` when possible
- Updated every component to support dark mode when possible

### Removed

- N / A

## [2.0.2] - 2021-11-04

### Added

- Added `<Container />` and `<Navbar />` to the exports in `index.ts`

### Changed

- N / A

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

**THIS BREAKING RELEASE IS A COMPLETE REDESIGN OF ZEPHYR.** This means that applications using
Zephyr 1.x will need to be completely redesigned in order to use this version. Due to the amount of
changes, no changelog will be provided, and this should be treated as a new package.

### Added

- 2.0.0 Initial Release

### Changed

- N / A

### Removed

- N / A

## [1.0.0] - 2020-10-01

### Added

- Added Dark Mode support. All Zephyr elements will automatically change to light or dark mode
  depending on the user's machine settings
- Added React to peer dependency list

### Changed

- Upgraded `zephyr-tailwind` to 1.x which changes a lot of things including colors
- Changed default generated text to `responsive` which by default enables light / dark mode

### Removed

- N / A

## [0.3.3] - 2020-09-06

### Added

- N / A

### Changed

- Modified gutter in grid and container to fit the new mobile gutter

### Removed

- N / A

## [0.3.2] - 2020-09-06

### Added

- N / A

### Changed

- Modified columns to support 1-12 regardless of screen resolution
- Modified grid and columns for a 16px gutter on mobile rather than 32px

### Removed

- N / A

## [0.3.1] - 2020-09-06

### Added

- N / A

### Changed

- Fixed mobile grid being out of 6 and tablet grid being out of 4
- Fixed margin not showing up be default in text

### Removed

- N / A

## [0.3.0] - 2020-09-06

### Added

- Icon Component with Close Icon
- Modal Component
- ALl (`a`) size for grid columns for columns that need to be the same size on every device
- Added a `link` text formatter to `generateTextStyle`

### Changed

- Changed margin of grid columns to include a 32px bottom margin
- Fixed `m` and `t` sizes not working in grid columns

### Removed

- N / A

## [0.2.0] - 2020-07-13

### Added

- Alert component to help display errors to users

### Changed

- N / A

### Removed

- N / A

## [0.1.0] - 2020-07-07

### Added

- Initial Release

### Changed

- N / A

### Removed

- N / A
