export const API = {
  //getting all the workout data
  fetchAllWorkouts: async (token) => {
    console.log("Fetching all workouts...");
    return await fetch("/api/workouts", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          return { error: json.error };
        }
        return json;
      })
      .catch((err) => {
        throw Error("Some error occured: " + err);
      });
  },

  // adding a workout to DB
  createWorkout: async ({ workout, token }) => {
    console.log("Adding a workout!");
    return await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          return { error: json.error };
        }
        return json;
      })
      .catch((err) => {
        throw Error("Unable to add the workout data");
      });
  },

  // deleting a workout data
  deleteWorkout: async ({ workout_id, token }) => {
    return await fetch("/api/workouts/" + workout_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          return { error: json.error };
        }
        return json;
      })
      .catch((err) => {
        throw Error("Unable to delete the workout");
      });
  },
};
