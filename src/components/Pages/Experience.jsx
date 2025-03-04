import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
    return (
        <div className="bg-transparent w-full flex flex-col min-h-screen z-1 p-6 max-w-full flex justify-center items-center">
            {/* Experience Title */}
            <header className="min-h-10" />

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl font-bold text-center text-white mb-8 relative z-10 drop-shadow-lg bg-neutral-900/95 p-6 px-12 rounded-xl border border-orange-500"
            >
                Experience
            </motion.div>

            {/* Job Sections */}
            <div className="flex flex-col z-1 sm:flex-row justify-center items-center sm:space-x-8 space-y-8 sm:space-y-0">

                <asside className="w-32" />

                {/* Job 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="p-6 rounded-lg flex h-full min-h-96 flex-col bg-neutral-900/95 border border-orange-500 items-center"
                >
                    <h2 className="text-3xl text-white font-semibold">Internship</h2>
                    <p className="text-xl text-neutral-300">AccuTex - Verona VA</p>
                    <p className="text-lg text-white mt-2">May 2023 - December 2023</p>
                    <ul className="list-disc text-white pl-6 mt-4">
                        <li>Automated data entry into Salesforce by processing and uploading CSV files using Python, streamlining
                            workflow efficiency</li>
                        <li>Developed a VBA script to automate email blasts in Outlook Mail Merge, enabling the inclusion of multiple
                            attachments, a functionality not natively supported.
                        </li>
                        <li>Ensured consistent email formatting by applying predefined business rules to each automated message,
                            improving accuracy, and reducing manual intervention.</li>
                    </ul>
                </motion.div>

                {/* Job 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="p-6 rounded-lg flex h-full flex-col min-h-96 bg-neutral-900/95 border border-orange-500 items-center"
                >
                    <h2 className="text-3xl text-white font-semibold">Software Developer</h2>
                    <p className="text-xl text-neutral-300">CAPWIC - UVA</p>
                    <p className="text-lg text-white mt-2">January 2024 - May 2024</p>
                    <ul className="list-disc text-white pl-6 mt-4">
                        <li>Developed a vanilla JavaScript web application to visualize the Traveling Salesman Problem (TSP),
                            implementing Christofides’ algorithm and a brute-force optimal tour search.</li>
                        <li>Integrated multiple Google APIs (Maps, Distance Matrix, Geolocation) to efficiently compute distances, render
                            routes, and display map markers.</li>
                        <li>Project won First Place in the Flash Talk category by making TSP solutions interactive and accessible via a QR
                            code demo for attendees.</li>
                    </ul>
                </motion.div>

                <asside className="w-32" />
            </div>

        </div>
    );
};

export default Experience;
