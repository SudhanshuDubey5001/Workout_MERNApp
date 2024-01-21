import { useRef } from "react";
import { Form, useActionData } from "react-router-dom";

export const WorkoutForm = () => {
  // to get the error if there is one
  const data = useActionData();
  const formRef = useRef();

  if (data) {
    //to reset the data once user has successfully submitted
    if (!data.error) {
      formRef.current.reset();
    }
  }

  return (
    <div className="workout-add">
      <h2>Add a new workout</h2>
      <Form ref={formRef} method="POST" action="/">
        <label>
          <span>Workout title</span>
          <input name="title" required />
        </label>
        <label>
          <span>Reps</span>
          <input type="number" name="reps" required></input>
        </label>
        <label>
          <span>Load (kg)</span>
          <input type="number" name="load" required></input>
        </label>
        <button>Submit</button>
      </Form>
      {data && data.error && <div className="error">{data.error}</div>}
    </div>
  );
};


