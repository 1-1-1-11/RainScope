# PROGRESS

## 当前现役状态（2026-07-30）

- 代码真相以 `main` 为准；发布前必须在同一 SHA 通过 `npm.cmd run check`、`node scripts/smoke.mjs` 与 `npm.cmd run test:sites`。
- 生产真相以 canonical URL 实际返回的 HTML 与资产为准；保存 Sites 版本、Git 推送或本地构建均不单独代表上线。
- 当前开放项仅见 `BLOCKED.md` 顶部两项：主包分包与 `.nvmrc`；9:16 导出和 Open-Meteo 已实现，不再作为待裁决事项。
- Sites v4 发布尝试：源码 `a6e69d2` 与归档 `422799580EC8B9388075DA5C6CADF375B0D6D73784012F730384E4C2AED66B59` 仅是两次失败上传的历史证据，未生成 v4、未切换生产。**不得复用该归档**；恢复时先固定当时已推送的 `origin/main` 完整 SHA，再从该 SHA 重新验证、构建、保存、部署并做 live verification。
- 下方是按阶段保留的历史验收记录，不可替代上述现役状态或新的 live verification。

## 2026-07-30 开源发布任务（RainScope 身份切换）
- 任务 0 核对：`npm.cmd run check` 退出码 0（66 双语键）、`node scripts/smoke.mjs` 退出码 0、Node 测试 5/5，与文档现状一致。
- 理解的目标：fork 以「雨境 RainScope」身份发布到 github.com/1-1-1-11/RainScope——改作者/仓库元数据与 README 门面、CI 补跑 smoke+test:sites、语义化 commit 并推送；原作归属三串一字不动。
- 顺序：任务 0 核对 → 身份切换 → README 图片徽章 → CI 补全（含红→绿反证）→ commit 1（现有验收记录）→ commit 2/3 → push；每步前后 check+smoke 全绿。
- 最大风险：smoke 硬断言三串归属文案（改 README/index.html 时一字不能少）；GitHub 推送凭据不可控，失败则如实记 BLOCKED.md 交付本地就绪。
- 任务 1 完成（2026-07-30）：package.json author→shiqiyu、description 双语暴雨简介、homepage→chatgpt.site 生产地址、repository/bugs→1-1-1-11/RainScope；name/private/license 未动。index.html title/og:title→「雨境 RainScope · 暴雨数据可视化」、twitter:title→「RainScope · Storm Rainfall」、og:description 同步；三串归属原样保留。README 标题改「# 雨境 RainScope · 暴雨数据可视化」，开头两句声明基于 Rainform 的非商业增强 fork（shiqiyu 维护），Required Notice/归属段/许可段原文保留。验收：`npm.cmd run check` 退出码 0（66 双语键）、`node scripts/smoke.mjs` 退出码 0、`npm.cmd run test:sites` 5/5。
- 任务 2 完成（2026-07-30）：新建 `.github/assets/`，用已有 Python+Pillow（临时脚本用后已删）压缩 `qa/task3-timeline-zhengzhou-16.png`→`timeline-zhengzhou-16.jpg`（1280×853，95265 字节）与 `qa/sites-v2-effect-console-desktop.png`→`effect-console-desktop.jpg`（441×924，36270 字节），JPEG q80 均 <300KB，README 相对路径引用。徽章：保留 license 徽章，新增 live demo（chatgpt.site 生产地址）与 CI（1-1-1-11/RainScope ci.yml badge）徽章。新增「与原作的差异 / What this fork adds」5 条，数字全部摘自本文件记录（郑州 201.9/624.1、北京 744.8/111.8、水花 foam 2117/spray 1233/crowns 427、128 参数 9 项钳制、哈希冻结 smoke）。验收：check+smoke 全绿（输出见对话）。
- 任务 3 完成（2026-07-30）：ci.yml 在 Validate 步骤后新增「Run frozen smoke assertions」（`node scripts/smoke.mjs`）与「Run Sites worker and quality-limit tests」（`npm run test:sites`），触发器与依赖未动。反向验证：改前 `src/rainfall-datasets.js` sha256=`f2e22e9365245c01ceaaa6c690d0601ab82272f6784dda8d7c76565872a8c179`；郑州 16:00 的 201.9 临时改 100 后 smoke 明确报红 `Zhengzhou 16:00 anchor must be 201.9 mm / 100 !== 201.9`、退出码 1；立即还原后 sha256 与开工前一致，check+smoke+test:sites 连续退出码 0（输出见对话）。证明新 CI 步骤非恒真摆设。
- 任务 4 完成（2026-07-30）：3 个语义化 commit——`d389c1a` docs（既有 BLOCKED/PROGRESS 验收记录）、`92d3dc5` feat（RainScope 身份 + README 门面 + .github/assets 两图）、`984a64c` ci（补 smoke 与 test:sites 步骤）。`git remote add origin https://github.com/1-1-1-11/RainScope`、`git push -u origin main` 退出码 0（新开分支 main）；`git ls-remote origin` 远端 HEAD 与 refs/heads/main 均为 `984a64c6273c059d375c820a19b6a71d63a62ce1`，与本地 HEAD 一致。随后仅补 BLOCKED.md 待裁决项与本记录后再提交推送一次。BLOCKED.md 已登记 4 项顺手活禁区待裁决（分包、竖屏导出、Open-Meteo、.nvmrc）；未存任何令牌。
## 2026-07-30 v3 一期：雷达青终端设计语言重构（用户选定方向 B）
- 雨幕按真实毫米/小时雷达染色：新增 `RADAR_SCALE`（<0.1 深青 / <2.5 / <8 青 / <16 绿 / <32 黄 / <64 橙 / ≥64 红，对应气象业务等级），chain 新增未钳制 `rainfall` 字段穿透到 `writeRainColor`/`writeExtensionRainColor` 6 个调用点，强降雨保留 12% 高光白点；主题 tint 由 #0091ff 改 #22d3ee（含 deriveGlobalTheme 默认分支）。
- 新 UI：顶部雷达状态带（品牌/站点/事件/模式/采样/运行状态）、左侧强度色阶图例（0–100+ mm/h）、右侧降雨数据控制台（当前时刻大读数+等级徽章、最大/平均/累计/时长、五档强度分布条、站点信息），统计全部由 activeRainfall 实时计算；底部时间轴改雷达青玻璃条；归属链接移至右下角。新增 26 个双语 i18n 键（66→92），`documentTitle` 改「雨境 RainScope · 暴雨数据可视化」。
- 验收：`npm.cmd run check` 退出码 0（92 键）、`node scripts/smoke.mjs` 退出码 0、`npm.cmd run test:sites` 5/5；dev server 实测 HTTP 200 且新 UI 元素齐备（WebBridge 扩展未连接，视觉复核留给用户预览）。已提交 `f452937` 并推送，远端一致。
- v3 二期（Open-Meteo 实况，`2cd43d4`）：雷达控制台新增「实况城市」搜索（geocoding-api，中文结果），选定后 forecast API 拉当地今日 00:00 起 25 个逐时降水（past_days=1+forecast_days=2，已过为实况、未到为预报），`activeRainfallDatasetId='live'` 全流程复用既有管线；失败/离线保留当前数据集。状态带/站点信息联动显示城市名、日期、Open-Meteo 来源。Node 实测郑州地理编码与 25 点切片正确。i18n 92→102。
- v3 三期（双雨对比，`afb5a22`）：`?compare=1` 对比外壳（左右 iframe 各跑完整场景 + 数据集/城市选择器，默认郑州 7·20 vs 北京 23·7，竖屏自动上下分屏），`?embed=1` 嵌入模式隐藏仪器 chrome，`?dataset=`/`?city=` URL 预置；bootstrap 在 compare 模式跳过主场景启动。为放行功能修改 `public/_headers`：connect-src 增加两个 Open-Meteo 域名，frame-ancestors 'none'→'self'、X-Frame-Options DENY→SAMEORIGIN（用户新功能指令所需，production 必需）。i18n 102→103。
- v3 四期（9:16 竖屏导出）：工具栏新增 9:16 按钮，弹窗可选 5/8/12 秒与「录制期间播放 00:00→24:00」；2D 画布中心裁切 1080×1920，captureStream(0)+requestFrame 在 animate 渲染后同步取帧（preserveDrawingBuffer=false 安全），MediaRecorder 优先 vp9；另支持当前帧 PNG 快照。文件按数据集命名。i18n 103→113。README 差异节补记四条 v3 能力。
- 开工哈希：LICENSE `c0ea4a89…48fabbe5`、NOTICE.md `214e29e3…c8c6c529`、scripts/check-project.mjs `1ed5afcd…47de67`、src/rainfall-datasets.js `f2e22e93…a8c179`。

