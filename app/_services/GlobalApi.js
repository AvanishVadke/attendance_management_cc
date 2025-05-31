const { default: axios } = require("axios");

const GetAllYears = () => axios.get("/api/student-year-division");
const CreateStudent = (formData) => axios.post("/api/students", formData);
const DeleteStudent = (id) => axios.delete(`/api/students?id=${id}`);

const getAllStudents = () => axios.get("/api/students");

export default {
    GetAllYears,
    CreateStudent,
    getAllStudents,
    DeleteStudent
}