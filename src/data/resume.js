import { Briefcase, GraduationCap, Code, Database, BarChart, Brain, Terminal, Layers, School, BookOpen } from 'lucide-react';

export const profile = {
  name: "Nikhil Shrivastav",
  role: "Data Analyst",
  email: "nshrivastav0905@gmail.com",
  phone: "+91 9067557516",
  linkedin: "https://www.linkedin.com/in/nshrivastav1512/",
  github: "https://github.com/nshrivastav1512",
  location: "India",
  summary: "A results-driven data analyst with over 2 years of experience combining software engineering and analytics."
};

// Chronological Order: Oldest -> Newest
export const timelineData = [
  {
    type: 'edu',
    role: "10th (ICSE)",
    place: "Seventh Day Adventist Higher Secondary School",
    location: "Nagpur",
    period: "Completed 2017",
    grade: "69%",
    desc: ["Foundation in Science and Mathematics."],
    icon: School,
    color: "text-yellow-400",
    bg: "bg-yellow-900/20"
  },
  {
    type: 'edu',
    role: "Diploma in Computer Science",
    place: "Anjuman Polytechnic",
    location: "Nagpur",
    period: "June 2017 - May 2020",
    grade: "84%",
    desc: ["Specialized in Computer Science fundamentals."],
    icon: BookOpen,
    color: "text-orange-400",
    bg: "bg-orange-900/20"
  },
  {
    type: 'edu',
    role: "B.Tech, Computer Science",
    place: "G H Raisoni Institute of Engineering & Technology",
    location: "Nagpur",
    period: "June 2020 - May 2023",
    grade: "9.4 CGPA",
    desc: ["Major in Computer Science and Engineering."],
    icon: GraduationCap,
    color: "text-red-400",
    bg: "bg-red-900/20"
  },
  {
    type: 'work',
    role: "Junior Software Developer",
    place: "TN Byte Pvt Ltd",
    location: "Nagpur",
    period: "June 2022 - Jan 2023",
    desc: [
      "Automated user engagement reporting using SQL.",
      "Optimized database performance and schema design."
    ],
    icon: Database,
    color: "text-emerald-400",
    bg: "bg-emerald-900/20"
  },
  {
    type: 'work',
    role: "Software Engineer Intern",
    place: "Yardi Software Pvt Ltd",
    location: "Pune",
    period: "Jan 2023 - July 2023",
    desc: [
      "Performed in-depth system analysis for technical solutions.",
      "Analyzed business reports and provided technical support."
    ],
    icon: Terminal,
    color: "text-pink-400",
    bg: "bg-pink-900/20"
  },
  {
    type: 'work',
    role: "Software Engineer",
    place: "Yardi Software Pvt Ltd",
    location: "Pune",
    period: "July 2023 - Aug 2024",
    desc: [
      "Developed 100+ custom reports (SSRS, Power BI).",
      "Provided data fixes for 7M+ records, ensuring 100% integrity.",
      "Optimized SQL queries improving performance by 5%."
    ],
    icon: Code,
    color: "text-purple-400",
    bg: "bg-purple-900/20"
  },
  {
    type: 'work',
    role: "Data Analyst",
    place: "Brillect Tech Solutions Pvt. Ltd",
    location: "Nagpur",
    period: "Oct 2024 - June 2025",
    desc: [
      "Engineered end-to-end scraping pipeline (40+ jobs/min).",
      "Fine-tuned Gemini model for resume tailoring (30% response increase).",
      "Built Student Success Platform in Power BI with SQL ETL."
    ],
    icon: Briefcase,
    color: "text-blue-400",
    bg: "bg-blue-900/20"
  }
];

export const skills = [
  { category: "BI & Visualization", items: ["Power BI", "Tableau", "Excel", "SSRS", "DAX"], icon: BarChart },
  { category: "Analysis", items: ["Statistical Analysis", "A/B Testing", "EDA", "KPIs"], icon: Brain },
  { category: "Programming", items: ["Python", "SQL", "Java", "Pandas", "NumPy"], icon: Code },
  { category: "Data Engineering", items: ["ETL", "Web Scraping", "Selenium", "Gen AI"], icon: Layers },
  { category: "Databases", items: ["SQL Server", "MySQL", "PL/SQL", "T-SQL"], icon: Database },
  { category: "Tools", items: ["Git", "GitHub", "VS Code", "Jira"], icon: Terminal }
];
