import React, { useState, useEffect } from "react";
import { Counter } from "./components/Counter";

function App() {
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset === true) setReset(false);
  }, [reset]);

  const clearAllHandler = () => {
    setReset(true);
  };

  return (
    <div className="container">
      <button className="clear-btn" onClick={clearAllHandler}>
        Reset All
      </button>
      <Counter reset={reset} />
      {/* <Counter reset={reset} />
      <Counter reset={reset} /> */}
    </div>
  );
}

export default App;
