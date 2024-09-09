import { useState } from "react";

const OperationsForm = () => {
  const [operation, setOperation] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Selected operation:", operation);
    // Reset the form state
    setOperation("");
  };

  const handleChange = (event) => {
    setOperation(event.target.value); 
  };

  return (
    <div>
      <h3>Select Math Operation</h3>

      <form
        className='flex-row justify-center justify-space-between-md align-center'
        onSubmit={handleFormSubmit}
      >
        <div className='col-12 col-lg-9'>
          <select
            name='operation'
            value={operation}
            onChange={handleChange}
            className='form-select w-100'
          >
            <option value=''>--Select an Operation--</option>
            <option value='addition'>Addition</option>
            <option value='subtraction'>Subtraction</option>
            <option value='multiplication'>Multiplication</option>
            <option value='division'>Division</option>
          </select>
        </div>

        <div className='col-12 col-lg-3'>
          <button className='btn btn-primary btn-block py-3' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default OperationsForm;