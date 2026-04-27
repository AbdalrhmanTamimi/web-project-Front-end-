import { useMemo, useState } from "react";
import coursesData from "../data/courses.json";
import "./styles/Home.css";

function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");

    const categories = useMemo(() => {
        const unique = new Set(coursesData.map((c) => c.category));
        return ["All", ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
    }, []);

    const filteredCourses = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        const searched = coursesData.filter((c) => {
            if (!term) return true;
            return (
                c.title.toLowerCase().includes(term) ||
                c.instructor.toLowerCase().includes(term)
            );
        });

        const byCategory = searched.filter((c) =>
            category === "All" ? true : c.category === category
        );

        const sorted = [...byCategory].sort((a, b) => {
            if (sortBy === "price") return a.price - b.price;
            return a.title.localeCompare(b.title);
        });

        if (sortDirection === "desc") sorted.reverse();
        return sorted;
    }, [searchTerm, category, sortBy, sortDirection]);

    return (
        <>
            <div className="students">
                <h2>Course Catalog ({filteredCourses.length} results)</h2>

                <div className="buttons-area">
                    <input
                        placeholder="Search by Title or Instructor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="title">Sort by Title</option>
                        <option value="price">Sort by Price</option>
                    </select>

                    <button
                        onClick={() =>
                            setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
                        }
                    >
                        Direction: {sortDirection === "asc" ? "⬆️ ASC" : "⬇️ DESC"}
                    </button>
                </div>

                <div className="book-list">
                    {filteredCourses.map((course) => (
                        <div key={course.id} className="book-card">
                            <h3>{course.title}</h3>
                            <p>By: {course.instructor}</p>
                            <div>
                                <div>
                                    Category: <strong>{course.category}</strong>
                                </div>
                                <div>
                                    Price: <strong>${course.price.toFixed(2)}</strong>
                                </div>
                            </div>
                            <p>
                                Status: <strong>{course.status}</strong>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
