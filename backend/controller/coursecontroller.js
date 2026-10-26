import { Course } from "../model/courses.js";

const getCourses = async (req, res) => {
  try {
    const courseList = await  Course.find()

    return res.status(200).json(courseList);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
     const courseList = await  Course.findById(id)
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createCourse = async (req, res) => {
  try {
        console.log(req.body)
        const {title, slug, category, level, instructor,priceInr,description, rating, status  } = req.body;

    const course = await Course.create({title, slug, category, level, instructor, priceInr,description, rating, status });
    return res.status(200).json({
      message:"Course created successfullly",
      course: course
    })
  } catch(error) {
    return res.status(500).json({message: error.message})
  }
}

export { getCourses,getCourseById,createCourse };