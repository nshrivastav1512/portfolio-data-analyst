import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Mail, Phone, Linkedin, Github } from 'lucide-react';

const ResumeView = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white transition-colors duration-500">
            {/* Header with Back Button */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 transition-colors duration-500">
                <div className="max-w-4xl mx-auto px-6 pr-20 md:px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>
                    <a
                        href="/src/assets/Nikhil Data Analyst Resume.pdf"
                        download="Nikhil_Shrivastav_Resume.pdf"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-bold hover:scale-105 transition-all"
                    >
                        <Download size={18} /> Download PDF
                    </a>
                </div>
            </div>

            {/* Resume Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto px-4 md:px-6 py-8"
            >
                <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-white/10 p-6 md:p-12 shadow-xl dark:shadow-none transition-colors duration-500">

                    {/* Header */}
                    <header className="text-center mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                            Nikhil Shrivastav
                        </h1>
                        <h2 className="text-xl md:text-2xl font-medium text-cyan-600 dark:text-cyan-400 mb-4">
                            Data Analyst
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4 text-slate-600 dark:text-gray-400 text-sm">
                            <span className="flex items-center gap-1">
                                <Phone size={14} /> +91 9067557516
                            </span>
                            <span className="flex items-center gap-1">
                                <Mail size={14} /> nshrivastav0905@gmail.com
                            </span>
                            <a href="https://www.linkedin.com/in/nshrivastav1512/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                                <Linkedin size={14} /> LinkedIn
                            </a>
                            <a href="https://github.com/nshrivastav1512" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                                <Github size={14} /> GitHub
                            </a>
                        </div>
                    </header>

                    {/* Summary */}
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500 pb-2 mb-4">
                            Summary
                        </h2>
                        <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                            A results-driven <strong className="text-slate-900 dark:text-white">data analyst</strong> with over <strong className="text-slate-900 dark:text-white">2 years</strong> of experience combining <strong className="text-slate-900 dark:text-white">software engineering</strong> and <strong className="text-slate-900 dark:text-white">analytics</strong>. I use <strong className="text-slate-900 dark:text-white">Python</strong> and <strong className="text-slate-900 dark:text-white">SQL</strong> to construct end-to-end data solutions. My expertise spans from automated data scraping using Selenium and reliable <strong className="text-slate-900 dark:text-white">ETL pipelines</strong> to advanced <strong className="text-slate-900 dark:text-white">AI integration</strong> through <strong className="text-slate-900 dark:text-white">prompt engineering</strong>, creating impactful <strong className="text-slate-900 dark:text-white">Power BI dashboards</strong>. Through my efforts, I have directly improved report performance by 10%, upheld <strong className="text-slate-900 dark:text-white">data integrity</strong>, identified <strong className="text-slate-900 dark:text-white">100+ at-risk learners</strong> 8 weeks early, increased job application response rates by <strong className="text-slate-900 dark:text-white">30%</strong>, and increased <strong className="text-slate-900 dark:text-white">customer satisfaction by 150+</strong>.
                        </p>
                    </section>

                    {/* Skills */}
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500 pb-2 mb-4">
                            Skills
                        </h2>
                        <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2">
                                <strong className="text-slate-900 dark:text-white">BI & Data Visualization:</strong>
                                <span className="text-slate-600 dark:text-gray-300">Power BI (DAX, Power Query, Power Pivot), Tableau, Excel (Advanced), SSRS, SSIS</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2">
                                <strong className="text-slate-900 dark:text-white">Data Analysis & Modeling:</strong>
                                <span className="text-slate-600 dark:text-gray-300">Statistical Analysis, Modeling, Storytelling, KPI's, A/B Testing, Exploratory Data Analysis (EDA)</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2">
                                <strong className="text-slate-900 dark:text-white">Programming & Databases:</strong>
                                <span className="text-slate-600 dark:text-gray-300">SQL (PL/SQL, T-SQL), Python (Pandas, NumPy, Seaborn, BeautifulSoup), Java, SQL Server, MySQL</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2">
                                <strong className="text-slate-900 dark:text-white">Data Engineering:</strong>
                                <span className="text-slate-600 dark:text-gray-300">Web Scraping (Selenium), ETL Processes, Data Design, Generative AI, Prompt Engineering, Data Cleaning</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2">
                                <strong className="text-slate-900 dark:text-white">Tools & Technologies:</strong>
                                <span className="text-slate-600 dark:text-gray-300">Version Control (Git, GitHub), VS Code, Jupyter, Project Management (Agile/Scrum, Jira)</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2">
                                <strong className="text-slate-900 dark:text-white">Professional Skills:</strong>
                                <span className="text-slate-600 dark:text-gray-300">Problem-Solving, Critical Thinking, Requirement Analysis, Mentoring, Root Cause Analysis</span>
                            </div>
                        </div>
                    </section>

                    {/* Experience */}
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500 pb-2 mb-4">
                            Experience
                        </h2>

                        {/* Job 1 */}
                        <div className="mb-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Data Analyst</h3>
                                <span className="text-slate-500 dark:text-gray-400 text-sm">Nagpur | October 2024 - June 2025</span>
                            </div>
                            <div className="text-cyan-600 dark:text-cyan-400/80 text-sm mb-2">Brillect Tech Solutions Pvt. Ltd</div>
                            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-gray-300 text-sm">
                                <li>Engineered an end-to-end <strong className="text-slate-900 dark:text-white">Job application pipeline</strong> that scrapes 40+ jobs/min from multiple platforms using <strong className="text-slate-900 dark:text-white">Selenium</strong> into a <strong className="text-slate-900 dark:text-white">SQL Server</strong> database. This system uses a fine-tuned Gemini model to tailor resumes, resulting in a <strong className="text-slate-900 dark:text-white">30% increase</strong> in response rates.</li>
                                <li>Developed Student Success Intelligence Platform in <strong className="text-slate-900 dark:text-white">Power BI</strong>, powered by an automated <strong className="text-slate-900 dark:text-white">SQL Server ETL pipeline</strong> processing <strong className="text-slate-900 dark:text-white">100k+ records</strong> with advanced <strong className="text-slate-900 dark:text-white">DAX</strong>, identifying 100+ at-risk students 8 weeks early.</li>
                            </ul>
                        </div>

                        {/* Job 2 */}
                        <div className="mb-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Software Engineer</h3>
                                <span className="text-slate-500 dark:text-gray-400 text-sm">Pune | July 2023 - August 2024</span>
                            </div>
                            <div className="text-cyan-600 dark:text-cyan-400/80 text-sm mb-2">Yardi Software Pvt Ltd</div>
                            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-gray-300 text-sm">
                                <li>Developed and <strong className="text-slate-900 dark:text-white">optimized 100+ custom reports</strong> (SSRS, YSR, Power BI) for clients, resolved 10+ critical bugs, and provided data fixes for over <strong className="text-slate-900 dark:text-white">7 million records</strong>.</li>
                                <li>Handled support for <strong className="text-slate-900 dark:text-white">150+ clients</strong> and processed 500+ requests, resulting in a <strong className="text-slate-900 dark:text-white">10% improvement in delivery</strong>.</li>
                                <li>Engineered complex <strong className="text-slate-900 dark:text-white">SQL queries</strong>, stored procedures, triggers, improving query performance by 5%.</li>
                            </ul>
                        </div>

                        {/* Job 3 */}
                        <div className="mb-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Software Engineer Intern</h3>
                                <span className="text-slate-500 dark:text-gray-400 text-sm">Pune | January 2023 - July 2023</span>
                            </div>
                            <div className="text-cyan-600 dark:text-cyan-400/80 text-sm mb-2">Yardi Software Pvt Ltd</div>
                            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-gray-300 text-sm">
                                <li>Created optimal technical solutions by performing in-depth system analysis and improving existing SQL queries.</li>
                                <li>Analyzed business reports to support prompt communication and provide ongoing technical support.</li>
                                <li>Resolved complex business issues, proposing long-term solutions to prevent recurring problems.</li>
                            </ul>
                        </div>

                        {/* Job 4 */}
                        <div className="mb-2">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Software Developer</h3>
                                <span className="text-slate-500 dark:text-gray-400 text-sm">Nagpur | June 2022 - January 2023</span>
                            </div>
                            <div className="text-cyan-600 dark:text-cyan-400/80 text-sm mb-2">TN Byte Pvt Ltd</div>
                            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-gray-300 text-sm">
                                <li><strong className="text-slate-900 dark:text-white">Automated user engagement reporting</strong> by designing SQL queries to consolidate data from attendance, task completion, and performance tables.</li>
                                <li><strong className="text-slate-900 dark:text-white">Optimized database performance</strong> by redesigning schemas, normalizing structures, and adding relationships.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500 pb-2 mb-4">
                            Education
                        </h2>

                        <div className="mb-4">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">G H Raisoni Institute of Engineering & Technology</h3>
                                <span className="text-slate-500 dark:text-gray-400 text-sm">Nagpur | June 2020 - May 2023</span>
                            </div>
                            <div className="text-cyan-600 dark:text-cyan-400/80 text-sm">B.Tech, Computer Science and Engineering - 9.4 CGPA</div>
                        </div>

                        <div>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Anjuman Polytechnic</h3>
                                <span className="text-slate-500 dark:text-gray-400 text-sm">Nagpur | June 2017 - May 2020</span>
                            </div>
                            <div className="text-cyan-600 dark:text-cyan-400/80 text-sm">Diploma, Computer Science - 9.4 CGPA</div>
                        </div>
                    </section>

                </div>
            </motion.div>
        </div>
    );
};

export default ResumeView;
