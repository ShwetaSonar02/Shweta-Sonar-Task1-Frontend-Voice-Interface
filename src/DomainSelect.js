import React, { useState } from "react";

function DomainSelect() {
  const [domain, setDomain] = useState("");

  const startInterview = () => {
    alert("Interview Started for " + domain);
  };

  return (
    <div>
      <h2>Select Interview Domain</h2>

      <select onChange={(e) => setDomain(e.target.value)}>
        <option value="">-- Select Domain --</option>
        <option value="Web Development">Web Development</option>
        <option value="AI / ML">AI / ML</option>
        <option value="Java">Java</option>
      </select>

      <br /><br />

      <button disabled={!domain} onClick={startInterview}>
        Start Interview
      </button>
    </div>
  );
}

export default DomainSelect;