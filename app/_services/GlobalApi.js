const { default: axios } = require("axios");

// Helper function to get current academic year
const getCurrentAcademicYear = () => {
    return new Date().getFullYear();
};

const GetAllYears = () => axios.get("/api/student-year-division");
const CreateStudent = (formData) => axios.post("/api/students", formData);
const DeleteStudent = (id) => axios.delete(`/api/students?id=${id}`);
const getAllStudents = () => axios.get("/api/students");
const getAttendanceList = (year, division, month, academicYear = null) => {
    const currentYear = academicYear || getCurrentAcademicYear();
    return axios.get("/api/attendance", {
        params: { year, division, month, academicYear: currentYear }
    });
};
const MarkAttendance = (data) => axios.post("/api/attendance", data);
const DeleteAttendance = (studentId, day, date) => {
    return axios.delete("/api/attendance", {
        params: { studentId, day, date }
    });
};
const TotalPresentCountByDay = (year, division, month, academicYear = null) => {
    const params = { year, division };
    
    // Only add month if it's provided
    if (month) {
        params.month = month;
    }
    
    // Use provided academicYear or default to current year
    const currentYear = academicYear || getCurrentAcademicYear();
    params.academicYear = currentYear;
    
    return axios.get("/api/dashboard", { params });
};

export default {
    GetAllYears,
    CreateStudent,
    getAllStudents,
    DeleteStudent,
    getAttendanceList,
    MarkAttendance,
    DeleteAttendance,
    TotalPresentCountByDay
}