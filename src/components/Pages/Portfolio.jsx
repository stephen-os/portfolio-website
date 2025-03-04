import React from "react";
import { motion } from "framer-motion";
import portfolioData from "../../data/portfolio.json";

const ButtonCard = ({ image, title, description, url, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
            className="w-full p-4 shadow-md rounded-lg flex flex-col items-center border border-orange-500 relative h-64 overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
        >
            {/* Wrap the entire card with an anchor or button */}
            <a
                href={url}
                className="absolute inset-0 flex flex-col justify-center items-center bg-neutral-900/60 p-4 text-white text-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className="flex flex-col justify-end">
                    <p className="text-lg font-semibold">{title}</p>
                    <p className="text-sm">{description}</p>
                </div>
            </a>
        </motion.div>
    );
};

const Portfolio = () => {
    return (
        <div className="bg-transparent w-full flex flex-col min-h-screen z-1 p-6 max-w-full flex justify-center items-center">
            {/* Header */}
            <header className="min-h-5" />

            {/* Main content area */}
            <div className="w-full max-w-5xl px-4 md:px-10">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl font-bold text-center text-white mb-8 relative z-10 drop-shadow-lg bg-neutral-900/95 p-4 rounded-xl border border-orange-500"
                >
                    Portfolio
                </motion.h1>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {portfolioData.projects.map((port, idx) => (
                        <ButtonCard key={idx} index={idx} image={port.image} title={port.title} description={port.description} url={port.url} />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="min-h-5" />
        </div>
    );
};

export default Portfolio;