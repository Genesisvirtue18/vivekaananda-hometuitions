import React, { useState } from "react";

const Courses = ({ id }) => {
  // Define categories
  const categories = [
    "Nursery-KG",
    "Class 1-5",
    "Class 6-8",
    "Class 9-10",
    "Class 11-12",
  ];

  // Sample courses data
  const coursesData = [
    {
      id: 1,
      title: "Nursery-KG",
      category: "Nursery-KG",
      image: "/Images/Courses/nursery.jpg",
      description: "Introduce your child to learning through:",
      points: [
        "Rhymes & storytelling",
        "Alphabet and number basics",
        "Drawing, coloring & playful activities",
        "Social skill development",
      ],
    },
    {
      id: 1,
      title: "Class 1 -5",
      category: "Class 1-5",
      image: "/Images/Courses/class-1-5.jpg",
      description: "Build Strong Foundations:",
      points: [
        "Introduction to core concepts in Maths & Science",
        "Developing reading and writing fluency in English/Hindi",
        "Storytelling, grammar, and creative activities",
      ],
    },
    {
      id: 2,
      title: "6th Class",
      category: "Class 6-8",
      image: "/Images/Courses/class-6-8.jpg",
      description: "Strengthen subject basics with:",
      points: [
        "Concept-based teaching in Maths & Science",
        "Language improvement in English/Hindi",
        "Regular assessments and revision support",
      ],
    },
    {
      id: 3,
      title: "7th Class",
      category: "Class 6-8",
      image: "/Images/Courses/class-6-8.jpg",
      description: "Targeted support for academic growth:",
      points: [
        "Deeper understanding of Science & Maths",
        "Grammar and writing fluency in English",
        "Social Studies with visual explanations",
      ],
    },
    {
      id: 4,
      title: "8th Class",
      category: "Class 6-8",
      image: "/Images/Courses/class-6-8.jpg",
      description: " Prepare for Higher Challenges:",
      points: [
        "Focus on Science experiments & conceptual clarity",
        "Advanced problem-solving in Maths",
        "Writing essays and comprehension in English",
        "Structured revision tests "
      ],
    },
    {
      id: 5,
      title: "9th Class",
      category: "Class 9-10",
      image: "/Images/Courses/class-9.jpg",
      description: "Bridge to Board Exams:",
      points: [
        "Foundation building in Algebra, Geometry & Trigonometry",
        "In-depth Science concepts with practical learning",
        "Critical writing & analysis in English",
        "Social Studies with real-world examples"
      ],
    },
    {
      id: 6,
      title: "10th Class",
      category: "Class 9-10",
      image: "/Images/Courses/class-10.jpg",
      description: "Board Exam Readiness:",
      points: [
        "Intensive Maths & Science preparation",
        "Past-year paper practice and mock tests",
        "English grammar, writing, and literature focus",
        "Time management & exam strategies"
      ],
    },
    {
      id: 7,
      title: "11th Class",
      category: "Class 11-12",
      image: "/Images/Courses/class-11.jpg",
      description: "Advanced Subject Specialization:",
      points: [
        "Core concepts in Physics, Chemistry, Biology, and Maths",
        "Subject-wise strategy for CBSE, ICSE, IB, or State syllabus",
        "Focus on analytical & logical problem solving",
      ],
    }, {
      id: 8,
      title: "12th Class",
      category: "Class 11-12",
      image: "/Images/Courses/class-12.jpg",
      description: "Excel in Final Year & Entrance Prep:",
      points: [
        "In-depth subject mastery with competitive exam focus",
        "Revision-driven teaching for retention",
        "Preparation for boards + NEET/JEE/competitive exams",
      ],
    },
  ];

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState("Class 6-8");

  // Filter courses
  const filteredCourses =
    selectedCategory === "All courses"
      ? coursesData
      : coursesData.filter((course) => course.category === selectedCategory);

  return (
    <section id={id} className="py-12  bg-white text-center font-inter">
      {/* Heading */}
      <h2 className="text-3xl font-semibold mb-2 font-inter">
        Find the courses <br /> we are offering
      </h2>

      {/* Tabs */}
      <div className="
  flex overflow-x-auto sm:flex-wrap 
  whitespace-nowrap sm:whitespace-normal 
  scrollbar-hide text-[#5B5B5B] 
  justify-start sm:justify-center 
  gap-4 my-6 px-4
">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg shrink-0 ${selectedCategory === cat
                ? "bg-[#FE6E01] font-bold text-white"
                : ""
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
  {filteredCourses.map((course) => (
    <div
      key={course.id}
      className="shadow-lg w-full rounded-[20px] overflow-hidden flex flex-col bg-white"
    >
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 text-left">
        <h3 className="text-[18px] font-inter font-semibold mb-1">
          {course.title}
        </h3>
        <p className="text-[#4E4E4E] text-sm mb-2">
          {course.description}
        </p>
        <ul className="list-disc pl-5 font-inter font-normal text-[#4E4E4E] text-[13px] leading-[21px] space-y-1">
          {course.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  ))}
</div>

    </section>
  );
};

export default Courses;
