import { Form } from "react-router-dom";
import { HelpingFunctions } from "../utils/HelpingFunctions";
//npm install date-fns -> to convert date time format
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export const WorkoutDetails = ({ workout }) => {
  return (
    <div className="workout-details">
      <div className="layout-title">
        <h4>{workout.title}</h4>
      </div>
      <p>
        <strong>Load (kg) : </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps : </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined">
        <Form method="delete" action="/">
          <button
            className="material-symbols-outlined"
            type="submit"
            name="id"
            value={workout._id}
          >
            Delete
            {/* <img src="/delete.svg" alt="delete icon" /> */}
          </button>
        </Form>
      </span>
    </div>
  );
};
