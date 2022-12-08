import React, { useEffect, useState } from "react";
import "./Stats.css";
import axios from "axios";
import MaterialTable from "material-table";

const http = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-type": "application/json",
  },
});

const Row = (props) => {
  const { name, temperature } = props;
  return (
    <tr>
      <td>{name}</td>
      <td>{temperature}</td>
    </tr>
  );
};

const Table = (props) => {
  const { data } = props;
  return (
    <table>
      <tbody>
        {data.map((row, key) => (
          <Row name={row.name} temperature={row.temperature} key={key} />
        ))}
      </tbody>
    </table>
  );
};

const projectColumns = [
  { title: "Project ID", field: "id", hidden: true },
  { title: "Project Name", field: "title", filtering: false },
  { title: "Company", field: "company", filtering: false },
  { title: "Count", field: "count" },
];

const studentColumns = [
  { title: "Student ID", field: "id", hidden: true },
  { title: "Project ID", field: "project", hidden: true },
  { title: "First Name", field: "first_name" },
  { title: "Last Name", field: "last_name" },
  { title: "Major", field: "major" },
];

const studentData = [
  {
    id: "AAF5294",
    first_name: "Alexandra",
    last_name: "Ferri",
    major: "BME",
    nda: 1,
    ip: 1,
    on_campus: 1,
  },
  {
    id: "AAH5469",
    first_name: "Agha",
    last_name: "Hyder",
    major: "CMPEN",
    nda: 1,
    ip: 1,
    on_campus: 1,
  },
];
const switchData = [];

const Stats = () => {
  const [rows, setRows] = useState();
  const [data, setData] = useState();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1);
  const [selectedProject, setSelectedProject] = useState();
  const [selectedStudent, setSelectedStudent] = useState();

  useEffect(() => {
    const func = async () => {
      const projectList = await http.get("/api/projects");
      setData(
        projectList.data.filter(
          (project) => project.count <= min || project.count >= max
        )
      );
    };

    func();
  }, [min, max]);

  const minHandler = (value) => {
    setMin(parseInt(value));
  };
  const maxHandler = (value) => {
    setMax(parseInt(value));
  };
  const onRowClick = (e, clickedRow) => {
    setSelectedProject(clickedRow);
  };

  return (
    <div>
      <p>
        <b>Select minimum and maximum team values (inclusive)</b>
      </p>
      <lable>
        Min Value
        <select onChange={({ target: { value } }) => minHandler(value)}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </lable>
      <lable>
        Max Value
        <select onChange={({ target: { value } }) => maxHandler(value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </lable>
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
              row?.id === selectedProject?.id ? { background: "#90EE90" } : {},
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
              // onRowClick={}
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
          </div>
        )}
        {/* <table>
          <thead>
            <tr>
              {Object.keys(data[0])
                .filter((key) => {
                  switch (key) {
                    case "title":
                    case "company":
                    case "course_name":
                    case "count":
                      return true;
                  }
                  return false;
                })
                .map((key) => {
                  return <th>{key}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {data.map((project) =>
              Object.keys(project).map((key) => {
                return (
                  <tr key={key}>
                    <td>{project[key]}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table> */}
        <p>Space</p>
        <p>""</p>

        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Company</th>
              <th>Course</th>
              <th>Count</th>
              <th>Preference</th>
            </tr>
          </thead>
          <tbody>
            {switchData.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.Project}</td>
                  <td>{val.Company}</td>
                  <td>{val.Course}</td>
                  <td>{val.Primary_Major}</td>
                  <td>{val.Primary_Major}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stats;
