import { WorkoutForm } from "../components/WorkoutForm";

export default function About() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="about-content">
        <p>
          Welcome to our app! My name is Sudhanshu Dubey, and I am the creator
          of this application. I'm passionate about web development and enjoy
          building innovative solutions using modern technologies.
        </p>
        <p>
          This app is developed using the MERN stack, which stands for MongoDB,
          Express.js, React, and Node.js. The MERN stack is a powerful and
          popular set of technologies for building full-stack web applications.
          MongoDB is used as the database, Express.js as the backend framework,
          React for the frontend, and Node.js as the runtime. Together, these
          technologies provide a robust and efficient development environment
          for creating scalable and dynamic web applications.
        </p>
      </div>
    </div>
  );
}
