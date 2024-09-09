import { fileUploadEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";

const { LOCAL_FILE_UPLOAD,FILE_UPLOAD_USING_DRIVE_LINK} = fileUploadEndpoints;

export function localfileUpload(formData, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            console.log("printing formData" , formData);
            const uploadFormData = new FormData();

            // Append each key-value pair from formData to the FormData instance
            for (const key in formData) {
                if (formData.hasOwnProperty(key)) {
                    uploadFormData.append(key, formData[key]);
                }
            }

            // Log the FormData contents
           // logFormData(uploadFormData);

            const response = await apiConnector("POST", LOCAL_FILE_UPLOAD, uploadFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });

            console.log("local file upload api response:", response);

            toast.success("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("File upload failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function fileUploadUsingDriveLink(formData, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            console.log("printing form Data" , formData);
            const response = await apiConnector("POST", FILE_UPLOAD_USING_DRIVE_LINK, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            console.log("local file upload api response:", response);

            toast.success("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("File upload failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}