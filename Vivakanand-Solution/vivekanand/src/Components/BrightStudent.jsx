import React from "react";

const BrightStudent = () => {
    return (
        <section className="py-12 px-6 max-w-6xl mx-auto text-center">
            <h2
                className="mb-4 text-center"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 600,
                    fontStyle: "normal",
                    fontSize: "24px",
                    lineHeight: "36px",
                    letterSpacing: "0",
                    color: "#1E1E1E",
                }}
            >
                Our Bright Students
            </h2>
            <p
                className="mb-8"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "18px",
                    lineHeight: "30px",
                    letterSpacing: "0",
                    textAlign: "center",
                    color: "#2B2B2B",
                }}
            >
                From small steps to big milestones, our students make us proud with their dedication, growth, and success
            </p>

            {/* Centered Grid with smaller gap */}
            <div className="grid md:grid-cols-3 gap-4 justify-center">
                <div className="flex flex-col items-center">
                    <img
                        src="/Images/BrightStudent/bright-student-1.jpg"
                        alt="Shanaya"
                        className="rounded-xl h-[300px] w-[300px] object-cover mb-4"
                    />
                    <h4
                        className="text-center"
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 600,
                            fontSize: "18px",
                            lineHeight: "28px",
                            color: "#1E1E1E",
                        }}
                    >
                    </h4>
                    <p
                        className="text-center"
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#5B5B5B",
                        }}
                    >
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <img
                        src="/Images/BrightStudent/bright-student-2.jpg"
                        alt="Karishma"
                        className="rounded-xl h-[300px] w-[300px] object-cover mb-4"
                    />
                    <h4
                        className="text-center"
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 600,
                            fontSize: "18px",
                            lineHeight: "28px",
                            color: "#1E1E1E",
                        }}
                    >
                    </h4>
                    <p
                        className="text-center"
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#5B5B5B",
                        }}
                    >
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <img
                        src="/Images/BrightStudent/bright-student-3.jpg"
                        alt="Amey"
                        className="rounded-xl h-[300px] w-[300px] object-cover mb-4"
                    />
                    <h4
                        className="text-center"
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 600,
                            fontSize: "18px",
                            lineHeight: "28px",
                            color: "#1E1E1E",
                        }}
                    >
                    </h4>
                    <p
                        className="text-center"
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#5B5B5B",
                        }}
                    >
                    </p>
                </div>
            </div>
        </section>

    );
};

export default BrightStudent;
