import React, { useState, useEffect, useRef } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

// ── Match Score Ring ──────────────────────────────────────────────────────────
const MatchScoreRing = ({ viewReport }) => {
  const score = viewReport?.matchScore;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 150);
    return () => clearTimeout(t);
  }, []);

  const offset = circumference - (animated / 100) * circumference;
  const label =
    score >= 80
      ? "Strong match for this role"
      : score >= 60
        ? "Good match for this role"
        : "Moderate match for this role";

  return (
    <div className="score-block">
      <p className="panel-heading">MATCH SCORE</p>
      <div className="ring-wrap">
        <svg viewBox="0 0 108 108" className="ring-svg">
          <circle
            cx="54"
            cy="54"
            r={radius}
            className="ring-track"
            strokeWidth="7"
            fill="none"
          />
          <circle
            cx="54"
            cy="54"
            r={radius}
            className="ring-fill"
            strokeWidth="7"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 54 54)"
          />
        </svg>
        <div className="ring-center">
          <span className="ring-num">{score}</span>
          <span className="ring-pct">%</span>
        </div>
      </div>
      <p className="score-label">{label}</p>
    </div>
  );
};

// ── Skill Gaps ────────────────────────────────────────────────────────────────
const SkillGaps = ({ viewReport }) => (
  <div className="gaps-block">
    <p className="panel-heading">SKILL GAPS</p>
    <div className="gaps-list">
      {viewReport.skillGaps.map((g, i) => (
        <span key={i} className={`gap-pill gap-pill--${g.severity}`}>
          {g.skill}
        </span>
      ))}
    </div>
  </div>
);

