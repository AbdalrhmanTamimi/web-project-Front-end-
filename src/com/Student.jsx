import { useState } from "react";
import "./styles/single-student.css";

function Student({ user, onDelete, onUpdate }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        const res = await fetch(
            `https://jsv-back-end.onrender.com/api/delete/${user._id}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

        if (res.ok) {
            onDelete(user._id);
        }
        setLoading(false);
    };

    const handleUpdate = async () => {
        const name = prompt("Student Name", user.name);
        const gpa = prompt("GPA", user.gpa);
        const studentId = prompt("Student ID", user.student_id);

        if (!name || !gpa || !studentId) return;

        setLoading(true);
        const res = await fetch(
            `https://jsv-back-end.onrender.com/api/update/${user._id}`,
            {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studentName: name,
                    studentGpa: Number(gpa),
                    studentID: studentId,
                }),
            }
        );

        if (res.ok) {
            onUpdate(user._id, {
                name,
                gpa: Number(gpa),
                student_id: studentId,
            });
        }
        setLoading(false);
    };

    return (
        <div className="single-student">
            <p>name : {user.name}</p>
            <p>gpa : {user.gpa}</p>
            <p>id : {user.student_id}</p>
            <p>order : {user.order}</p>

            <div className="student-actions">
                <button className="update-btn" onClick={handleUpdate} disabled={loading}>
                    update
                </button>
                <button className="delete-btn" onClick={handleDelete} disabled={loading}>
                    delete
                </button>
            </div>
        </div>
    );
}

export default Student;
