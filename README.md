# 雨境 RainScope

把 00:00–24:00 的 25 个逐时降雨值变成可交互的 Three.js/WebGL 雨景。

RainScope turns 25 hourly rainfall values, from 00:00 through 24:00, into an interactive Three.js/WebGL rain scene.

[![CI](https://github.com/1-1-1-11/RainScope/actions/workflows/ci.yml/badge.svg)](https://github.com/1-1-1-11/RainScope/actions/workflows/ci.yml)
[![License: PolyForm Noncommercial 1.0.0](https://img.shields.io/badge/license-PolyForm_Noncommercial_1.0.0-4c4c4c)](LICENSE)

**Live demo / 在线演示：** <https://storm-rainfall-visualization.shiqiyu-ai.chatgpt.site>

![雨境 RainScope · 郑州 7·20 暴雨 16:00 时刻与时间轴](.github/assets/timeline-zhengzhou-16.jpg)

RainScope is a noncommercial enhancement fork of [Rainform / 数据成雨](https://rainform.pages.dev/) (© 2026 afterimage, PolyForm Noncommercial 1.0.0), maintained by shiqiyu. 郑州 7·20 与北京 23·7 的逐时曲线是围绕官方锚点做的重建，不是官方逐时观测。

## Quick start / 快速开始

Node.js 20 or newer.

```bash
npm ci
npm run dev
```

On Windows, if `npm` is not the Node.js entry point, use `npm.cmd` for the same commands.

Open the printed local URL. Choose a dataset, drag the 0–24 timeline, or search a city. `?compare=1` opens the side-by-side view.

Checks used by CI:

```bash
npm run check
node scripts/smoke.mjs
npm run test:sites
```

`npm run test:sites` expects `dist/` from `npm run check`. It then builds the OpenAI Sites package and checks the worker.

## Data sources / 数据来源

| Series | What it is | Official anchor |
| --- | --- | --- |
| `demo` | Rainform 原作演示曲线，不是观测 | — |
| `zhengzhou-720` | 2021-07-20 重建 | 郑州国家气象站日雨量 624.1 mm；16:00–17:00 为 201.9 mm |
| `beijing-23-7` | 2023-07-31 附近的 24 小时重建 | 王家园水库 83 小时过程最大 744.8 mm（不是小时雨强）；千灵山 10:00–11:00 为 111.8 mm/h |
| Live city | 运行时向 Open-Meteo 读取当地今日逐时降水 | 不入库；失败时回到上一个内置或自定义数据集 |

Citations, and the line between anchors and reconstructed hours, are in [docs/DATA_SOURCES.md](docs/DATA_SOURCES.md). To cite the software, use [CITATION.cff](CITATION.cff).

## Upstream / 上游

Rain visualization derived from Rainform / 数据成雨 by afterimage  
https://rainform.pages.dev/

本仓库保留原作 `LICENSE`、`NOTICE.md` 与每一条 Required Notice。署名不能把商业使用变成被允许的使用。

```text
Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/
```

## License / 许可

Noncommercial study, modification, and redistribution are permitted under the [PolyForm Noncommercial License 1.0.0](LICENSE). This is source-available software. It is not an OSI-approved open-source license. Commercial use, commercial product integration, advertising, and brand work are not permitted. See [COMMERCIAL_USE.md](COMMERCIAL_USE.md) and [docs/INTEGRATION.md](docs/INTEGRATION.md).

The license does not grant the Rainform / 数据成雨 name, logo, or visual identity. See [TRADEMARKS.md](TRADEMARKS.md).

Copyright © 2026 afterimage.

## What this fork adds / 相对原作

- **暴雨重建数据集。** 郑州 7·20 在 16:00 锚定 201.9 mm/h，重建日合计 624.1 mm。北京 23·7 保留 744.8 mm 过程累计元数据，小时锚点是 10:00 的 111.8 mm/h。
- **水花层。** 郑州 16:00 / 201.9 mm/h 现场约 foam 2117、spray 1233、crowns 427。
- **0–24 时间轴。** 25 个点，拖到 16:00 即显示 201.9 mm/h。
- **生产环境效果控制台。** 128 个参数可调，其中 9 个性能输入有 `QUALITY_LIMITS` 钳制，改动存在本地。

  ![128 参数效果控制台](.github/assets/effect-console-desktop.jpg)

- **雷达终端界面。** 雨丝按 mm/h 走青→绿→黄→橙→红色阶，并显示最大、平均、累计、时长和强度分布。
- **实况城市。** 搜索城市后，用 Open-Meteo 的当地今日逐时降水驱动雨景。请求失败会回到之前的内置或自定义数据集。
- **对比与竖屏导出。** `?compare=1` 同屏对比两场雨。可导出 1080×1920 WebM，或当前帧 PNG。
- **冻结检查。** smoke 用哈希锁住 `LICENSE`、`NOTICE.md` 和 `scripts/check-project.mjs`。

## Project layout / 目录

```text
.
├── index.html                 # Shell, metadata, and controls
├── src/bootstrap.js           # Locale, mobile gate, compare, and embed
├── src/rainfall-datasets.js   # 25-point dataset contract
├── src/main.js                # Three.js scene and interactions
├── public/                    # Runtime assets and Cloudflare Pages headers
├── worker/                    # OpenAI Sites static-asset fallback
├── tests/                     # Worker, quality-limit, lookup, and release notes
├── scripts/                   # Validation, Sites packaging, release notes
├── docs/                      # Architecture, data sources, integration
└── .github/                   # CI, release workflow, and templates
```

## Release / 发布

The first RainScope tag is `v1.0.0`. Pushing a `vX.Y.Z` tag runs [.github/workflows/release.yml](.github/workflows/release.yml): it repeats the CI checks, then publishes a GitHub Release whose notes come from the matching section of [CHANGELOG.md](CHANGELOG.md).

The live demo is deployed separately on OpenAI Sites. A green CI run, a saved Sites version, or a Git tag does not by itself prove that production matches `main`. After a Sites deploy, verify the canonical URL and the assets it loads. `public/_headers` applies to Cloudflare Pages-style hosts; the Sites worker does not apply it automatically.

## Contributing / 参与

Issues and pull requests are welcome for reproducible bugs, data-source corrections, and focused improvements. Read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Report vulnerabilities privately: [SECURITY.md](SECURITY.md).

- Architecture: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Data sources: [docs/DATA_SOURCES.md](docs/DATA_SOURCES.md)
- Citation: [CITATION.cff](CITATION.cff)
- Changelog: [CHANGELOG.md](CHANGELOG.md)
- Third-party notices: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)
