import React from "react";

const skillsData = [
  {
    title: "What I can do",
    icon: "💻",
    description: "I can help develop solutions that will help you grow your business:",
    type: "list",
    items: [
      "UI/UX Design",
      "Fullstack Web Development",
      "Mobile App Development",
      "Database Design",
      "API Integration"
    ]
  },
  {
    title: "Tools I Use",
    icon: "🛠️",
    description: "I use the latest tools and technologies to build functional and scalable products:",
    type: "categories",
    items: [
      {
        category: "Frontend:",
        tools: "Tailwind CSS, React, TypeScript"
      },
      {
        category: "Backend:",
        tools: "Node.js, Fastify, MongoDB, PostgreSQL"
      },
      {
        category: "Design:",
        tools: "Figma, Framer, Photoshop"
      }
    ]
  },
  {
    title: "UI/UX Design",
    icon: "🎨",
    description: "I am a designer first, developer second. I can help design clean and modern interfaces:",
    type: "list",
    items: [
      "User-Centered Design",
      "Modern & Clean UI",
      "Responsive Layouts",
      "Wireframes & Prototypes"
    ]
  }
];

export default function Skills() {
  const renderItems = (skill) => {
    if (skill.type === "list") {
      return (
        <ul className="space-y-2">
          {skill.items.map((item, index) => (
            <li key={`${skill.title}-${item}-${index}`} className="text-gray-300">
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
              <span className="text-gray-300">{item.category}</span>
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
            <div key={skill.title} className="p-6 rounded-lg border border-gray-800 bg-[#111111]">
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{skill.title}</h3>
              <p className="text-gray-400 mb-4">{skill.description}</p>
              <div className="space-y-2">
                {renderItems(skill)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
