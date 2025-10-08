const stream = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "description": "Streamgraph with inverted brown palette",
  background: "transparent",
  "width": 700,
  "height": 400,
  "title": {
    "text": "Trend in each IMO Problem Performance (1981 to 2024)",
    "fontSize": 20,
    "fontWeight": "bold",
    "anchor": "middle",
    "offset": 20
  },
  "data": {
    "url": "https://raw.githubusercontent.com/NguKhangWei/FIT3179_DV2/main/data/stream_data_normalized_longer.csv",
    "format": {"type": "csv"}
  },
  "mark": {
    "type": "area",
    "interpolate": "monotone"
  },
  "encoding": {
    "x": {
      "field": "year",
      "type": "ordinal",
      "axis": {"title": "Year"}
    },
    "y": {
      "field": "value",
      "type": "quantitative",
      "stack": "center",
      "axis": null
    },
    "color": {
      "field": "category",
      "type": "nominal",
      "scale": {
        "range": [
  "#1b728a",  
  "#4fa37a",  
  "#9fc96b", 
  "#3d497d",  
  "#512b73",  
  "#e4c84d"   
        ]
      },
      "legend": {"title": "Category"}
    },
    "config": {
    "view": {"stroke": "transparent"}  // <--- removes the outer grid/frame
  }
  }
}

;

vegaEmbed("#stream", stream, { mode: "vega" })
.then(console.log)
.catch(console.warn);
