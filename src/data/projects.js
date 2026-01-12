import { BarChart3, PieChart, LineChart, Database, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

export const projects = [
  {
    id: 1,
    month: "PROJECT 1",
    title: "E-Commerce Sales Dashboard",
    desc: "A comprehensive analysis of global sales data, identifying key trends in customer behavior and regional performance. Built with Power BI and SQL.",
    tools: ["Power BI", "SQL", "DAX"],
    color: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    accent: "text-blue-400",
    icon: BarChart3,
    imageColor: "bg-gradient-to-br from-blue-600 to-cyan-400",
    images: [
      "/images/project1/1.png",
      "/images/project1/2.png"
    ]
  },
  {
    id: 2,
    month: "PROJECT 2",
    title: "Healthcare Patient Analytics",
    desc: "Analysed patient visits, financial performance, and medical procedures for a healthcare organization. Built an interactive dashboard allowing stakeholders to track KPIs, monitor revenue, and understand patient demographics.",
    tools: ["Power BI", "SQL Server", "Power Query", "DAX"],
    color: "from-emerald-500/20 via-green-500/20 to-lime-500/20",
    accent: "text-emerald-400",
    icon: Activity,
    imageColor: "bg-gradient-to-br from-emerald-600 to-green-400",
    images: [
      "/images/project2/1.png",
      "/images/project2/2.png",
      "/images/project2/3.png",
      "/images/project2/4.png",
      "/images/project2/5.png"
    ],
    caseStudy: {
      analyst: "Nikhil Shrivastav",
      organization: "Mmind Technology",
      date: "December 22, 2025",
      executiveSummary: {
        overview: "This project analyses patient visits, financial performance, and medical procedures for a healthcare organization. We combined data from multiple CSV files into a central SQL database and built an interactive dashboard using Power BI.",
        keyFindings: [
          { label: "Total Revenue", value: "$101.5 Million", desc: "across 28,000 patient encounters" },
          { label: "Primary Visit Type", value: "Ambulatory (44.95%)", desc: "followed by Wellness (22.59%)" },
          { label: "Patient Demographics", value: "60+ Age Group", desc: "largest segment requiring geriatric care" },
          { label: "Financial Risk", value: "$70.4M Patient Pocket", desc: "vs $31.1M insurance coverage" }
        ]
      },
      methodology: {
        phases: [
          { phase: "Data Acquisition", desc: "5 CSV datasets: Patients, Encounters, Procedures, Organizations, Payers" },
          { phase: "Database Design", desc: "SQL Server with linked tables using Primary Keys" },
          { phase: "Data Transformation", desc: "Power Query for formatting and Age Group categorization" },
          { phase: "DAX Calculations", desc: "Total Patients, Revenue, Average Age, Coverage Rate" },
          { phase: "Dashboard Design", desc: "Multi-page interactive report with navigation" }
        ]
      },
      dashboardPages: [
        { title: "Executive Summary", insights: ["974 Total Patients, 28K Encounters", "45% Ambulatory visits", "Revenue peaked 2014/2020, declining 2022"] },
        { title: "Financial Analysis", insights: ["$101.5M total revenue", "$70.4M Patient Pocket (uninsured)", "Medicare & Medicaid top contributors"] },
        { title: "Patient Demographics", insights: ["Average age: 73.78 years", "80% Non-Hispanic, 20% Hispanic", "Gender split nearly even"] },
        { title: "Clinical Analysis", insights: ["48K procedures, $2,200 avg cost", "Top: Heart Failure, Hyperlipidemia", "Activity spikes in March & October"] }
      ],
      recommendations: [
        "Address Insurance Gaps: Financial counselling for Medicaid/Medicare enrollment",
        "Specialized Geriatric Care: Invest in elderly units and home-care partnerships",
        "Optimize Outpatient Services: Marketing for Ambulatory services",
        "Cost Control: Audit billing for Ambulatory visits"
      ]
    }
  },
  {
    id: 3,
    month: "PROJECT 3",
    title: "Financial Risk Assessment",
    desc: "Developed a risk scoring model for loan applicants, improving default prediction accuracy by 20%. Visualized credit risk distribution.",
    tools: ["R", "Power BI", "Excel"],
    color: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
    accent: "text-purple-400",
    icon: TrendingUp,
    imageColor: "bg-gradient-to-br from-purple-600 to-pink-400",
    images: [
      "/images/project3/1.png"
    ]
  },
  {
    id: 4,
    month: "PROJECT 4",
    title: "Supply Chain Optimization",
    desc: "Analyzed inventory turnover and logistics costs. Identified bottlenecks in the supply chain leading to a 10% cost reduction proposal.",
    tools: ["SQL", "Power BI", "Python"],
    color: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
    accent: "text-orange-400",
    icon: Database,
    imageColor: "bg-gradient-to-br from-orange-600 to-amber-400",
    images: [
      "/images/project4/1.png"
    ]
  },
  {
    id: 5,
    month: "PROJECT 5",
    title: "Customer Churn Prediction",
    desc: "Identified at-risk customers using machine learning models. Created an interactive dashboard to track retention strategies.",
    tools: ["Python", "Scikit-learn", "Power BI"],
    color: "from-red-500/20 via-rose-500/20 to-pink-500/20",
    accent: "text-red-400",
    icon: Users,
    imageColor: "bg-gradient-to-br from-red-600 to-rose-400",
    images: [
      "/images/project5/1.png"
    ]
  },
  {
    id: 6,
    month: "PROJECT 6",
    title: "Marketing Campaign ROI",
    desc: "Evaluated the effectiveness of multi-channel marketing campaigns. Correlated ad spend with conversion rates to optimize budget allocation.",
    tools: ["Google Analytics", "Power BI", "Excel"],
    color: "from-indigo-500/20 via-violet-500/20 to-purple-500/20",
    accent: "text-indigo-400",
    icon: DollarSign,
    imageColor: "bg-gradient-to-br from-indigo-600 to-violet-400",
    images: [
      "/images/project6/1.png"
    ]
  }
];
