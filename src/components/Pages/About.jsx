import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

import portfolio from "../../data/portfolio.json";

const colors = ["#ef4444", "#facc15", "#22c55e", "#3b82f6"];

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const About = () => {
    return (
        <div className="bg-transparent z-1 w-full min-h-screen flex flex-col justify-center items-center p-6">
            {/* Title & About Section */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center z-1 text-white bg-neutral-900/95 p-4 rounded-xl border border-orange-500 mb-6 w-full max-w-3xl"
            >
                <h1 className="text-5xl font-bold mb-4">About Me</h1>
                <p className="text-xl max-w-3xl mx-auto">
                    I am a graduate of James Madison University in Computer Science. I have a passion for programming and spend most of my time tinkering with new technologies.
                </p>
            </motion.div>

            {/* Cards Section */}
            <div className="grid z-1 grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl place-items-center">
                {/* Languages Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-neutral-900/95 p-6 rounded-xl shadow-lg border border-orange-500 w-full max-w-md"
                >
                    <h2 className="text-2xl text-white font-semibold mb-4 text-center">Languages</h2>
                    <div className="relative left-[-10px] w-full">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart layout="vertical" data={portfolio.about.languages}>
                                <XAxis type="number" />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    width={80}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip />
                                <Bar dataKey="level">
                                    {portfolio.about.languages.map((entry, index) => (
                                        <Cell key={`language-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Frameworks Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="bg-neutral-900/95 p-6 rounded-xl shadow-lg border border-orange-500 w-full max-w-md"
                >
                    <h2 className="text-2xl text-white font-semibold mb-4 text-center">Frameworks</h2>
                    <div className="relative left-[-10px] w-full">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart layout="vertical" data={portfolio.about.frameworks}>
                                <XAxis type="number" />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    width={80}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip />
                                <Bar dataKey="level">
                                    {portfolio.about.frameworks.map((entry, index) => (
                                        <Cell key={`framework-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Tools Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="bg-neutral-900/95 p-6 rounded-xl shadow-lg border border-orange-500 w-full max-w-md"
                >
                    <h2 className="text-2xl text-white font-semibold mb-4 text-center">Tools</h2>
                    <div className="relative left-[-10px] w-full">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart layout="vertical" data={portfolio.about.tools}>
                                <XAxis type="number" />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    width={80}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip />
                                <Bar dataKey="level">
                                    {portfolio.about.tools.map((entry, index) => (
                                        <Cell key={`tools-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;