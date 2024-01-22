import { WorkoutDetails } from "../components/WorkoutDetails";
import { WorkoutForm } from "../components/WorkoutForm";
import { useAuthStore } from "../hooks/authStore";
import { useEffect, useState } from "react";

export default function Home() {
  const [workouts, setWorkouts] = useState(null);
  const [error, setError] = useState(null);
  const { getUser } = useAuthStore();
  const user = getUser();

  useEffect(() => {
    console.log("Inside useEffect...");
    const fetchWorkouts = async () => {
      console.log("Fetching all workouts...");
      const result = await fetch("/api/workouts", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            setError(json.error);
            return null;
          }
          return json;
        })
        .catch((err) => {
          throw Error("Some error occured: " + err);
        });
      setWorkouts(result);
      console.log("Workouts == " + workouts);
    };
    if (user) {
      fetchWorkouts();
    }
  }, []);

  return (
    <div className="home">
      <div className="home-workout-list">
        {error && <div className="error-page">{error}</div>}
        {workouts &&
          workouts.length > 0 &&
          workouts.map((workout) => {
            return (
              <div key={workout._id} className="workouts">
                <WorkoutDetails workout={workout} />
              </div>
            );
          })}
      </div>
      <div className="home-workout-form">
        <WorkoutForm />
      </div>
    </div>
  );
}
