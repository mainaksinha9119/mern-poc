import api from "./simple";

const getCourses = () => api.get("/courses");
const getCourseById = () => api.get(`/courses/${id}`);
const createCourse = (data) => api.post(`/courses/create-course`,data)

export {getCourses, getCourseById,createCourse};