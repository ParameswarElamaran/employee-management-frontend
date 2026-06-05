import { useEffect, useState } from "react";

function EmployeeList() {
const [employees, setEmployees] = useState([]);
const [newEmployee, setNewEmployee] = useState("");
const [newRole, setNewRole] = useState("");
const [editIndex, setEditIndex] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
useEffect(() => {
  const fetchEmployees = async (retries = 3) => {
    try {
      const response = await fetch(
        "https://employee-management-backend-oh7j.onrender.com/api/employees"
      );

      if (!response.ok) {
        throw new Error("Failed");
      }

      const data = await response.json();
      setEmployees(data);
      setError("");
      setLoading(false);
    } catch (err) {
      console.error(err);

      if (retries > 0) {
        setTimeout(() => fetchEmployees(retries - 1), 5000);
      } else {
        setError("Server is waking up. Please refresh in a few seconds.");
        setLoading(false);
      }
    }
  };

  fetchEmployees();
}, []);

const addEmployee = () => {
if (newEmployee.trim() === "") return;

if (editIndex !== null) {
  const employeeId = employees[editIndex].id;

  fetch(
    `https://employee-management-backend-oh7j.onrender.com/api/employees/${employeeId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newEmployee,
        role: newRole,
      }),
    }
  )
    .then((response) => response.json())
    .then((updatedEmployee) => {
     setEmployees((prevEmployees) =>
  prevEmployees.map((employee, index) =>
    index === editIndex ? updatedEmployee : employee
  )
);
      setEditIndex(null);
    });
} else {
  fetch(
    "https://employee-management-backend-oh7j.onrender.com/api/employees",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newEmployee,
        role: newRole,
      }),
    }
  )
    .then((response) => response.json())
    .then((savedEmployee) => {
      setEmployees((prevEmployees) => [
  ...prevEmployees,
  savedEmployee,
]);
    });
}

setNewEmployee("");
setNewRole("");

};

const deleteEmployee = (id) => {
  fetch(
    `https://employee-management-backend-oh7j.onrender.com/api/employees/${id}`,
    {
      method: "DELETE",
    }
  ).then(() => {
setEmployees((prevEmployees) =>
  prevEmployees.filter((employee) => employee.id !== id)
);
  });
};

const editEmployee = (index) => {
setNewEmployee(employees[index].name);
setNewRole(employees[index].role || "");
setEditIndex(index);
};
const likeEmployee = (id) => {
  fetch(
    `https://employee-management-backend-oh7j.onrender.com/api/employees/${id}/like`,
    {
      method: "PUT",
    }
  )
    .then((response) => response.json())
    .then((updatedEmployee) => {
    setEmployees((prevEmployees) =>
  prevEmployees.map((employee) =>
    employee.id === id ? updatedEmployee : employee
  )
);
    });
};


return (
<section style={{ padding: "40px", textAlign: "center" }}>
  <h2>Employees</h2>
  {loading && (
  <p style={{ color: "orange" }}>
    Loading employees...
  </p>
)}

{error && (
  <p style={{ color: "red" }}>
    {error}
  </p>
)}

  <input
    type="text"
    placeholder="Enter employee name"
    value={newEmployee}
    onChange={(e) => setNewEmployee(e.target.value)}
    style={{
      padding: "10px",
      marginRight: "10px",
      borderRadius: "5px",
    }}
  />

  <input
    type="text"
    placeholder="Enter role"
    value={newRole}
    onChange={(e) => setNewRole(e.target.value)}
    style={{
      padding: "10px",
      marginRight: "10px",
      borderRadius: "5px",
    }}
  />

  <button onClick={addEmployee}>
    {editIndex !== null ? "Update Employee" : "Add Employee"}
  </button>

  {employees.map((employee, index) => (
    <div
      key={employee.id}
      style={{
        backgroundColor: "#222",
        color: "white",
        margin: "10px auto",
        padding: "10px",
        width: "350px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <strong>{employee.name}</strong>
        <br />
        <small>{employee.role}</small>
        <br />
        ❤️ {employee.likes || 0}
        <br />

        <button
          onClick={() => likeEmployee(employee.id)}
          style={{
            marginTop: "5px",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Like
        </button>
      </div>

      <div>
        <button
          onClick={() => editEmployee(index)}
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "5px",
          }}
        >
          Edit
        </button>

        <button
          onClick={() => deleteEmployee(employee.id)}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</section>

);
}

export default EmployeeList;