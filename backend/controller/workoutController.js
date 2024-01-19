const { isValidObjectId } = require("mongoose");
const Workout = require("../modals/workoutModel");
const errorMessages = require("../utils/errorMessages");

//Getting all the workouts
const workout_getAll = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    console.log("Error: " + error);
    res.status(400).json({ error: error.message });
  }
};

// getting a single workout
const workout_get = async (req, res) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: errorMessages.ITEM_NOT_FOUND });
    }
    res.status(200).json(workout);
  } else {
    res.status(400).json({ error: "Not a valid Object ID" });
  }
};

//adding a workout
const workout_add = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    console.log("Error: " + error);
    res.status(400).json({ error: error.message });
  }
};

const workout_delete = async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(404).json({ error: errorMessages.OBJECT_ID_NOT_VALID });
  }
  try {
    const result = await Workout.deleteOne({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const workout_update = async (req, res) => {
  const update = req.body;
  const id = req.params.id;
  console.log("Update = "+update);
  console.log("Id = "+id);
  if (!isValidObjectId(id)) {
    return res.status(404).json({ error: errorMessages.OBJECT_ID_NOT_VALID });
  }
  try {
    const result = await Workout.update({ _id: id }, { ...update });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  workout_add,
  workout_getAll,
  workout_get,
  workout_delete,
  workout_update,
};
