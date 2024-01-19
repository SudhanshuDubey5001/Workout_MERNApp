const express = require("express");
const { workout_add, workout_getAll, workout_get, workout_delete, workout_update } = require("../controller/workoutController");

const router = express.Router();

// GET all workouts
router.get("/", workout_getAll);

//GET a single workout
router.get("/:id", workout_get);

//POST a workout
router.post("/", workout_add);

//delete a workout
router.delete("/:id", workout_delete);

// PATCH a workout
router.patch("/:id", workout_update);

module.exports = router;
