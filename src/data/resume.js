import { Briefcase, GraduationCap, Code, Database, BarChart, Brain, Terminal, Layers, School, BookOpen } from 'lucide-react';

export const profile = {
  name: "Nikhil Shrivastav",
  role: "Data Analyst",
  email: "nshrivastav0905@gmail.com",
  phone: "+91 9067557516",
  linkedin: "https://www.linkedin.com/in/nshrivastav1512/",
  github: "https://github.com/nshrivastav1512",
  kaggle: "https://www.kaggle.com/nshrivastav1512",
  whatsapp: "+919067557516",
  location: "India",
  summary: "A results-driven data analyst with over 2 years of experience combining software engineering and analytics.",
  resumeUrl: "/src/assets/Nikhil Data Analyst Resume.pdf"
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
    skills: ["Mathematics", "Science", "English"],
    icon: School,
    color: "text-yellow-400",
    bg: "bg-white/10 dark:bg-white/5"
  },
  {
    type: 'edu',
    role: "Diploma in Computer Science",
    place: "Anjuman Polytechnic",
    location: "Nagpur",
    period: "June 2017 - May 2020",
    grade: "84%",
    desc: ["Specialized in Computer Science fundamentals."],
    skills: ["C Programming", "Java", "Database Concepts", "Web Development", "Data Structures"],
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
    skills: ["Python", "Machine Learning", "SQL", "Data Analytics", "Software Engineering", "Cloud Computing"],
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
    skills: ["SQL Server", "Database Design", "Query Optimization", "Reporting"],
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
    skills: ["System Analysis", "Technical Support", "Business Reporting", "SQL"],
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
    skills: ["Power BI", "SSRS", "T-SQL", "Data Analysis", "Report Development", "DAX"],
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
    skills: ["Python", "Web Scraping", "Power BI", "ETL", "Gen AI", "Selenium", "Prompt Engineering"],
    icon: Briefcase,
    color: "text-blue-400",
    bg: "bg-blue-900/20"
  }
];

// Skills with experience duration for tooltips
export const skills = [
  { 
    category: "BI & Visualization", 
    items: [
      { name: "Power BI", experience: "2+ years" },
      { name: "Tableau", experience: "1 year" },
      { name: "Excel", experience: "5+ years" },
      { name: "SSRS", experience: "1.5 years" },
      { name: "DAX", experience: "2 years" }
    ], 
    icon: BarChart 
  },
  { 
    category: "Analysis", 
    items: [
      { name: "Statistical Analysis", experience: "2 years" },
      { name: "A/B Testing", experience: "1 year" },
      { name: "EDA", experience: "2 years" },
      { name: "KPIs", experience: "2 years" }
    ], 
    icon: Brain 
  },
  { 
    category: "Programming", 
    items: [
      { name: "Python", experience: "3+ years" },
      { name: "SQL", experience: "3+ years" },
      { name: "Java", experience: "2 years" },
      { name: "Pandas", experience: "2 years" },
      { name: "NumPy", experience: "2 years" }
    ], 
    icon: Code 
  },
  { 
    category: "Data Engineering", 
    items: [
      { name: "ETL", experience: "2 years" },
      { name: "Web Scraping", experience: "1 year" },
      { name: "Selenium", experience: "1 year" },
      { name: "Gen AI", experience: "6 months" }
    ], 
    icon: Layers 
  },
  { 
    category: "Databases", 
    items: [
      { name: "SQL Server", experience: "3+ years" },
      { name: "MySQL", experience: "2 years" },
      { name: "PL/SQL", experience: "1 year" },
      { name: "T-SQL", experience: "2 years" }
    ], 
    icon: Database 
  },
  { 
    category: "Tools", 
    items: [
      { name: "Git", experience: "3 years" },
      { name: "GitHub", experience: "3 years" },
      { name: "VS Code", experience: "4 years" },
      { name: "Jira", experience: "1.5 years" }
    ], 
    icon: Terminal 
  }
];
