import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="bg-transparent w-full flex flex-col min-h-screen z-1 p-6 max-w-full flex justify-center items-center">
            {/* Header */}
            <header className="min-h-10" />

            {/* Main Content */}
            <div className="flex flex-col z-1 sm:flex-row justify-center items-center sm:space-x-8 space-y-8 sm:space-y-0 overflow-hidden">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center text-white flex flex-col items-center bg-neutral-900/95 p-8 rounded-xl border border-orange-500"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-6xl font-bold"
                    >
                        Hello,
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-7xl font-semibold mt-2"
                    >
                        I'm Stephen
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        className="text-xl mt-2"
                    >
                        Software Engineer
                    </motion.p>
                    <button className="mt-4 py-2 px-6 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                        Contact Me
                    </button>
                </motion.div>

                {/* Profile Image */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="ml-6"
                >
                    <img
                        src="profile_pic.jpg"
                        alt="Stephen Watson"
                        className="w-72 h-72 rounded-full object-cover border border-orange-500"
                    />
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="min-h-10" />
        </div>
    );
};

export default Home;
