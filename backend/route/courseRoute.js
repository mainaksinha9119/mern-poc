import express from "express";
import { getCourses,getCourseById,createCourse } from "../controller/courseController.js";

const routes = express.Router();

routes.get("/",getCourses);
routes.get("/:id",getCourseById);
routes.post("/create-course",createCourse);


export default routes