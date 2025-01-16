import React, { useState } from "react";
import { Document, Page } from "react-pdf";

import "../styles/Resume.css";
import ResumePDF from "../docs/StephenWatson_SoftwareEngineer_CV.pdf";

const Resume = () => {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        console.log("PDF loaded successfully:", numPages, "pages.");
    }

    return (
        <section className="resume-section" id="resume-section">
            <div className="resume-container">
                <h2>Resume</h2>
                <div className="resume-box">
                    <Document
                        file={ResumePDF}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={(error) =>
                            console.error("Error loading PDF:", error)
                        }
                    >
                        {numPages &&
                            Array.from({ length: numPages }, (_, i) => (
                                <Page
                                    key={`page_${i + 1}`}
                                    pageNumber={i + 1}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                />
                            ))}
                    </Document>
                    {numPages && (
                        <p>
                            Total Pages: {numPages}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Resume;
