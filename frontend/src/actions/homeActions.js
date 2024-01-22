import { useLocation } from "react-router-dom";
import { API } from "../api/api";

export const homeActions =
  (user) =>
  async ({ request }) => {
    console.log("Action workout");
    switch (request.method) {
      case "POST":
        if (!user) {
          throw Error("Oops...please login again :)");
        }
        const data = await request.formData();
        const workout = {
          title: data.get("title"),
          reps: data.get("reps"),
          load: data.get("load"),
        };

        const reps = parseInt(workout.reps, 10);
        const load = parseInt(workout.load, 10);
        console.log("Reps +1 = " + (reps + 1));
        console.log(typeof workout.reps);
        console.log(typeof reps);

        if (workout.title.length < 5) {
          return { error: "Workout title must be atleast 5 characters" };
        } else if ((reps > 1000) || (reps < 1)) {
          return { error: "Reps must be between 1 to 1000" };
        } else if ((load > 1000) || (load < 0)) {
          return { error: "Load must be between 0kg to 1000kg" };
        }

        const response = await API.createWorkout({
          workout,
          token: user.token,
        });

        if (response) {
          if (response.error) throw Error(response.error);
        }

        console.log("Form data added!");
        return { success: "true" };

      case "DELETE":
        const deleteData = await request.formData();
        const id = deleteData.get("id");
        console.log("Delete action triggered ID = " + id);

        const responseDelete = await API.deleteWorkout({
          workout_id: id,
          token: user.token,
        });

        if (responseDelete) {
          if (responseDelete.error) throw Error(responseDelete.error);
        }

        console.log("Workout data deleted");
        return { success: true };
    }
  };
