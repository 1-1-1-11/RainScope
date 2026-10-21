# Changelog

All notable changes to RainScope are documented in this file.

RainScope version numbers start at 1.0.0. The upstream Rainform 2.0.0 baseline this fork is derived from is recorded at the bottom and is not a RainScope release tag.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-10-21

First tagged RainScope release. It packages the noncommercial Rainform fork maintained by shiqiyu.

Reconstructed hourly series are reconstructions, not raw observations. Official anchors and their sources are listed in [docs/DATA_SOURCES.md](docs/DATA_SOURCES.md).

### Added

- Fact-anchored storm reconstructions for Zhengzhou 7·20 (2021-07-20) and Beijing 23·7 (2023-07-31), with dataset switching, a 0–24 timeline, splash impacts, and a radar-terminal interface.
- Production visual tuning console with `QUALITY_LIMITS` clamps.
- Open-Meteo live-city precipitation. A failed lookup stays on the current built-in or custom curve, and an active live city falls back to the last built-in dataset.
- Side-by-side compare mode and in-browser 9:16 WebM/PNG export.
- GitHub Actions validation, frozen smoke checks, issue and pull request templates, a code of conduct, and a tag-driven release workflow.

### Changed

- Public project identity is 雨境 RainScope. Rainform attribution, `LICENSE`, and `NOTICE.md` stay in place.
- Vite is patched to 6.4.5, with the locked `nanoid` and `source-map-js` releases that clear the current npm audit.

## Upstream baseline — Rainform 2.0.0 (2026-07-23)

Not a RainScope tag. Inherited baseline from Rainform / 数据成雨 by afterimage:

- Interactive liquid-metal rainfall landscape.
- Editable hourly rainfall data, bilingual UI, and responsive controls.
- Rain audio, mobile landscape gating, and X in-app browser guidance.
- Production security headers, source-map exclusion, and Cloudflare Pages deployment.
