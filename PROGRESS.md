# PROGRESS

1. 状态：任务 0–4、最终浏览器、HTTP 与三路对抗审查均已完成；仅剩 `BLOCKED.md` 记录的范围外浏览器临时快照无法代删。
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
