import { useState } from "react";
import { createContext } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allReports, setAllReports] = useState([]);

  return (
    <InterviewContext.Provider
      value={{ report, setReport, loading, setLoading,allReports,setAllReports }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
