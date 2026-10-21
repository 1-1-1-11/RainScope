# Data sources

RainScope draws rainfall from three kinds of input. Only the official anchors below are cited facts. Every other hourly value in the Zhengzhou and Beijing series is a reconstruction made for visualization. Do not cite those reconstructed hours as official observations.

## Original demonstration curve

`demo` is the original Rainform / 数据成雨 demonstration curve by afterimage. It is not a weather observation.

https://rainform.pages.dev/

## Zhengzhou 7·20 reconstruction

Dataset id: `zhengzhou-720`. Event date: 2021-07-20.

Official anchors, from the Ministry of Emergency Management investigation report published on 2022-01-21:

- 624.1 mm daily rainfall at Zhengzhou National Basic Meteorological Station.
- 201.9 mm from 16:00 to 17:00. RainScope places this anchor at 16:00.

The other 23 hourly values, and the way the day is distributed around that peak, are reconstructed. The series is not an official hourly observation file.

Source:

- 国务院灾害调查组《河南郑州「7·20」特大暴雨灾害调查报告》（应急管理部，2022-01-21）  
  https://www.mem.gov.cn/gk/sgcc/tbzdsgdcbg/202201/P020220121639049697767.pdf

## Beijing 23·7 reconstruction

Dataset id: `beijing-23-7`. The slice is centred on 2023-07-31.

Official facts, from two different stations and two different metrics:

- 744.8 mm was the maximum 83-hour event total, at Wangjiayuan Reservoir. It is process metadata. It is not an hourly intensity, and it does not appear in the 25-point series.
- 111.8 mm/h was the maximum hourly intensity, at Qianlingshan, from 10:00 to 11:00. RainScope places this anchor at 10:00.

The remaining hourly values, and the 402.8 mm total of this 24-hour slice, are reconstructed.

Sources:

- 北京市人民政府，2023-08-03  
  https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202308/t20230803_3213311.html
- 中国气象局，2023-07-31  
  https://www.cma.gov.cn/ztbd/2023zt/20230728/2014072109/202307/t20230731_5685657.html

## Live cities

Searching a city reads the Open-Meteo Geocoding API and Forecast API at runtime. Past hours in the local day are observations published through that API, and later hours are forecast. RainScope does not vendor those series. A failed or offline lookup keeps the previous built-in or custom dataset; if a live city was already showing, it returns to the last built-in dataset.

- https://open-meteo.com/
- https://geocoding-api.open-meteo.com/v1/search
- https://api.open-meteo.com/v1/forecast

Open-Meteo is the only runtime external data provider. Use of those APIs follows Open-Meteo's own terms.
