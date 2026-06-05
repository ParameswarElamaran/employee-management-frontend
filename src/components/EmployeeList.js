import { useEffect, useState } from "react";

function EmployeeList() {
const [employees, setEmployees] = useState([]);
const [newEmployee, setNewEmployee] = useState("");
const [newRole, setNewRole] = useState("");
const [editIndex, setEditIndex] = useState(null);

useEffect(() => {
fetch("https://employee-management-backend-oh7j.onrender.com/api/employees")
.then((response) => response.json())
.then((data) => setEmployees(data));
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
      const updatedEmployees = [...employees];
      updatedEmployees[editIndex] = updatedEmployee;

      setEmployees(updatedEmployees);
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
      setEmployees([...employees, savedEmployee]);
    });
}

setNewEmployee("");
setNewRole("");

};

const deleteEmployee = (id) => {
fetch(
https://employee-management-backend-oh7j.onrender.com/api/employees/${id},
{
method: "DELETE",
}
).then(() => {
setEmployees(
employees.filter((employee) => employee.id !== id)
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
https://employee-management-backend-oh7j.onrender.com/api/employees/${id}/like,
{
method: "PUT",
}
)
.then((response) => response.json())
.then((updatedEmployee) => {
setEmployees(
employees.map((employee) =>
employee.id === id ? updatedEmployee : employee
)
);
});
};

return (
<section style={{ padding: "40px", textAlign: "center" }}>
Employees

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