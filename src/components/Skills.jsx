import React from "react";

const skillsData = [
  {
    title: "What I’m Good At",
    icon: "🔥",
    description: "Building real-world apps and crushing coding challenges:",
    type: "list",
    items: [
      "Java Fullstack Development",
      "React & Modern Frontend",
      "Spring Boot & Node.js APIs",
      "Algorithms & Data Structures",
      "Interview Prep & Problem Solving",
    ],
  },
  {
    title: "My Toolkit",
    icon: "🧰",
    description: "Tools and tech I use every day to get things done:",
    type: "categories",
    items: [
      {
        category: "Frontend:",
        tools: "React, JavaScript, CSS",
      },
      {
        category: "Backend:",
        tools: "Java, Spring Boot, Node.js, Express",
      },
      {
        category: "Databases:",
        tools: "PostgreSQL, MySQL, Supabase, Neon DB",
      },
      {
        category: "Cloud & DevOps:",
        tools:
          "Google Cloud Platform (GCP), Git, Docker, GitHub Actions (CI/CD basics)",
      },
    ],
  },
  {
    title: "What Gets Me Going",
    icon: "🎧",
    description: "Stuff I’m passionate about when not coding:",
    type: "list",
    items: [
      "Politics & Debates (love listening)",
      "Cricket Movies & Documentaries",
      "Tech News & Trends",
      "Hunting for the next job opportunity",
    ],
  },
];

export default function Skills() {
  const renderItems = (skill) => {
    if (skill.type === "list") {
      return (
        <ul className="space-y-2">
          {skill.items.map((item, index) => (
            <li
              key={`${skill.title}-${item}-${index}`}
              className="text-gray-300"
            >
              {item}
            </li>
          ))}
        </ul>
      );
    } else if (skill.type === "categories") {
      return (
        <div className="space-y-4">
          {skill.items.map((item, index) => (
            <div key={`${skill.title}-${item.category}-${index}`}>
              <span className="text-gray-300 font-semibold">
                {item.category}
              </span>
              <p className="text-gray-400">{item.tools}</p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="skills" className="py-16 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((skill) => (
            <div
              key={skill.title}
              className="p-6 rounded-lg border border-gray-800 bg-[#111111]"
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{skill.title}</h3>
              <p className="text-gray-400 mb-4">{skill.description}</p>
              <div className="space-y-2">{renderItems(skill)}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href="/projects"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
          >
            Check My Projects
          </a>
        </div>
      </div>
    </section>
  );
}
