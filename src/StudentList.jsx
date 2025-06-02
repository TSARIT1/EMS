import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/students")
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map(s => (
          <li key={s.id}>{s.name} - {s.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
