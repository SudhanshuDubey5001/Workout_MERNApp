export const homeActions = async ({ request }) => {
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
