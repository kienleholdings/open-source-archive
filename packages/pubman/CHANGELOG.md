# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.3] - 2022-04-21

### Added

- Added `utils.ts` (a 1:1 of `@kienleholdings/mrt-utils`)

### Changed

- Renamed package from `@kienleholdings/mrt-publish` to `@kienleholdings/pubman` since this as an
  org we decided to deprecate `mrt` as a whole in support of Turborepo
- Updated all dependencies to latest
- Moved project to `technologies` repo

### Removed

- Removed `@kienleholdings/mrt-utils` from package dependencies. This package will now self-contain
  its utility functions

## [0.1.2] - 2022-03-03

### Added

- N / A

### Changed

- Updated `@kienleholdings/mrt-utils` to `0.2.0` in order to fix a bug where users that used the
  package to publish packages in private registries couldn't properly check if the package was at
  the latest version or not (wow, that's a lot of "package" in one sentence)

### Removed

- Removed `axios` from package dependencies

## [0.1.1] - 2022-01-24

### Added

- Added a `README.md`

### Changed

- Updated `@kienleholdings/mrt-utils` to `0.1.1` in order to fix a bug where the script looked for
  packages in the directory where the script was stored rather than the directory where the script
  was launched from
- Changed the default module folder from `./packages` to `packages` to allow for better Windows path
  resolution

### Removed

- N / A

## [0.1.0] - 2022-01-24

### Added

- Initial Release

### Changed

- N / A

### Removed

- N / A
