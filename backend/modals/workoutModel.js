const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//make sure you use a singular name  = "Workout" and not "Workouts" as
//mongoose will automatically create a collection for use in plural i,e "Workouts"
module.exports = mongoose.model('Workout', workoutSchema);
