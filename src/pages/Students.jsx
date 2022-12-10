import React, { useState, useEffect } from "react";
import DashboardWrapperRest, {
  DashboardWrapperMainRest,
  DashboardWrapperRight,
} from "../components/dashboard-wrapper-rest/DashboardWrapperRest";
import SummaryBox, {
  SummaryBoxSpecial,
} from "../components/summary-box-students/SummaryBoxStudents";
import { colors, data3 } from "../constants";
import axios from "axios";
import MaterialTable from "material-table";
import ReactiveButton from "reactive-button";

const http = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-type": "application/json",
  },
});

const studentColumns = [
  { title: "Student ID", field: "id", hidden: true },
  { title: "Project ID", field: "project_id", hidden: true },
  { title: "First Name", field: "first_name", filtering: false },
  { title: "Last Name", field: "last_name", filtering: false },
  { title: "Major", field: "major" },
];

const projectColumns = [
  { title: "Project ID", field: "id", hidden: true },
  { title: "Project Name", field: "title", filtering: false },
  { title: "Company", field: "company", filtering: false },
  { title: "Primary", field: "primary_major" },
  { title: "Secondary", field: "secondary_major" },
  { title: "Tertiary", field: "tertiary_majors" },
  {
    title: "COUNT(Primary)",
    field: "primary_count",
    lookup: {
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
    },
  },
  {
    title: "COUNT(Secondary)",
    field: "secondary_count",
    lookup: {
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
    },
  },

  {
    title: "TOTAL",
    field: "count",
    lookup: {
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
    },
  },
];

const projInitial = [
  {
    id: "02081040-8f70-4",
    company: "Beehive Home Buyer",
    title: "A Model for Residential Property Evaluation",
    primary_major: "DS",
    secondary_major: "CMPSC",
    tertiary_majors: "",
    confidentiality: 0,
    ip: 1,
    course_time: "T R 8:00 am-9:55 am",
    course_name: "DS 440.001",
    prototype: 0,
    count: 5,
    primary_count: 5,
    secondary_count: 0,
  },
];

const Students = () => {
  const [studentData, setStudentData] = useState();
  const [projectData, setProjectData] = useState(projInitial);
  const [selectedStudent, setSelectedStudent] = useState();
  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    const func = async () => {
      const projectList = await http.get("/api/projects");
      setProjectData(projectList.data);
    };
    func();
  }, []);

  useEffect(() => {
    const func = async () => {
      const studentList = await http.get("/api/students");
      setStudentData(
        studentList.data.filter((student) => student.project_id === null)
      );
    };
    func();
  }, []);

  const onStudentClick = (e, clickedStudent) => {
    setSelectedStudent(clickedStudent);
  };
  const onProjectClick = (e, clickedProject) => {
    setSelectedProject(clickedProject);
  };

  return (
    <div>
      <div>
        <MaterialTable
          title="Projects"
          data={projectData}
          columns={projectColumns}
          onRowClick={onProjectClick}
          options={{
            filtering: true,
            showSelectAllCheckbox: false,
            showTextRowsSelected: false,
            rowStyle: (row) =>
              row?.id === selectedProject?.id ? { background: "#90EE90" } : {},
          }}
        />
        {selectedProject && (
          <h4>Selected Employee Name : {selectedProject?.title}</h4>
        )}
        <MaterialTable
          title="Students Without Assignments"
          data={studentData}
          columns={studentColumns}
          options={{
            filtering: true,
            showSelectAllCheckbox: false,
            showTextRowsSelected: false,
            rowStyle: (row) =>
              row?.id === selectedStudent?.id ? { background: "#90ee90" } : {},
          }}
          onRowClick={onStudentClick}
        />
        <ReactiveButton
          rounded
          color="Primary"
          idleText="Swap Student"
          size="large"
          onClick={async () => {
            console.log("hello");
            const writeResult = await http.put("/api/switch/", {
              projectID: selectedProject.id,
              studentID: selectedStudent.id,
            });
            if (writeResult.status == 200) {
              alert("CSV Written");
            } else {
              alert("Failed to write CSV");
            }
          }}
        />
      </div>
    </div>
  );
};

export default Students;
