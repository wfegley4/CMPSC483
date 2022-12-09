import React, { useEffect, useState } from "react";
import "./Stats.css";
import axios from "axios";
import MaterialTable from "material-table";
import ReactiveButton from "reactive-button";

const http = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-type": "application/json",
  },
});

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

const studentColumns = [
  { title: "Student ID", field: "id", hidden: true },
  { title: "Project ID", field: "project_id", hidden: true },
  { title: "First Name", field: "first_name" },
  { title: "Last Name", field: "last_name" },
  { title: "Major", field: "major" },
];

const studentList = [];
const switchColumns = [
  { title: "Project ID", field: "id", hidden: true },
  { title: "Project Name", field: "title", filtering: false },
  { title: "Company", field: "company", filtering: false },
  { title: "Time", field: "course_time", filtering: false },
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

const Teams = () => {
  const [data, setData] = useState();
  const [studentData, setStudentData] = useState(studentList);
  const [switchData, setSwitchData] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [selectedStudent, setSelectedStudent] = useState();
  const [selectedSwitch, setSelectedSwitch] = useState();

  useEffect(() => {
    const func = async () => {
      const projectList = await http.get("/api/projects");
      setData(projectList.data);
    };

    func();
  }, []);

  useEffect(() => {
    const func = async () => {
      const switchList = await http.get("/api/projects");
      setSwitchData(switchList.data);
    };

    func();
  }, [selectedStudent]);

  useEffect(() => {
    const func = async (selectedProject) => {
      const studentList = await http.get("/api/students");
      console.log(selectedProject);
      setStudentData(
        studentList.data.filter(
          (student) => student.project_id === selectedProject.id
        )
      );
    };

    func(selectedProject);
  }, [selectedProject]);
  const onRowClick = (e, clickedRow) => {
    setSelectedProject(clickedRow);
    console.log(selectedProject);
  };

  const onStudentClick = (e, clickedStudent) => {
    setSelectedStudent(clickedStudent);
  };

  const onSwitchClick = (e, clickedProject) => {
    setSelectedSwitch(clickedProject);
  };

  return (
    <div>
      <div>
        <MaterialTable
          title="Projects Table"
          data={data}
          columns={projectColumns}
          onRowClick={onRowClick}
          options={{
            filtering: true,
            showSelectAllCheckbox: true,
            showTextRowsSelected: true,
            rowStyle: (row) =>
              row?.id === selectedProject?.id ? { background: "#ADD8E6" } : {},
          }}
        />
        {selectedProject && (
          <div>
            <p> &ensp;</p>
            <h4>Project Selected: {selectedProject?.title}</h4>
            <h5>
              <b>Course:</b> {selectedProject?.course_name}
            </h5>
            <h5>Course Time: {selectedProject?.course_time}</h5>
            <h5>
              <b>Primary Major:</b>
              {selectedProject?.primary_major}
            </h5>
            <h5>
              <b>Secondary Major:</b> {selectedProject?.secondary_major}
            </h5>
            <h5>
              <b>Tertiary Majors:</b> {selectedProject?.tertiary_majors}
            </h5>
            <h5>
              NDA: {selectedProject?.confidentiality} IP:
              {selectedProject?.ip}
            </h5>
            <MaterialTable
              title="Students In Project"
              data={studentData}
              columns={studentColumns}
              onRowClick={onStudentClick}
              options={{
                filtering: true,
                showSelectAllCheckbox: true,
                showTextRowsSelected: true,
                rowStyle: (row) =>
                  row?.id === selectedStudent?.id
                    ? { background: "#90EE90" }
                    : {},
              }}
            />
            {selectedStudent && (
              <div>
                <p> &ensp;</p>
                <h4>
                  Student Selected: {selectedStudent?.first_name}{" "}
                  {selectedStudent?.last_name}
                </h4>
                <h5>
                  NDA: {selectedStudent?.nda} IP:{selectedStudent?.ip}
                </h5>
                <MaterialTable
                  title="Team to Swap"
                  data={switchData}
                  columns={switchColumns}
                  onRowClick={onSwitchClick}
                  options={{
                    filtering: true,
                    showSelectAllCheckbox: true,
                    showTextRowsSelected: true,
                    rowStyle: (row) => {
                      return row?.id === selectedSwitch?.id
                        ? { background: "#90EE90" }
                        : {};
                    },
                  }}
                />
                {selectedSwitch && (
                  <ReactiveButton
                    rounded
                    color="Primary"
                    idleText="Swap Student"
                    size="large"
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
