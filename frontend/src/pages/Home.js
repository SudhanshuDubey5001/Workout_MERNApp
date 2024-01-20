import { WorkoutDetails } from "../components/WorkoutDetails";
import { useLoaderData } from "react-router-dom";
import { WorkoutForm } from "../components/WorkoutForm";

export default function Home() {
  //get the data from loader
  const workouts = useLoaderData();

  return (
    <div className="home">
      <div className="home-workout-list">
        {workouts &&
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

export const homeLoader = async () => {
  console.log("Fetching all workouts...");
  return await fetch("/api/workouts")
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      throw Error("Some error occured: " + err);
    });
};
