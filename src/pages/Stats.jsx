import React, { useState } from 'react'
import './Stats.css';

const cities = [
    {name: "Onclick", temperature: "50F"},
    {name: "Onclick", temperature: "50F"}

]

const Row = (props) => {
    const {name, temperature} = props 
    return (<tr>
        <td>{name}</td>
        <td>{temperature}</td>
    </tr>)
}

const Table = (props) => {
    const {data} = props 
    return (<table>
        <tbody>
            {data.map(row => 
                <Row name = {row.name}
                temperature = {row.temperature}/>
            )}
        </tbody>
    </table>)
}

const data = [
    { Project: "LF3", Company: 19, Course: "Feale", Primary_Major: "CS", Secondary_Major: "CS", Tertiary_Major: "CS", Count: 10, Select: "btn"},
    { Project: "LF3", Company: 19, Course: "Feale", Primary_Major: "CS", Secondary_Major: "CS", Tertiary_Major: "CS", Count: 10, Select: "btn"},
    { Project: "LF3", Company: 19, Course: "Feale", Primary_Major: "CS", Secondary_Major: "CS", Tertiary_Major: "CS", Count: 10, Select: "btn"},
    { Project: "LF3", Company: 19, Course: "Feale", Primary_Major: "CS", Secondary_Major: "CS", Tertiary_Major: "CS", Count: 10, Select: "btn"},
    { Project: "LF3", Company: 19, Course: "Feale", Primary_Major: "CS", Secondary_Major: "CS", Tertiary_Major: "CS", Count: 10, Select: "btn"},

    
  ]

const Blank = () => {
    const [rows, setRows] = useState(cities)

    return (

        <div>
                    <div className = "Stat">
            <Table data = {rows}/>
        </div> 
            <div>
                <table>
                    <tr>
                        <th>Project</th>
                        <th>Company</th>
                        <th>Course</th>
                        <th>Primary_Major</th>
                        <th>Secondary_Major</th>
                        <th>Tertiary_Major</th>
                        <th>Count</th>
                        <th>Select</th>
                    </tr>
                    {data.map((val, key) => {
                    return (
                        <tr key={key}>
                        <td>{val.Project}</td>
                        <td>{val.Company}</td>
                        <td>{val.Course}</td>
                        <td>{val.Primary_Major}</td>
                        <td>{val.Secondary_Major}</td>
                        <td>{val.Tertiary_Major}</td>
                        <td>{val.Count}</td>
                        <td>{val.Select}</td>
                        </tr>
                    )
                    })}
                </table>
                <p>Space</p>
                <table>
                    <tr>
                        <th>Student Name</th>
                        <th>Major</th>
                        <th>Ip/config</th>
                        <th>Preference</th>
                    </tr>
                    {data.map((val, key) => {
                    return (
                        <tr key={key}>
                        <td>{val.Project}</td>
                        <td>{val.Company}</td>
                        <td>{val.Course}</td>

                        </tr>
                    )
                    })}
                </table>
                <p>""</p>

                <table>
                    <tr>
                        <th>Project</th>
                        <th>Company</th>
                        <th>Course</th>
                        <th>Count</th>
                        <th>Preference</th>


                    </tr>
                    {data.map((val, key) => {
                    return (
                        <tr key={key}>
                        <td>{val.Project}</td>
                        <td>{val.Company}</td>
                        <td>{val.Course}</td>
                        <td>{val.Primary_Major}</td>
                        <td>{val.Primary_Major}</td>

                        </tr>
                    )
                    })}
                </table>
                
            </div>
        </div>
    )

}

export default Blank