// ── Question Card ─────────────────────────────────────────────────────────────
const QuestionCard = ({ num, question, intention, answer, viewReport }) => {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open && bodyRef.current) setHeight(bodyRef.current.scrollHeight);
    else setHeight(0);
  }, [open]);

  return (
    <div className={`q-card ${open ? "q-card--open" : ""}`}>
      <button className="q-card__header" onClick={() => setOpen(!open)}>
        <span className="q-badge">Q{num}</span>
        <span className="q-text">{question}</span>
        <svg
          className={`q-chevron ${open ? "q-chevron--up" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className="q-card__body"
        ref={bodyRef}
        style={{ maxHeight: height + "px" }}
      >
        <div className="q-card__inner">
          <div className="q-section">
            <p className="q-section-label q-section-label--intention">
              🎯 Intention
            </p>
            <p className="q-section-text">{intention}</p>
          </div>
          <div className="q-section">
            <p className="q-section-label q-section-label--answer">
              ✅ Model Answer
            </p>
            <p className="q-section-text">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Road Map ──────────────────────────────────────────────────────────────────
const RoadMap = ({ viewReport }) => (
  <div className="roadmap">
    <div className="roadmap__track" />
    {viewReport.preparationPlan.map((item, i) => (
      <div
        className="roadmap__item"
        key={item.day}
        style={{ "--delay": `${i * 0.07}s` }}
      >
        <div className="roadmap__dot-col">
          <div className="roadmap__dot" />
        </div>
        <div className="roadmap__content">
          <div className="roadmap__header">
            <span className="roadmap__day-badge"> Day {item.day}</span>
            <span className="roadmap__focus">{item.focus}</span>
          </div>
          <ul className="roadmap__tasks">
            {item.tasks.map((task, j) => (
              <li key={j}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
);

// ── Sidebar Config ────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: "technical",
    label: "Technical",
    fullLabel: "Technical Questions",
    icon: (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="5 8 2 10 5 12" />
        <polyline points="15 8 18 10 15 12" />
        <line x1="10" y1="5" x2="10" y2="15" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral",
    fullLabel: "Behavioral Questions",
    icon: (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7l-4 3V5a1 1 0 0 1 1-1z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    fullLabel: "Road Map",
    icon: (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 17l4-10 4 5 3-4 3 9" />
        <circle cx="3" cy="17" r="1" fill="currentColor" />
        <circle cx="17" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "stats",
    label: "Stats",
    fullLabel: "Stats",
    mobileOnly: true, // only rendered in the mobile bottom tab bar
    icon: (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10" cy="10" r="7" />
        <polyline points="10 6 10 10 13 12" />
      </svg>
    ),
  },
];

// ── Root ──────────────────────────────────────────────────────────────────────
const Interview = () => {
  const [active, setActive] = useState("technical");
  const [statsOpen, setStatsOpen] = useState(false);
  const { report, handleGetInterviewReportById,loading, handleGenerateResumePdf } =
    useInterview();
  const [viewReport, setViewReport] = useState(null);
  const { interviewId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const showReport = async () => {
      const response = await handleGetInterviewReportById(interviewId);
      setViewReport(response);
    };
    showReport();
  }, [interviewId]);

  // Close stats sheet when switching to a non-stats section
  const handleNavClick = (id) => {
    if (id === "stats") {
      setStatsOpen((prev) => !prev);
    } else {
      setActive(id);
      setStatsOpen(false);
    }
  };

  if (!viewReport) {
    return <Spinner/>
  }
  
  if (loading) {
    return <Spinner/>
  }

  const meta = {
    technical: {
      title: "Technical Questions",
      badge: `${viewReport.technicalQuestions.length} questions`,
    },
    behavioral: {
      title: "Behavioral Questions",
      badge: `${viewReport.behavioralQuestions.length} questions`,
    },
    roadmap: {
      title: "Preparation Road Map",
      badge: `${viewReport.preparationPlan.length}-day plan`,
    },
  };

  return (
    <div className="iv-root">
      {/* 1 — SIDEBAR (desktop left / mobile bottom tab bar) */}
      <aside className="iv-sidebar">
        <div>
          <div className="iv-sidebar__top">
            <p className="iv-sidebar__heading">SECTIONS</p>
            <nav className="iv-sidebar__nav">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  className={`iv-nav-btn ${(s.id !== "stats" && active === s.id) || (s.id === "stats" && statsOpen) ? "iv-nav-btn--active" : ""} ${s.mobileOnly ? "iv-nav-btn--mobile-only" : ""}`}
                  onClick={() => handleNavClick(s.id)}
                >
                  <span className="iv-nav-btn__icon">{s.icon}</span>
                  <span className="iv-nav-btn__label iv-nav-btn__label--full">
                    {s.fullLabel}
                  </span>
                  <span className="iv-nav-btn__label iv-nav-btn__label--short">
                    {s.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <button
          onClick={() => {
            handleGenerateResumePdf({ interviewReportId: interviewId });
          }}
          className="button primary-button iv-download-btn"
        >
          Download AI Resume
        </button>
      </aside>

      {/* 2 — MAIN CONTENT */}
      <main className="iv-main">
        <div className="iv-main__head">
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="back-icon-wrapper">
              <div className="back-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </div>
            </div>
          </div>
          <h2 className="iv-main__title">{meta[active]?.title}</h2>
          <span className="iv-main__badge">{meta[active]?.badge}</span>
        </div>
        <div className="iv-main__body" key={active}>
          {active === "technical" && (
            <div className="question-list">
              {viewReport.technicalQuestions.map((q, i) => (
                <QuestionCard
                  key={i}
                  num={i + 1}
                  {...q}
                  viewReport={viewReport}
                />
              ))}
            </div>
          )}
          {active === "behavioral" && (
            <div className="question-list">
              {viewReport.behavioralQuestions.map((q, i) => (
                <QuestionCard
                  key={i}
                  num={i + 1}
                  {...q}
                  viewReport={viewReport}
                />
              ))}
            </div>
          )}
          {active === "roadmap" && <RoadMap viewReport={viewReport} />}
        </div>
      </main>

      {/* 3 — RIGHT PANEL (desktop) */}
      <aside className="iv-right">
        {viewReport && <MatchScoreRing viewReport={viewReport} />}
        <SkillGaps viewReport={viewReport} />
      </aside>

      {/* 4 — MOBILE STATS BOTTOM SHEET */}
      {statsOpen && (
        <div className="iv-stats-sheet" onClick={() => setStatsOpen(false)}>
          <div
            className="iv-stats-sheet__panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="iv-stats-sheet__handle" />
            {viewReport && <MatchScoreRing viewReport={viewReport} />}
            <SkillGaps viewReport={viewReport} />
            <button
              onClick={() => {
                handleGenerateResumePdf({ interviewReportId: interviewId });
              }}
              className="button primary-button"
            >
              Download AI Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
