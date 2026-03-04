import React, { useState } from "react";

function DomainSelect({ onDomainSelect }) {
  const [domain, setDomain] = useState("");

  const startInterview = () => {
    if (domain) {
      onDomainSelect(domain);   // send selected domain to App.js
    }
  };

  return (
    <div className="domain-select-container">
      <h2>Select Interview Domain</h2>

      <select
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="select-domain"
      >
        <option value="">-- Select Domain --</option>

        {/* ✅ Confirmed Domains */}
        <option value="fullstack">Full Stack Development</option>
        <option value="python">Python Programming</option>
        <option value="datascience">Data Science</option>
        <option value="ml">Machine Learning</option>
        <option value="digital">Digital Marketing</option>
        <option value="deeplearning">Deep Learning</option>
        <option value="corejava">Core Java</option>
        <option value="analytics">Data Analytics</option>
        <option value="cyber">Cyber Security</option>
        <option value="aiml">Artificial Intelligence (AI) / Machine Learning (ML)</option>
      </select>

      <br /><br />

      <button
        className="btn start-btn"
        disabled={!domain}
        onClick={startInterview}
      >
        Start Interview
      </button>
    </div>
  );
}

export default DomainSelect;