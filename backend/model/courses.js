// export const courses = [
//   {
//     id: "react-foundations",
//     title: "React Foundations",
//     category: "Web Development",
//     level: "Beginner",
//     instructor: "Maya Singh",
//     lessonCount: 12,
//     priceInr: 0,
//   },
//   {
//     id: "node-api-design",
//     title: "Practical Node API Design",
//     category: "Backend Development",
//     level: "Intermediate",
//     instructor: "Arjun Mehta",
//     lessonCount: 18,
//     priceInr: 1499,
//   },
//   {
//     id: "digital-marketing-essentials",
//     title: "Digital Marketing Essentials",
//     category: "Marketing",
//     level: "Beginner",
//     instructor: "Nisha Rao",
//     lessonCount: 15,
//     priceInr: 999,
//   },
//   {
//     id: "advanced-css",
//     title: "Advanced CSS Techniques",
//     category: "Web Development",
//     level: "Advanced",
//     instructor: "Ravi Kumar",
//     lessonCount: 20,
//     priceInr: 1299,
//     description: "Master advanced CSS techniques including Flexbox, Grid, and animations.",
//   }
// ];
import mongoose from "mongoose";

const courseSchema =  new mongoose.Schema({
    title : {type: String, required: true},
    slug: {type: String , required: true},
    category: {type: String,  required: true },
    level: {type: String,  required: true},
    instructor: {type: String,  required: true},
    priceInr: {type: String,  required: true},
    description: {type: String,  required: true},
    rating: {type: String},
    status: {type: String}

})  
export const Course = mongoose.model("Course", courseSchema); // this is my course collection