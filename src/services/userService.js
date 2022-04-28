import axios from "../axios";

//------------------------------------------------------------------

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post("/api/login", {
        email: userEmail,
        password: userPassword,
    });
};

//------------------------------------------------------------------

const getAllUsers = (inputId) => {
    // template string
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

const getAllStudentManager = (inputId) => {
    // template string
    return axios.get(`/api/get-all-studentmanager?id=${inputId}`);
};

const getAllLecturer = (inputId) => {
    // template string
    return axios.get(`/api/get-all-lecturer?id=${inputId}`);
};

const getAllLecturerById = (inputId) => {
    // template string
    return axios.get(`/api/get-all-lecturer-by-id?id=${inputId}`);
};

const getAllStudent = (inputId) => {
    // template string
    return axios.get(`/api/get-all-student?id=${inputId}`);
};

const getAllStudentById = (inputId) => {
    // template string
    return axios.get(`/api/get-all-student-by-id?id=${inputId}`);
};

const getAllEmployee = (inputId) => {
    // template string
    return axios.get(`/api/get-all-employee?id=${inputId}`);
};

const getAllAdmin = (inputId) => {
    // template string
    return axios.get(`/api/get-all-admin?id=${inputId}`);
};

const getAllAllCode = (inputType) => {
    // template string
    return axios.get(`/api/get-all-allcode?type=${inputType}`);
};

const getAllSubject = (inputId) => {
    // template string
    return axios.get(`/api/get-all-subject?type=${inputId}`);
};

const getAllClass = (inputId) => {
    // template string
    return axios.get(`/api/get-all-class?type=${inputId}`);
};

const getAllInternshipLocation = (inputId) => {
    // template string
    return axios.get(`/api/get-all-intership-location?id=${inputId}`);
};

const getDetailInternshipLocation = (inputId) => {
    return axios.get(`/api/get-all-intership-location?id=${inputId}`);
};

const getAllRegistrationForm = (inputId) => {
    return axios.get(`/api/get-all-registration-form?id=${inputId}`);
};

const getAllRegistrationFormByStudent = (inputId) => {
    return axios.get(
        `/api/get-all-registration-form-by-student?sid=${inputId}`
    );
};

const getAllAssignmentSheet = (inputId) => {
    return axios.get(`/api/get-all-assignment-sheet?id=${inputId}`);
};

const getAllDetailAssignmentSheet = (inputId, inputWeek) => {
    return axios.get(
        `/api/get-all-detail-assignment-sheet?id=${inputId}&week=${inputWeek}`
    );
};

const getAllDetailAssignmentSheetById = (inputId) => {
    return axios.get(
        `/api/get-all-detail-assignment-sheet-by-id?id=${inputId}`
    );
};

const getAllRegistrationFormByEmployee = (inputId) => {
    return axios.get(
        `/api/get-all-registration-form-by-employee?id=${inputId}`
    );
};

const getAllRegistrationFormByLecturer = (inputId) => {
    return axios.get(
        `/api/get-all-registration-form-by-lecturer?id=${inputId}`
    );
};

const getAllRatingSheet = (inputId) => {
    return axios.get(`/api/get-all-rating-sheet?id=${inputId}`);
};

const getAllScoreSheet = (inputId) => {
    return axios.get(`/api/get-all-score-sheet?id=${inputId}`);
};

//------------------------------------------------------------------

const createNewUserService = (data) => {
    console.log("check data from service: ", data);
    return axios.post("/api/create-new-user", data);
};

const createNewEduStaffService = (data) => {
    console.log("check data from service: ", data);
    return axios.post("/api/create-new-edu-staff", data);
};

const createNewLecturerService = (data) => {
    console.log("check data from service: ", data);
    return axios.post("/api/create-new-lecturer", data);
};

const createNewStudentService = (data) => {
    console.log("check data from service: ", data);
    return axios.post("/api/create-new-student", data);
};

const createNewEmployeeService = (data) => {
    console.log("check data from service: ", data);
    return axios.post("/api/create-new-employee", data);
};

const createNewAdminService = (data) => {
    console.log("check data from service: ", data);
    return axios.post("/api/create-new-admin", data);
};

const createNewInternshipLocationService = (data) => {
    console.log("check data from service: ", data);
    return axios.post("/api/create-new-internship-location", data);
};

const createNewRegistrationFormService = (data) => {
    console.log("check data from service: ", data);
    return axios.post("/api/create-new-registration-form", data);
};

const createNewLecturerAssignmentService = (data) => {
    console.log("check data from service: ", data);
    return axios.post("/api/create-new-lecturer-assignment", data);
};

const createNewRatingSheetService = (data) => {
    console.log("check data from service: ", data);
    return axios.post("/api/create-new-rating-sheet", data);
};

const createNewScoreSheetService = (data) => {
    console.log("check data from service: ", data);
    return axios.post("/api/create-new-score-sheet", data);
};

//------------------------------------------------------------------

const deleteUserService = (userId) => {
    // return axios.delete("/api/delete-user", { id: userId });
    return axios.delete("/api/delete-user", {
        data: {
            sid: userId,
        },
    });
};

const deleteInternshipLocationService = (inputId) => {
    // none
    // return axios.delete("/api/delete-user", { id: userId });
    return axios.delete("/api/delete-internship-location", {
        data: {
            macoquan: inputId,
        },
    });
};

const deleteRegistrationFormService = (inputId) => {
    // none
    // return axios.delete("/api/delete-user", { id: userId });
    return axios.delete("/api/delete-registration-form", {
        data: {
            id: inputId,
        },
    });
};

//------------------------------------------------------------------

const editUserService = (inputData) => {
    return axios.put("/api/edit-user", inputData);
};

const editStudentmanagerService = (inputData) => {
    return axios.put("/api/edit-studentmanager", inputData);
};

const editLecturerService = (inputData) => {
    return axios.put("/api/edit-lecturer", inputData);
};

const editStudentService = (inputData) => {
    return axios.put("/api/edit-student", inputData);
};

const editEmployeeService = (inputData) => {
    return axios.put("/api/edit-employee", inputData);
};

const editAdminService = (inputData) => {
    return axios.put("/api/edit-admin", inputData);
};

const editInternshipLocationService = (inputData) => {
    // none
    return axios.put("/api/edit-internship-location", inputData);
};

const editRegistrationFormService = (inputData) => {
    // none
    return axios.put("/api/edit-registration-form", inputData);
};

const editAssignmentSheetService = (inputData) => {
    // none
    return axios.put("/api/edit-assignment-sheet", inputData);
};

//------------------------------------------------------------------

// const downloadFileZip = (data) => {
//     // none
//     return axios.put("/api/download", data);
// };

//------------------------------------------------------------------

export {
    handleLoginApi,
    getAllUsers,
    getAllStudentManager,
    getAllLecturer,
    getAllLecturerById,
    getAllStudent,
    getAllEmployee,
    getAllAdmin,
    createNewUserService,
    createNewLecturerService,
    createNewEduStaffService,
    createNewStudentService,
    createNewEmployeeService,
    createNewAdminService,
    deleteUserService,
    editUserService,
    editStudentmanagerService,
    editLecturerService,
    editStudentService,
    editEmployeeService,
    editAdminService,
    getAllAllCode,
    getAllSubject,
    getAllClass,
    createNewInternshipLocationService, // ok
    getAllInternshipLocation, // ok
    deleteInternshipLocationService, // ok
    editInternshipLocationService, // ok
    getDetailInternshipLocation, // ok
    createNewRegistrationFormService, //ok
    getAllRegistrationForm, // ok
    deleteRegistrationFormService, // ok
    getAllRegistrationFormByStudent, // ok
    getAllStudentById, // bi vai loi~ -> khong dung`!
    editRegistrationFormService, // ok
    createNewLecturerAssignmentService, // ok
    getAllAssignmentSheet, // ok
    getAllRegistrationFormByEmployee, // ok
    editAssignmentSheetService, // ok
    getAllDetailAssignmentSheet, // ok
    getAllDetailAssignmentSheetById, // ok
    createNewRatingSheetService, // ok
    getAllRatingSheet, // ok
    getAllRegistrationFormByLecturer, // ok
    createNewScoreSheetService, // ok
    getAllScoreSheet, // ok
    // downloadFileZip, // test
};
