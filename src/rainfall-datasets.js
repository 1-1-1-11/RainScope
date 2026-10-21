// Required Notice: Rainform / 数据成雨 © 2026 afterimage — https://rainform.pages.dev/

/**
 * DATA NOTE / 数据说明（2026-07-29）
 *
 * `demo` is the original Rainform demonstration curve.
 *
 * `zhengzhou-720` is a reconstruction for 2021-07-20. Official anchors:
 * 624.1 mm daily rainfall at Zhengzhou National Weather Station and
 * 201.9 mm from 16:00–17:00. The remaining hourly values are reconstructed,
 * not an official hourly observation series.
 * Source (published 2022-01-21):
 * https://www.mem.gov.cn/gk/sgcc/tbzdsgdcbg/202201/P020220121639049697767.pdf
 *
 * `beijing-23-7` is a reconstruction centred on 2023-07-31. Official facts:
 * the 83-hour event-total maximum was 744.8 mm at Wangjiayuan Reservoir,
 * while the maximum hourly intensity was 111.8 mm/h at Qianlingshan from
 * 10:00–11:00. They are different stations and metrics. The remaining hourly
 * values and the 402.8 mm slice total are reconstructed, not official records.
 * Sources (published 2023-08-03 and 2023-07-31):
 * https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202308/t20230803_3213311.html
 * https://www.cma.gov.cn/ztbd/2023zt/20230728/2014072109/202307/t20230731_5685657.html
 */

export const DEFAULT_RAINFALL_DATASET_ID = 'demo';

export const RAINFALL_DATASETS = Object.freeze({
  demo: Object.freeze({
    id: 'demo',
    labelKey: 'datasetDemo',
    noteKey: 'datasetNoteDemo',
    reconstructed: false,
    values: Object.freeze([
      2.1, 3.8, 4.6, 3.2, 2.5, 5.2, 7.7, 7.4,
      9.3, 9.8, 10.0, 6.7, 6.3, 1.6, 2.2, 3.8,
      5.9, 7.4, 9.1, 10.0, 8.8, 5.3, 3.1, 1.8,
      1.2
    ])
  }),
  'zhengzhou-720': Object.freeze({
    id: 'zhengzhou-720',
    labelKey: 'datasetZhengzhou720',
    noteKey: 'datasetNoteZhengzhou720',
    eventDate: '2021-07-20',
    reconstructed: true,
    officialDailyTotalMm: 624.1,
    officialPeakHourlyMm: 201.9,
    officialPeakHour: 16,
    values: Object.freeze([
      12, 14, 16, 18, 20, 22, 24, 26,
      24, 20, 14, 8, 4, 12, 22, 65,
      201.9, 66.1, 15, 8, 5, 3, 2.1, 2,
      0
    ])
  }),
  'beijing-23-7': Object.freeze({
    id: 'beijing-23-7',
    labelKey: 'datasetBeijing237',
    noteKey: 'datasetNoteBeijing237',
    eventDate: '2023-07-31',
    reconstructed: true,
    officialProcessTotalMm: 744.8,
    officialPeakHourlyMm: 111.8,
    officialPeakHour: 10,
    values: Object.freeze([
      4, 5, 6, 8, 10, 12, 14, 18,
      22, 28, 111.8, 36, 26, 20, 16, 13,
      11, 9, 8, 7, 6, 5, 4, 3,
      0
    ])
  })
});

export const defaultRainfall = RAINFALL_DATASETS[DEFAULT_RAINFALL_DATASET_ID].values;

/**
 * A failed live-city lookup must not leave the hidden `live` option selected.
 * Built-in and custom datasets stay as they were. An active live city falls
 * back to the last built-in dataset.
 */
export function datasetIdAfterFailedLiveLookup(
  previousDatasetId,
  builtInDatasetId = DEFAULT_RAINFALL_DATASET_ID
) {
  if (previousDatasetId !== 'live') return previousDatasetId;
  return RAINFALL_DATASETS[builtInDatasetId]
    ? builtInDatasetId
    : DEFAULT_RAINFALL_DATASET_ID;
}
