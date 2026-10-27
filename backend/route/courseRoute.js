import express from "express";
import { getCourses,getCourseById,createCourse } from "../controller/courseController.js";
import { verifyToken } from "../controller/usercontroller,js";

const routes = express.Router();

routes.get("/",verifyToken,getCourses);
routes.get("/:id",verifyToken,getCourseById);
routes.post("/create-course",verifyToken, createCourse);


export default routes