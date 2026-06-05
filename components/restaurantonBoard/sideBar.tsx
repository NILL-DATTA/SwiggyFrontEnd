import React from "react";

const STEPS = [
  "Restaurant Information",
  "Restaurant Documents",
  "Menu Setup",
  "Partner Contract",
];

export default function SideBar({ step }: { step: number }) {
  return (
    <aside style={{
      width: 260,
      minHeight: "100vh",
      background: "#fff",
      borderRight: "1px solid #e8e8e8",
      padding: "40px 28px",
      flexShrink: 0,
    }}>

      {/* Logo */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "#FC8019", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#FC8019", letterSpacing: "-0.3px" }}>
            swiggy
          </span>
        </div>
        <p style={{ fontSize: 11, color: "#aaa", marginTop: 8, marginLeft: 2 }}>
          Partner Onboarding
        </p>
      </div>

      {/* Steps */}
      <div style={{ position: "relative" }}>

        {/* Vertical line */}
        <div style={{
          position: "absolute", left: 11, top: 12, bottom: 12,
          width: 2, background: "#e8e8e8", zIndex: 0,
        }} />

        {STEPS.map((item, index) => {
          const currentStep = index + 1;
          const isCompleted = step > currentStep;
          const isActive = step === currentStep;
          const isPending = step < currentStep;

          return (
            <div key={index} style={{
              display: "flex", alignItems: "flex-start",
              gap: 14, marginBottom: 28,
              position: "relative", zIndex: 1,
            }}>

              {/* Circle */}
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                flexShrink: 0, display: "flex",
                alignItems: "center", justifyContent: "center",
                background: isCompleted ? "#FC8019" : isActive ? "#22c55e" : "#fff",
                border: isPending ? "2px solid #d1d5db" : "none",
              }}>
                {isCompleted && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {isActive && (
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingTop: 2 }}>
                <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: "#aaa", marginBottom: 2 }}>
                  STEP {currentStep}
                </p>
                <p style={{
                  fontSize: 13, margin: 0,
                  fontWeight: isActive ? 700 : 500,
                  color: isPending ? "#bbb" : "#1a1a1a",
                }}>
                  {item}
                </p>
                {isCompleted && (
                  <p style={{ fontSize: 11, color: "#22c55e", marginTop: 1, fontWeight: 600 }}>
                    Completed
                  </p>
                )}
                {isActive && (
                  <p style={{ fontSize: 11, color: "#FC8019", marginTop: 1, fontWeight: 600 }}>
                    In Progress
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
