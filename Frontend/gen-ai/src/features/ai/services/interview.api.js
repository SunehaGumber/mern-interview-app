import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials:true
})

export async function generateReport({ resumeFile, selfDescription, jobDescription }) {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume",resumeFile)
    try {
        console.log("inside api");
        console.log("calling api");
        const response = await api.post('/api/interview', formData,{
            headers: {
               "Content-Type":"multipart/form-data"
            }
        })
        console.log("api called",response);

        return response.data
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getInterviewReportById(interviewId) {
    try {
        const response = await api.get(`/api/interview/report/${interviewId}`);
        return  response.data;  
    } catch (err) {
        console.log(err); 
    }
}

export async function showAllReports() {
    const response = await api.get('/api/interview');
    return response.data;
}
export const generateResumePdf=async ({interviewReportId}) => {
    const response = await api.get(`/api/interview/pdf/${interviewReportId}`, null, {
        responseType:"blob"
    })
    
    return response.data
}