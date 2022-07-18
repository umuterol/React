import React from "react";
import "./ChartBar.css";

function ChartBar(props) {
  const fillHeight =
    props.sum > 0 ? Math.round((props.value / props.sum) * 100) + "%" : "0%";

  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div className="chart-bar__fill" style={{ height: fillHeight }}></div>
      </div>
      <div className="chart-bar__label">{props.label}</div>
    </div>
  );
}

export default ChartBar;
