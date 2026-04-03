import React, { useState ,useRef,} from "react";
import "/src/features/ai/style/home.scss";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/useInterview";
import Spinner from "../components/Spinner";

const Home = () => {
  const { loading, handleGenerateReport,allReports} = useInterview();
  const navigate = useNavigate();

  const [jobDescription, setjobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();

  const reportHandler = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    
    const data = await handleGenerateReport({ resumeFile, jobDescription, selfDescription });
    console.log(data);
    navigate(`/interview/${data._id}`)
  }
  if (loading) {
    return <Spinner />
  }
  return (
    <main className="home">
      <div className="home-section">
        <h1 className="heading head">Automated Resume & Interview Evaluation System</h1>
      <section className="home-card">
        <div className="pane left-pane">
          <div className="pane-header">
            <h2>Target Job Description</h2>
            <span>Paste the full job description here</span>
          </div>
          <textarea
            className="job-description"
            name="jobDescription"
            id="jobDescription"
            placeholder="e.g., Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."
            value={jobDescription}
            onChange={(e)=>setjobDescription(e.target.value)}
          />
          <div className="char-count">0 / 5000 chars</div>
        </div>

        <div className="pane right-pane">
          <div className="pane-header">
            <h2>Your Profile</h2>
            <span>Upload resume or self description for best results</span>
          </div>

          <label htmlFor="resume" className="upload-box">
            <div className="upload-label">
              <div className="upload-icon">📄</div>
              <div>
                <p>Click to upload or drag &amp; drop</p>
                <small>PDF (Max 3MB)</small>
              </div>
            </div>
          </label>
          <input ref={resumeInputRef} hidden type="file" name="resume" id="resume" accept=".pdf" />

          <div className="input-group">
            <label htmlFor="selfDescription">Quick Self-Description</label>
            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Briefly describe your experience, key skills, and years of experience."
              value={selfDescription}
              onChange={(e)=>setSelfDescription(e.target.value)}
            />
          </div>

          <p className="hint">
            Use Resume and Self Description both to generate a personalized plan.
          </p>

          <button className="primary-button generate-btn" onClick={() =>
            reportHandler()
          }>
            Generate My Interview Strategy
          </button>
        </div>
        </section>
        
        <div className="component-reports">
           <h2>My recent reports</h2>
          {allReports?.length > 0 && (
            
            <div className="recent-reports">
             
              {allReports.map((e) => {
                
                return <div key={e._id} onClick={()=>navigate(`/interview/${e._id}`)} className="report"
                >
               <h3 className="heading">{e.title}</h3>
               <p>Match Score: {e.matchScore}</p>
              <p>Created on {new Date(e.createdAt).toLocaleDateString()}</p>
                  <p></p>
                </div>
               })}
            </div>
            )}
      </div>
      </div>

    </main>
  );
};

export default Home;