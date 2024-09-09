const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints = {
    LOGIN_API: BASE_URL+`/auth/login`,
    SIGNUP_API: BASE_URL + "/auth/signup",
}

export const fileUploadEndpoints={
    LOCAL_FILE_UPLOAD:BASE_URL+"/upload/localFileUpload",
    FILE_UPLOAD_USING_DRIVE_LINK:BASE_URL+"/upload/fileUploadUsingDriveLink",
    GET_SUBJECT_NAME_API: BASE_URL+"/upload/getSubjectName",
    GET_FILES_BY_DEPARTMENT_AND_SUBJECT_API:BASE_URL+"/upload/getFilesByDepartmentAndSubject",
    GET_USER_NOTES : BASE_URL+"/upload/getUserNotes",
    DELETE_NOTE : BASE_URL+"/upload/DeleteNote"
}
export const ProfileEndPoints ={
    GET_USER_DETAILS : BASE_URL+"/profile/getUserDetails",
}
export const feedbackFormEndPoints = {
    SEND_FEEDBACK : BASE_URL+"/contact/sendFeedback",
}

