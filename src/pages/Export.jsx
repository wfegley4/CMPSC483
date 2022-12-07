import React from "react";
import { useState } from "react";
import ReactiveButton from "reactive-button";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-type": "application/json",
  },
});

function handleClick() {
  alert("Changes have been exported to newStudentAssignments.csv");
}

function App() {
  const [state, setState] = useState("idle");

  const onClickHandler = () => {
    setState("loading");

    // send an HTTP request
    setTimeout(() => {
      setState("success");
    }, 2000);
  };
}

const Export = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <ReactiveButton
        rounded
        color="Primary"
        idleText="Export Files"
        size="large"
        onClick={async (button) => {
          const writeResult = await http.post("/api/write");
          if (writeResult.status == 200) {
            alert("CSV Written");
          } else {
            alert("Failed to write CSV");
          }
        }}
      />
    </div>
  );
};

export default Export;
