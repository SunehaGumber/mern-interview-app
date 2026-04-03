import {
  generateReport,
  showAllReports,
  getInterviewReportById,
  generateResumePdf
} from "../services/interview.api";
import { useContext,useEffect } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be inside InterviewProvider");
  }

  const { report, setReport, loading, setLoading, allReports, setAllReports } =
    context;

  const handleGenerateReport = async ({
    resumeFile,
    jobDescription,
    selfDescription,
  }) => {
      console.log("inside hook");
      setLoading(true);
      let response;
    try {
        response = await generateReport({
        resumeFile,
        jobDescription,
        selfDescription,
      });
        setReport(response?.interviewReport);
        await handleGetAllReports();
        return response?.interviewReport;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      }
      
  };

    const handleGetInterviewReportById = async (interviewId) => {
        setLoading(true);
        let response;
    try {
      response = await getInterviewReportById(interviewId);
        setReport(response.report);
        return response.report;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
        }
       
    };
    
    const handleGetAllReports = async () => {
        setLoading(true);
        try {
            const response = await showAllReports();
            setAllReports(response.allReports);
            return response.allReports;
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
       
  }
  
  const handleGenerateResumePdf =async ({interviewReportId}) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateResumePdf({ interviewReportId })
      const url = window.URL.createObjectURL(new Blob([response], {
        type:"application/pdf"
      }))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);

      document.body.appendChild(link)
      link.click()
    }
    catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }
    useEffect(() => {
        handleGetAllReports();

    },[])

    return { report, loading, allReports, handleGenerateReport, handleGetInterviewReportById, handleGetAllReports ,handleGenerateResumePdf};
};
