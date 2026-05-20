import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/NavBar.css";

function NavBar() {
    const [isSigned, setIsSigned] = useState(false);

    const [showDialog, setShowDialog] =
        useState(false);

    const [courseName, setCourseName] =
        useState("");

    const [ownerName, setOwnerName] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [price, setPrice] = useState("");

    const [userID, setUserID] = useState("");

    useEffect(() => {
        fetch(
            "https://webprojectback-end.onrender.com/api/isSign",
            {
                credentials: "include",
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                if (data.isSign) {
                    setIsSigned(true);
                    setUserID(data.ID);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSignOut = async () => {
        try {
            const response = await fetch(
                "https://webprojectback-end.onrender.com/api/sign-out",
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                setIsSigned(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://webprojectback-end.onrender.com/api/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        courseName,
                        ownerName,
                        category,
                        price: Number(price),
                        status: true,
                        userID,
                    }),
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                alert("Course created");

                setShowDialog(false);

                setCourseName("");
                setOwnerName("");
                setCategory("");
                setPrice("");
            } else {
                alert("failed");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const navItems = [
        { name: "Main", to: "/" },
        { name: "About", to: "/about" },
    ];

    return (
        <>
            <div className="nav">
                <p className="JSV">
                    CourseShare
                </p>

                <ul className="list">
                    {navItems.map(
                        (item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.to}
                                    className="router_name"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        )
                    )}

                    {!isSigned ? (
                        <>
                            <li>
                                <Link
                                    to="/login"
                                    className="router_name"
                                >
                                    Login
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/register"
                                    className="router_name"
                                >
                                    Register
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <button
                                    className="router_name"
                                    onClick={() =>
                                        setShowDialog(
                                            true
                                        )
                                    }
                                >
                                    Add Item
                                </button>
                            </li>

                            <li>
                                <button
                                    className="router_name"
                                    onClick={
                                        handleSignOut
                                    }
                                >
                                    Sign Out
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {showDialog && (
                <dialog open>
                    <form
                        onSubmit={handleCreate}
                    >
                        <h2>
                            Create Course
                        </h2>

                        <input
                            type="text"
                            placeholder="Course Name"
                            value={courseName}
                            onChange={(e) =>
                                setCourseName(
                                    e.target.value
                                )
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Owner Name"
                            value={ownerName}
                            onChange={(e) =>
                                setOwnerName(
                                    e.target.value
                                )
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Category"
                            value={category}
                            onChange={(e) =>
                                setCategory(
                                    e.target.value
                                )
                            }
                            required
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) =>
                                setPrice(
                                    e.target.value
                                )
                            }
                            required
                        />

                        <button type="submit">
                            Create
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setShowDialog(
                                    false
                                )
                            }
                        >
                            Close
                        </button>
                    </form>
                </dialog>
            )}
        </>
    );
}

export default NavBar;
