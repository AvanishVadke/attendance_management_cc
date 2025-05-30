const { default: axios } = require("axios");

const GetAllYears = () => axios.get("/api/student-year-division");
const CreateStudent = (formData) => axios.post("/api/students", formData);

export default {
    GetAllYears,
    CreateStudent
}