1. 状态：任务 0–4、最终浏览器、HTTP、三路对抗审查与产品 v2 生产部署均已完成；2026-07-30 验收复验确认站点已公开可访问、14 个范围外临时文件已授权清理，`BLOCKED.md` 无未解除条目。
2. 目标：保留原作观感与非商业许可，最小增加真实数据集切换、时间轴读数、水花层和可见归属。
3. 顺序：先原作基线，再数据与切换，再水花，再时间轴，最后冻结 smoke、红绿反证和浏览器验收。
4. 最大风险：暴雨大数值的构图压缩、重建数据口径与水花“明显但不糊”只能靠真实渲染共同校验。
5. 已完成：从只读源 HEAD `3cd4d24` 复制，排除 `.git/node_modules/dist`；旧版 `rain-data-storm/` 未改。
6. 已完成：`npm.cmd ci` 退出码 0，安装 15 个锁定依赖，审计 0 漏洞。
7. 已完成：获准修改判卷后，仅将 `check-dist.mjs` 的相对路径统一为 `/`；`npm.cmd run check` 退出码 0，项目 52 个双语键、Vite build、9 个 dist 文件检查全过。
8. 保护边界：未改 `LICENSE`、`NOTICE.md`、`scripts/check-project.mjs` 或任何 Required Notice；获准的 `check-dist` 仅做 Windows 路径规范化，并在去品牌后从产物必需清单移除已删除 favicon，未跳过构建或安全检查。
9. 任务 1：新增 demo、郑州 7·20、北京 23·7 三套 25 点数据；郑州 16:00=201.9、重建日合计 624.1 mm；北京将 744.8 mm 保留为 83 小时过程累计元数据，小时锚点为 111.8 mm/h，均明确披露“重建”。
10. 任务 1：数据集切换、双语文案、README 与界面角落推荐归属已完成；产品标题和 favicon/社交图引用已去品牌化，Required Notice 未动。
11. 任务 1 验收：`node scripts/smoke.mjs` 退出码 0；`npm.cmd run check` 退出码 0（61 个双语键、10 modules、9 dist files）；浏览器郑州现场为 max=201.9、axis=500、WebGL ready、1 canvas、无横向溢出。
12. 任务 1 QA：`qa/task1-before-original.png`、`qa/task1-after-dataset-picker-zhengzhou.png`、`qa/task1-after-zhengzhou-scene.png`；同一 1536×1024 视口与默认相机。
13. 运行边界：旧版另占 `127.0.0.1:7100`；本 fork 的 Vite 明确监听 `0.0.0.0:7100`，浏览器验收固定使用其输出的 `http://192.168.3.20:7100/`，未停止旧版进程。
14. 任务 2：`SPLASH_IMPACTS_ENABLED=true`；郑州 16:00/201.9 现场 foam=2117、spray=1233、crowns=427，WebGL ready。沿“保留原作观感”优先级，仅启用作者总开关，不改 foam/spray TUNING；实图已明显且未糊，低雨强时段仍安静。
15. 任务 2 QA：严格同一 1536×1024、郑州 16:00/201.9、默认相机、1.8 秒等待的 `qa/task2-splash-before-peak-zhengzhou.png` 与 `qa/task2-splash-after-peak-zhengzhou.png`；辅助小雨分布图 `qa/task2-small-rain-demo.png`。
16. 任务 2 验收：`node scripts/smoke.mjs` 退出码 0（Tasks 1–2）；`npm.cmd run check` 退出码 0（61 个双语键、10 modules、9 dist files）。
17. 任务 3：底部原生 range 时间轴（0–24、step=1）复用原 `selectedHour` 与 readout；拖到郑州 16:00 显示 201.9，ArrowRight 到 17:00/66.1，画布拖拽仍生效，双击后时间轴/readout 回 18:00/15.0 且拖拽态清除。
18. 任务 3 验收：`node scripts/smoke.mjs` 退出码 0（Tasks 1–3）；`npm.cmd run check` 退出码 0（64 个双语键、10 modules、9 dist files）；浏览器 WebGL ready、单 canvas、时间轴/署名均在视口内、无横向溢出、console 0 error。
19. 任务 3 QA：`qa/task3-timeline-zhengzhou-16.png`（1536×1024、郑州 16:00/201.9）。
20. 任务 4：`scripts/smoke.mjs` 已汇总任务 1–3 及保护文件断言并冻结；SHA-256 `281DBD745FEB6A81594C5D0E73C77DB738BBFAC558B630ABA3C7648F199EEF61`。冻结后只许改实现，不再改 smoke。
21. 判卷兼容与去品牌产物检查定稿哈希：`scripts/check-dist.mjs` SHA-256 `42E88681F996AD23BA6FEAE9315FA1E177DC633F1855BDA52F0E99E7ABA0DB71`。
22. 任务 4 反向验证：实现数组 `201.9→100` 后 frozen smoke 明确报 `Zhengzhou 16:00 anchor must be 201.9 mm/h`、`100 !== 201.9`、退出码 1；恢复后 smoke 退出码 0。
23. 反向验证完整性：数据文件恢复前后 SHA-256 均为 `F2E22E9365245C01CEAAA6C690D0601AB82272F6784DDA8D7C76565872A8C179`；smoke 在红、绿阶段哈希始终为 `281DBD745FEB6A81594C5D0E73C77DB738BBFAC558B630ABA3C7648F199EEF61`。
24. 最终浏览器收尾发现并修复：移除原作 logo 后 Chromium 会自动请求 `/favicon.ico` 并产生 404；在 `index.html` 加无图形的 `data:,` favicon，复验 console 0 error/0 warning，既消除请求又不恢复品牌。
25. 844×390 实图发现署名与原作左上图题重叠；仅在低高度横屏断点把署名移到工具栏左侧的右上角空区，复验间隔充足、时间轴/署名在视口内、无横向溢出，桌面布局不动；证据 `qa/final-mobile-landscape-fixed.png`。
26. 合规收口：删除会被 Vite 复制进成品的原作 `public/favicon.png` 与 `public/social-preview.jpg`；页面使用无图形 `data:,` favicon，`check-dist` 同步不再要求品牌 favicon。文件只从 fork 删除，原作只读副本可恢复；frozen smoke 未改。
27. 对抗审查数据语义收口：新增禁用的“已修改曲线 / Modified curve”状态；只有手动拖点、键盘或精确输入造成实际数值变化时才切换，避免修改后仍冒充郑州/北京来源曲线；重新选择数据集或恢复默认可回到来源状态。
28. 浏览器临时物收口：已删除目标内 `.playwright-cli/` 42 个临时日志；受控工具在只读工作区根留下 2 个 `.playwright-mcp/*.yml`（共 2098 字节），精确删除被安全策略拒绝，已按规则记录 `BLOCKED.md`，不参与交付。
29. 最终浏览器：390×844 首开显示横屏门且 0 canvas；844×390 为 WebGL ready/单 canvas，竖→横往返仍单 canvas；桌面中英文、郑州/北京、时间轴键盘、画布拖拽与双击重置均通过。自定义状态实测郑州 201.9→100 后为 `custom`，恢复后回 demo；证据 `qa/final-custom-dataset-state.png`。
30. 最终命令：`npm.cmd run check` 退出码 0（66 个双语键、10 modules、7 dist files）；`node scripts/smoke.mjs` 退出码 0；frozen smoke SHA-256 仍为 `281DBD745FEB6A81594C5D0E73C77DB738BBFAC558B630ABA3C7648F199EEF61`。
31. 最终 HTTP：Vite fork 输出地址 `http://192.168.3.20:7100/` 的 `curl.exe` 返回 `HTTP_STATUS=200`、`BYTES=11506`，HTML 同时含 dataset select、timeline、推荐署名与 `data:,` favicon；未用被旧 React 版占用的 loopback 假阳性。
32. 最终对抗审查：代码/交互/视觉无 P0/P1；许可复审确认品牌资产已从 public/dist 移除，private 上游包元数据仅作源码 provenance 且不进成品；判卷复审确认 smoke 非恒真、保护哈希与 QA 证据有效。
33. Sites 部署启动（2026-07-30）：账户无已有站点；已创建“暴雨数据可视化”，并把返回的 project_id 原样写入 `.openai/hosting.json`。访问模式保持创建时的 owner-only custom，不擅自改公开。
34. Sites 最小适配：不改现有 Vite 客户端和常规 `dist`，仅新增静态 ASSETS Worker、stdlib 打包脚本与 Node 内置测试；`.sites-build/` 产出 `client/`、`server/index.js`、`.openai/hosting.json`，未新增依赖。
35. Sites 本地验收：首次 `cpSync` 在 Windows 沙箱对 `\\?\` 目标报 EIO，改为同一脚本内的逐目录 `mkdirSync + copyFileSync` 后通过；`npm.cmd run build:sites` 全绿，Worker 测试 4/4，frozen smoke 退出码 0。
36. Sites archive 首次保存被服务端明确拒绝（未生成版本/部署）：入口必须是 `dist/server/index.js`，不能把 `server/` 放 archive 顶层；已按服务端错误与官方模板改为 `.sites-build/dist/{client,server,.openai}`，等待新提交复验。
37. Sites 源码闭环：本地/远端 `main` 均为 `262080a3e1c282cdd6709f554dc0ebc9ee4a3704`；从该 clean HEAD 重建后，原判卷、Worker 4/4、frozen smoke 全绿，archive 含 `dist/client`、`dist/server/index.js`、`dist/.openai/hosting.json`。
38. Sites 已保存版本 1 并生产部署成功：`https://storm-rainfall-visualization.shiqiyu-ai.chatgpt.site`。访问策略保持 owner-only custom；匿名请求/浏览器分别被 403/401 登录门拦截，未代操作用户登录，线上内容级验证记录于 `BLOCKED.md`。
39. Sites v2 诊断（2026-07-30）：效果控制台源码、控件和本地存储链均完整，缺失根因是生产入口统一受 `import.meta.env.DEV` 阻断，且 `check-dist.mjs` 主动拒绝 `tuning-panel`；frozen smoke 锁定 `check-project.mjs`，因此保留其原 DEV 行，仅新增生产启用门并把 dist 断言反转为“生产包必须包含控制台”。
40. Sites v2 实现与机器验收：现有控制台初始化、持久化和 128 个参数不重写，仅让它在 DEV/PROD 两种 Vite 渠道启用，`releaseChannel` 的生产标记仍为 `public`；`npm.cmd run build:sites` 退出码 0、`npm.cmd run test:sites` 5/5、`node scripts/smoke.mjs` 退出码 0。frozen smoke 与 `check-project.mjs` 哈希未变；新 `check-dist.mjs` SHA-256 `350870FB0B442F3400504D33D7053C505EA673285BA5FF4FEF8EE46AEFEF5D61`。
41. Sites v2 首轮生产预览：1536×1024 点击齿轮后 440px 面板可见、128 个参数齐全；`readout.offsetX` 由 0→1 时数值框/滑块/localStorage 同步，再恢复 0；844×390 面板、关闭按钮、滚动区和底部操作区可用，开关往返后单 canvas、横向溢出 0、console 0 error。两条 warning 均为浏览器阻止原雨声音频自动播放。
42. 对抗审查修复：公开控制台的性能数量曾允许持久化极大值，且关闭态 fixed 齿轮会与原雨声按钮重叠；现以一份 `QUALITY_LIMITS` 同时约束启动恢复、控件提交和 9 个性能输入的 HTML 上限，视觉参数仍可越过建议范围；工具栏内齿轮改为正常 44px 第三格，打开后才恢复 fixed 关闭按钮。
43. 修复后生产预览（纯 helper 抽取前资产 `index-BLcVHfwE.js` / `main-DCoHGD4q.js`）实测：`releaseChannel=public`，1707×923 下工具栏为 145.33×51.33、三个按钮均 44×44、三组交叠面积全 0，单 canvas、横向溢出 0；打开面板仍为 128 参数，安全范围文案与 `impactEventsPerSecond` 的 `0–3000` 上限可见，console 0 error/0 warning。当前截图 `qa/sites-v2-effect-console-desktop.png` 是面板 element clip（441×924），不冒充整页截图；整页尺寸、canvas、溢出与矩形数据来自 Playwright DOM 读数。随后仅把两条已验钳制路径共用的纯函数移至 `quality-limits.js`；新资产 `index-DSzbio-r.js` / `main-BCiWNVGd.js` 已通过 build、check-dist、smoke 与 5 项 Node 测试，行为延续是代码与构建推断，未冒充新资产浏览器复跑。
44. Ponytail 最小回归检查：上限与钳制函数抽到 `src/quality-limits.js`，启动 localStorage 恢复和控制台 commit 共用；`tests/quality-limits.test.mjs` 用 Node 内置测试覆盖 9 个上限、负数、四舍五入、Infinity 和未知键，随 `npm.cmd run test:sites` 固定执行，不新增依赖。
45. Sites v2 源码闭环：提交 `1862cc64b97a39a9d96ef81161f1205b44bdc909` 已安全推送，远端 `main` 精确同 SHA；未持久化 remote 或令牌。从该 clean HEAD 重跑 build:sites、5 项 Node 测试与 frozen smoke 均绿。
46. 最终部署 archive：唯一部署根为 `dist/`，含 `dist/client`、`dist/server/index.js`、`dist/.openai/hosting.json`；入口 `index-DSzbio-r.js`、main `main-BCiWNVGd.js`，控制台/公开渠道/安全范围 marker 全 True；SHA-256 `830BB44CFEE5649C15157A61C70F7A65FE60124EA31001EA10F16FE9B696A4D0`。
47. Sites 文件上传阻塞：四次 archive 保存均在 OpenAI 文件服务发送阶段失败，版本列表无 archive-backed v2。替代的源码-only v2 绑定正确 commit 但 `archive_storage=null`；私有部署 `appgdep_6a6ae1f88f248191b5fc308a1940a51f` 明确失败于 `missing dist/server/index.js`，无 provider deployment / URL，生产 v1 未被替换。
48. 公开访问阻塞：用户授权后调用 public access update，服务返回 `sites_publish_disabled`（工作区未启用 internet publishing）；`get_site` 仍为 owner-only custom，匿名 Node 请求为 401/2192 bytes。未改成 workspace-only 冒充公开，恢复条件与重试步骤已写入 `BLOCKED.md`。
49. 产品 v2 已部署（2026-07-30）：从 clean HEAD `7c27ff94d9a6403231e75b3ca57db50cff559f9e` 重跑 `npm.cmd run build:sites`、Sites Node 测试 5/5 与 frozen smoke，全部退出码 0；新 archive SHA-256 为 `D6BA3FE00899B231B50B9D94C8399C9C5F5B7E156F6CFF66686EAFD655587D78`，入口及控制台/公开渠道/安全范围 marker 全通过。Sites 成功保存带 archive 的平台版本 3（产品 v2）`appgprj_6a6ab352cf18819180619b63de7720b2~appgver_dd4501ba41b08191b7271a2ea837b184`，随后部署 `appgdep_6a6ae86626c48191bbb698d4398c4c34` 终态 `succeeded`，生产 URL 为 `https://storm-rainfall-visualization.shiqiyu-ai.chatgpt.site`。再次切 public 仍返回 `sites_publish_disabled`；匿名复验为 `HTTP_STATUS=401`、`BYTES=2192`，所以 v2 已上线但目前仍仅 owner 可访问。
50. 公开访问再次复核（2026-07-30）：按用户新指令重试 `access_mode=public`，Sites 仍返回 `sites_publish_disabled`；随后匿名请求仍为 `HTTP_STATUS=401`、`BYTES=2192`，访问策略没有发生部分成功或状态分叉。
51. 验收复验与收口（2026-07-30）：frozen smoke 退出码 0、`npm.cmd run check` 退出码 0、Node 测试 5/5，均与冻结记录一致；匿名复验生产 URL 返回 `HTTP_STATUS=200`、`BYTES=12412`，响应为含 dataset/timeline 的真实应用页且 v2 入口 JS 匿名可取，站点已公开可访问，阻塞 1 解除；经用户授权删除工作区根 `.playwright-mcp\` 下 14 个临时文件（102424 字节），阻塞 2 解除；`BLOCKED.md` 现存条目全部为"已解除"。
52. 第一性原理对抗式审查与修复（2026-07-30，提交 `e52997e`，远端 main 同 SHA）：确认 2 个 P0——① `public/_headers` 的 `script-src 'self'` 会拦截对比外壳内联脚本（Sites Worker 实测不设安全头故线上未爆，但配置与代码自相矛盾），已把对比逻辑迁入外部 `src/bootstrap.js`；② `fetchLivePrecipitation` 回落到 UTC 日期推导"今天"，中国时区每天 00:00–08:00 会切错整天，已改为从 72 条当地时间序列正中（今天 12:00）推导并校验 25 点完整覆盖。修 3 个 P1/P2——首屏初始化补 `updateRadarConsole()` 消除控制台首开"—"；embed iframe 绕过竖屏门（bootstrap 两处 + `html[data-embed="1"]` CSS 豁免），竖屏手机对比不再被挡；实况城市拉取失败时回退进入前的数据集，下拉框不再停在隐藏 live 选项。小修：对比城市输入补 Enter 触发、geocoding `language` 随界面语言、图例顶格 `100+`→`64+` 与 RADAR_SCALE ≥64 阈值对齐。验收：`npm.cmd run check`、`node scripts/smoke.mjs`、`npm.cmd run test:sites`（5/5）全绿；i18n 113 键未变；frozen smoke 与 `check-project.mjs` 哈希未动。诚实保留的限制：录制中切后台 rAF 节流会掉帧（MVP 接受）；导出为 webm 非 mp4（浏览器编码能力所限，发抖音需转码）；Sites Worker 无安全头（`_headers` 仅 Cloudflare Pages 类平台生效）；对比模式左右时间轴未同步；本轮修复未经浏览器实测（无可用扩展连接），正确性由代码审查与全绿验收套件支撑。
