import { useLoaderData } from "react-router-dom";
import { API } from "../api/api";
import { WorkoutDetails } from "../components/WorkoutDetails";
import { WorkoutForm } from "../components/WorkoutForm";
import { useState } from "react";
import { useAuthStore } from "../hooks/authStore";

export default function Home() {
  const [error, setError] = useState(null);
  const loaderData = useLoaderData();
  const { resetAll } = useAuthStore();

  console.log("-----Home page ----");
  let workouts = null;

  if (resetAll) {
    workouts = null;
  }

  if (loaderData) {
    if (loaderData.error) setError(loaderData.error);
    workouts = loaderData;
  }

  return (
    <div className="home">
      <div className="home-workout-list">
        {error && <div className="error-page">{error}</div>}
        {workouts &&
          workouts.length > 0? 
          (workouts.map((workout) => {
            return (
              <div key={workout._id} className="workouts">
                <WorkoutDetails workout={workout} />
              </div>
            );
          })): (<div className="error-page">No workout data added</div>)
        }  
      </div>
      <div className="home-workout-form">
        <WorkoutForm />
      </div>
    </div>
  );
}

export const homeLoader =
  (user) =>
  async ({ params }) => {
    if (user) {
      return await API.fetchAllWorkouts(user.token);
    }
  };
