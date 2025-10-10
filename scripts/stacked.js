const stacked = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Total IMO male and female participants per year from 2000 onwards",
  "background": "transparent",
  "title": "Proportion of Male and Female IMO Participants (2000 to 2024)",
  "width": 500,
  "height": "container",
  "data": {
    "url": "https://raw.githubusercontent.com/NguKhangWei/FIT3179_DV2/main/data/cleaned_country_imo.csv",
    "format": {"type": "csv"}
  },
  "transform": [
    {"filter": "datum.year >= 2000"},
    {
      "calculate": "datum.team_size_male == 'NA' ? 0 : parseInt(datum.team_size_male)", 
      "as": "male"
    },
    {
      "calculate": "datum.team_size_female == 'NA' ? 0 : parseInt(datum.team_size_female)", 
      "as": "female"
    },
    {"fold": ["male", "female"], "as": ["gender", "count"]},
    {
      "aggregate": [
        {"op": "sum", "field": "count", "as": "total"}
      ],
      "groupby": ["year", "gender"]
    }
  ],
  "mark": "bar",
  "encoding": {
    "x": {"field": "year", "type": "ordinal", "title": "Year"},
    "y": {"field": "total", "type": "quantitative", "title": "Number of Participants"},
    "color": {
      "field": "gender",
      "type": "nominal",
      "scale": {"domain": ["male", "female"], "range": ["#1f77b4", "#ff7f0e"]},
      "title": "Gender",
      "legend": {"orient": "left", "offset": -100}
    }
  },
  "config": {
        "title": { "fontSize": 16, "anchor": "middle", "fontWeight": "bold", },
    }
}
;

vegaEmbed("#stacked", stacked, { mode: "vega-lite" })
.then(console.log)
.catch(console.warn);
