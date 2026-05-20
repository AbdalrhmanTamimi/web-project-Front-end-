import { useState } from "react";
import "./styles/Register.css";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(
                "https://webprojectback-end.onrender.com/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                alert("Register successful");
            } else {
                alert(
                    data.message ||
                        "Register failed"
                );
            }
        } catch (err) {
            console.log(err);
            alert("Server error");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(
                                    e.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Confirm Password:
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="register-btn"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
