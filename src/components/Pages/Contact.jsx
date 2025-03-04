import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import emailjs from '@emailjs/browser';

const Contact = () => {

    useEffect(() => {
        emailjs.init("zvEeMJcyqGe95s3de");
    }, []);

    const [formData, setFormData] = useState({
        to_name: 'Stephen',
        from_name: '',
        message: '',
        reply_to: ''
    });
    const [status, setStatus] = useState({
        message: '',
        type: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add your EmailJS configuration here
        try {
            const response = await emailjs.send(
                'service_i4q9j9e',
                'template_1b55rgy',
                formData,
                'zvEeMJcyqGe95s3de'
            );

            setStatus({
                message: 'Message sent successfully!',
                type: 'success'
            });

            // Reset form
            setFormData({
                to_name: 'Stephen',
                from_name: '',
                message: '',
                reply_to: ''
            });
        } catch (error) {
            setStatus({
                message: 'Failed to send message. Please try again.',
                type: 'error'
            });
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    };

    return (
        <div className="bg-transparent w-full min-h-screen flex flex-col justify-center items-center p-6">
            {/* Title Section */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center z-1 text-white bg-neutral-900/95 p-4 rounded-xl border border-orange-500 mb-6 w-full max-w-3xl"
            >
                <h1 className="text-5xl font-bold mb-4">Contact Me</h1>
                <p className="text-xl max-w-3xl mx-auto">
                    Have a question, feedback or want to collaborate? I'd love to hear from you.
                    Fill out the form below, and I'll get back to you as soon as possible.
                </p>
            </motion.div>

            {/* Contact Form */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-neutral-900/95 z-1 p-8 rounded-xl shadow-lg border border-orange-500 w-full max-w-md"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-white mb-2">Name</label>
                        <input
                            type="text"
                            id="from_name"
                            name="from_name"
                            value={formData.from_name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-white mb-2">Email</label>
                        <input
                            type="email"
                            id="reply_to"
                            name="reply_to"
                            value={formData.reply_to}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-white mb-2">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    {status.message && (
                        <div className={`p-2 rounded ${status.type === 'success'
                            ? 'bg-green-600/20 text-green-400'
                            : 'bg-red-600/20 text-red-400'
                            }`}>
                            {status.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center p-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                    >
                        <FaPaperPlane className="mr-2" size={20} />
                        Send Message
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Contact;