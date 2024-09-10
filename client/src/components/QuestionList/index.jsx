import "./style.css";
import React, { useState } from "react";

function Question({ question, options }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    console.log(`Selected option: ${option}`);
  };

  return (
    <div className="question-container">
      <h3>{question}</h3>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${selectedOption === option ? "selected" : ""}`}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
