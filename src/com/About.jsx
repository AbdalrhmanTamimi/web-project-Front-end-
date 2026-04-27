import './styles/About.css'

function About() {
    return (
        <div className="about-page">
            <h2 className="about-title">About CourseShare</h2>

            <p className="about-desc">
                CourseShare is a simple website for sharing courses and browsing them.
            </p>

            <p className="project-details">
                You can search, filter by category, and sort the list.
            </p>

            <p className="project-details">
                Everything you see is mock data (from a local JSON file).
            </p>
        </div>
    );
}

export default About;
