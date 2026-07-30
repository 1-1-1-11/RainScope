# BLOCKED

## 已解除：工作区禁用互联网发布，站点无法改为公开

- 用户已明确要求公开；`update_site_access(access_mode=public)` 返回确定性业务错误：`sites_publish_disabled` / `Publishing Sites to the internet is not enabled for this workspace.`，不是参数猜测或登录问题。
- `get_site` 随后确认访问策略仍为 `custom`，仅 owner 一名用户、无群组；匿名 Node 请求现场为 `HTTP_STATUS=401`、`BYTES=2192`。
- 2026-07-30 用户再次要求切公开后已原样重试，仍得到同一工作区级错误；紧随其后的匿名请求仍为 `401 / 2192 bytes`，没有部分生效。
- 未改成 `workspace_all` 冒充公开，也未使用或持久化任何绕过登录能力。要公开必须由工作区管理员先启用 Sites internet publishing；启用后重试相同 access update 并用匿名 HTTP 200 验证。
- **解除证据（2026-07-30 验收复验）**：匿名 `curl` 请求 `https://storm-rainfall-visualization.shiqiyu-ai.chatgpt.site` 返回 `HTTP_STATUS=200`、`BYTES=12412`；响应为真实应用页面（含 dataset 切换、timeline、`data:,` favicon），引用 v2 入口 `/assets/index-DSzbio-r.js` 且该资产匿名下载为 `HTTP_STATUS=200`；页面无登录门内容。站点现已公开可访问。

## 已解除：Sites v2 archive 上传与生产部署

- 早前四次 archive 上传断线及源码-only 版本 2 的 `missing dist/server/index.js` 失败均未替换生产；本轮未重试该空壳版本。
- 从 clean HEAD `7c27ff94d9a6403231e75b3ca57db50cff559f9e` 重建并验证的新 archive SHA-256 为 `D6BA3FE00899B231B50B9D94C8399C9C5F5B7E156F6CFF66686EAFD655587D78`，入口、`tuning-panel`、公开渠道与安全范围标记全部通过。
- Sites 已保存带 archive 的平台版本 3（产品 v2）`appgprj_6a6ab352cf18819180619b63de7720b2~appgver_dd4501ba41b08191b7271a2ea837b184`；部署 `appgdep_6a6ae86626c48191bbb698d4398c4c34` 终态 `succeeded`，生产 URL 为 `https://storm-rainfall-visualization.shiqiyu-ai.chatgpt.site`。

## 已解除：浏览器工具留下 14 个范围外临时文件

- 受控 Playwright 工具把临时文件写到了工作区根 `D:\Desktop\抖音可视化雨量\.playwright-mcp\`，而任务只授权修改 `rainform-plus/`。
- 精确文件：`console-2026-07-30T03-22-32-578Z.log`（8756 字节）、`console-2026-07-30T03-59-04-229Z.log`（482 字节）、`page-2026-07-29T10-59-52-493Z.yml`（1014 字节）、`page-2026-07-29T11-49-43-644Z.yml`（1084 字节）、`page-2026-07-30T03-22-36-592Z.yml`（509 字节）、`page-2026-07-30T03-55-40-820Z.yml`（1564 字节）、`page-2026-07-30T03-59-04-550Z.yml`（1128 字节）、`page-2026-07-30T04-00-10-381Z.yml`（1395 字节）、`page-2026-07-30T04-05-27-119Z.yml`（41587 字节）、`page-2026-07-30T04-13-52-058Z.yml`（1232 字节）、`page-2026-07-30T04-27-23-515Z.yml`（1084 字节）、`page-2026-07-30T04-49-12-429Z.yml`（1084 字节）、`page-2026-07-30T04-53-58-749Z.yml`（40245 字节）、`page-2026-07-30T04-58-42-661Z.yml`（1260 字节），合计 102424 字节。
- 已关闭受控浏览器；清理命令因目标位于只读边界而被安全策略拒绝，未绕过。它们不参与源码、构建、运行或正式 QA；需要用户另行授权后才能删除。
- `rainform-plus/.playwright-cli/` 的 42 个本次临时日志已在允许范围内清理，正式截图只保留在 `qa/`。
- **解除证据（2026-07-30 验收复验）**：用户明确授权后，上述 14 个文件已全部删除，`.playwright-mcp\` 目录已清空。

## 已解除：性能硬上限缺少可重复回归检查

- 修复后生产包已显示 9 个性能数量的安全范围；启动恢复和控件提交现共用 `src/quality-limits.js` 的纯钳制函数。
- 计划在浏览器把 `impactEventsPerSecond` 输入远超 3000 后读取回值，并刷新验证仍可进入；筛选到该控件后，受控工具的 DOM 读数因审批流网络断线被拒绝且明确要求不得绕过。
- 未绕过浏览器工具；改为留下 `tests/quality-limits.test.mjs`，对 9 个上限、负数、四舍五入、Infinity 和未知键做可重复 Node 反证，并纳入 `npm.cmd run test:sites`。最终结果 5/5，通过后该代码级验证债已解除；浏览器 `999999→3000→刷新` 的人工交互仍可作为附加亲验，不再是唯一回归证据。

## 已解除：任务 0 基线在 Windows 上无法通过（2026-07-29）

- 状态：**RESOLVED。** 用户已明确允许修改判卷脚本；仅将 `path.relative()` 结果规范化为 `/` 后，`npm.cmd run check` 退出码 0。
- Goal 自动续跑第 3 回合复核：`npm.cmd run check:dist` 再次退出码 1；音频仍 `fileExists:true`、`size:529244`，路径比较仍为 `actual:"audio\\rain-loop.wav"` 对 `required:"audio/rain-loop.wav"`。同一阻塞已连续跨 3 个 goal 回合成立。
- Goal 自动续跑第 2 回合复核：`npm.cmd run check:dist` 仍退出码 1；同一命令现场同时得到 `fileExists:true`、`actual:"audio\\rain-loop.wav"`、`required:"audio/rain-loop.wav"`、`includes:false`，外部状态未变化。
- 只读源已定位为 `C:\Users\32299\Documents\kimi\workspace\demo-repos\Rainform`，Git HEAD `3cd4d24`，工作树干净；已复制到本目录，排除了 `.git`、`node_modules`、`dist`。
- `npm.cmd ci` 实际退出码 0：`added 15 packages`，`found 0 vulnerabilities`。
- `npm.cmd run check` 连续两次均在原作 `scripts/check-dist.mjs:23` 退出码 1：`Error: Production output is missing audio/rain-loop.wav.`
- 但 `dist\audio\rain-loop.wav` 实际存在，大小 `529244` 字节，SHA-256 为 `EE7265B9663CDD0396A16C4FAE5A12248AADF3E73B2479FDDAFC57C675152FC1`，与 `public\audio\rain-loop.wav` 完全一致。
- 根因：`scripts/check-dist.mjs:19-23` 用 Windows `path.relative()` 生成反斜杠路径 `audio\rain-loop.wav`，再与硬编码正斜杠字符串 `audio/rain-loop.wav` 比较，因此文件存在也会判缺失。
- 原约束下不能合法消除该失败；2026-07-29 获得修改判卷脚本的明确授权后，按根因完成一行修复，未绕过任何检查。
- 环境另有差异：任务文档称 Node `v24.15.0`，本次 PowerShell 7.6.3 实际解析到 Node `v24.14.0`；路径分隔符根因与该补丁版本差异无关。
- 解除证据：`Project checks passed (52 complete translation keys per locale).`、Vite build 成功、`Distribution checks passed (9 files, no source maps or tuning console).`
