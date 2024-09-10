import { useState } from "react";

const OperationsForm = () => {
  const [operation, setOperation] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!operation) {
      alert("Please select an operation before submitting.");
      return;
    }
    console.log("Selected operation:", operation);
    setOperation(""); 
  };

  const handleChange = (event) => {
    setOperation(event.target.value);
  };

  const startVoiceRecognition = () => {
    // Check if the browser supports Web Speech API
    if (!('webkitSpeechRecognition' in window)) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; 

    recognition.onstart = () => {
      console.log("Voice recognition started. Speak now.");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Voice command:", transcript);

      // Simple command parsing
      if (transcript.toLowerCase().includes("addition")) {
        setOperation("addition");
      } else if (transcript.toLowerCase().includes("subtraction")) {
        setOperation("subtraction");
      } else if (transcript.toLowerCase().includes("multiplication")) {
        setOperation("multiplication");
      } else if (transcript.toLowerCase().includes("division")) {
        setOperation("division");
      } else if (transcript.toLowerCase().includes("submit")) {
        handleFormSubmit({ preventDefault: () => {} }); // Submit the form programmatically
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognition.onend = () => {
      console.log("Voice recognition ended.");
    };

    recognition.start();
  };

  return (
    <div>
      <h3>Select Math Operation</h3>

      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <label htmlFor="operation">Choose a math operation:</label>
          <select
            id="operation"
            name="operation"
            value={operation}
            onChange={handleChange}
            className="form-select w-100"
          >
            <option value="">--Select an Operation--</option>
            <option value="addition">Addition</option>
            <option value="subtraction">Subtraction</option>
            <option value="multiplication">Multiplication</option>
            <option value="division">Division</option>
          </select>
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Submit
          </button>
        </div>
      </form>

      <button onClick={startVoiceRecognition} className="voice-command-button">
        Use Voice Commands
      </button>
    </div>
  );
};

export default OperationsForm;
