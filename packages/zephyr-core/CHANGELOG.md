# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.0] - 2022-06-01

### Added

- N / A

### Changed

- **Breaking:** Completely redesigned Tailwind Config from the ground up, treat this like a new
  project entirely

### Removed

- Removed TypeScript and linting, it wasn't doing anything here anyway

## [3.1.3] - 2022-04-25

### Added

- N / A

### Changed

- Moved project to `technologies` repo
- Fixed bug where screen widths and heights weren't working
- Upgraded all deps to latest

### Removed

- N / A

## [3.1.2] - 2022-03-02

### Added

- N / A

### Changed

- Fixed bug where the max size in the 8pt grid won't be generated

### Removed

- N / A

## [3.1.1] - 2022-03-02

### Added

- Added grid and fractional sizes to `inset`, and `maxWidth`
- Added `maxHeight` with grid and fractional sizes

### Changed

- Moved `inset` and `maxWidth` to overrides rather than extensions

### Removed

- N / A

## [3.1.0] - 2022-03-02

### Added

- Added Tailwind's list of fractional sizes from the default config to spacing
- Added grid and fractional sizes to `flexBasis`, `height`, `inset`, `translate`, and `width`

### Changed

- Rounded heading sizes to nearest whole

### Removed

- Removed negative values from margin config script as those are handled automatically in Tailwind 3

## [3.0.0] - 2022-02-17

### Added

- **Breaking:** Added a new first parameter called `content`. This is an array of strings and is
  used to determine what TailwindCSS classes to purge from the final bundle (a Tailwind 3
  requirement)

### Changed

- Migrated from Yarn to Pnpm
- Migrated from Lerna to mrt
- **Breaking:** Upgraded TailwindCSS to 3.x
- Replaced `@import` in `zephyr-core.css` with `@tailwind`

### Removed

- Removed `variants` section from the config as per the Tailwind 3 upgrade guide

## [2.0.2] - 2021-11-06

### Added

- N / A

### Changed

- Updated `darkMode` in the config to `media` as this was supposed to be the way we handled dark
  mode initially (must have missed code review)

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

**ATTENTION** This package was migrated from `zephyr-tailwind`. This package is not a drop-in
replacement for `zephyr-tailwind`, and should be treated as a new package rather than an update

### Added

- 2.0.0 Initial Release

### Changed

- N / A

### Removed

- N / A
