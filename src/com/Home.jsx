import { useMemo, useState, useEffect } from "react";
import "./styles/Home.css";

function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("courseName");
    const [sortDirection, setSortDirection] = useState("asc");
    const [coursesData, setCoursesData] = useState([]);

    useEffect(() => {
        fetch("https://webprojectback-end.onrender.com/api/read")
            .then((res) => res.json())
            .then((data) => {
                setCoursesData(data.Data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const categories = useMemo(() => {
        const unique = new Set(coursesData.map((c) => c.category));

        return [
            "All",
            ...Array.from(unique).sort((a, b) => a.localeCompare(b)),
        ];
    }, [coursesData]);

    const filteredCourses = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        const searched = coursesData.filter((c) => {
            if (!term) return true;

            return (
                c.courseName.toLowerCase().includes(term) ||
                c.ownerName.toLowerCase().includes(term)
            );
        });

        const byCategory = searched.filter((c) =>
            category === "All" ? true : c.category === category
        );

        const sorted = [...byCategory].sort((a, b) => {
            if (sortBy === "price") {
                return a.price - b.price;
            }

            return a.courseName.localeCompare(b.courseName);
        });

        if (sortDirection === "desc") {
            sorted.reverse();
        }

        return sorted;
    }, [
        coursesData,
        searchTerm,
        category,
        sortBy,
        sortDirection,
    ]);

    return (
        <>
            <div className="students">
                <h2>
                    Course Catalog ({filteredCourses.length} results)
                </h2>

                <div className="buttons-area">
                    <input
                        placeholder="Search by Course or Owner..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="courseName">
                            Sort by Course Name
                        </option>

                        <option value="price">
                            Sort by Price
                        </option>
                    </select>

                    <button
                        onClick={() =>
                            setSortDirection((d) =>
                                d === "asc" ? "desc" : "asc"
                            )
                        }
                    >
                        Direction:{" "}
                        {sortDirection === "asc"
                            ? "⬆️ ASC"
                            : "⬇️ DESC"}
                    </button>
                </div>

                <div className="book-list">
                    {filteredCourses.map((course) => (
                        <div
                            key={course._id}
                            className="book-card"
                        >
                            <h3>{course.courseName}</h3>

                            <p>
                                By: {course.ownerName}
                            </p>

                            <div>
                                <div>
                                    Category:{" "}
                                    <strong>
                                        {course.category}
                                    </strong>
                                </div>

                                <div>
                                    Price:{" "}
                                    <strong>
                                        ${course.price.toFixed(2)}
                                    </strong>
                                </div>
                            </div>

                            <p>
                                Status:{" "}
                                <strong>
                                    {course.status
                                        ? "Available"
                                        : "Not Available"}
                                </strong>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
