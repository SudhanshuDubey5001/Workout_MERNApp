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

export const workoutFormAction = async ({ request }) => {
  console.log("Action workout");
  switch (request.method) {
    case "POST":
      const data = await request.formData();
      const workout = {
        title: data.get("title"),
        reps: data.get("reps"),
        load: data.get("load"),
      };

      console.log("Title: " + workout.title);
      console.log("Reps: " + workout.reps);
      console.log("Load: " + workout.load);

      if (workout.title.length < 5) {
        return { error: "Workout title must be atleast 5 characters" };
      } else if (workout.reps > 1000) {
        return { error: "Reps must be below 1000" };
      } else if (workout.load > 1000) {
        return { error: "Load must be below 1000kg" };
      }

      const response = await fetch("/api/workouts", {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw Error("Unable to upload the workout data");
      }

      console.log("Form data added!");
      return { success: "true" };
    case "DELETE":
      const deleteData = await request.formData();
      const id = deleteData.get("id");
      console.log("Delete action triggered ID = " + id);
      const responseDelete = await fetch("/api/workouts/" + id, {
        method: "DELETE",
      });
      if (!responseDelete.ok) {
        throw Error("Unable to delete the document");
      }
      console.log("Workout data deleted");
      return { success: true };
  }
};
