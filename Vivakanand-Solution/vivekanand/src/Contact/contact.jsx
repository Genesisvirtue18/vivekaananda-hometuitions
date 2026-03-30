import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { FaWhatsapp, FaInstagram, FaYoutube } from "react-icons/fa"; // real icons

const Contact = () => {
    return (
        <div className="bg-white text-gray-800 font-inter">
            {/* Navbar */}
            <NavBar />

            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-center"
                style={{ backgroundImage: "url('/Images/Contact/Contact.jpg')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                        We are here to Help
                    </h1>
                    <p className="text-md font-semibold text-[#FFFFFF]">
                        Whether you have a question, need more details, or just want to <br />
                        say hello we’re only a call, message, or visit away
                    </p>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="py-16 px-6 md:px-16 lg:px-24">
                <h2 className="text-center text-3xl font-semibold mb-12">
                    Get In Touch
                </h2>

                <div className="max-w-6xl mx-auto space-y-12">
                    {/* Top Row: Call Us + Visit Us + Justdial */}
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Call Us */}
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                            <p className="text-gray-600 mb-2">
                                If you have any questions or need more information, just give us
                                a call. We’ll listen to your needs and help you find the right
                                tutor for your child
                            </p>
                            <p className="flex items-center gap-2 text-orange-500 font-medium">
                                <img
                                    src="/Images/Contact/contact-icon-1.png"
                                    alt="Phone Icon"
                                    className="w-5 h-5"
                                />
                                <a href="tel:+919059746820" className="hover:underline">
                                    +91 9059746820
                                </a>
                            </p>
                        </div>

                        {/* Visit Us */}
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
                            <p className="text-gray-600 mb-2">
                                You are welcome to visit our Chanda Nagar office. We will sit
                                with you, understand your child’s learning needs, and explain
                                how we can help
                            </p>
                            <p className="flex items-center gap-2 font-medium">
                                <img
                                    src="/Images/Contact/contact-icon-2.png"
                                    alt="Location Icon"
                                    className="w-5 h-5"
                                />
                                <a
                                    href="https://www.google.com/maps/place/17%C2%B030'12.7%22N+78%C2%B018'46.8%22E"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline text-[#FE6E01]"
                                >
                                    View on Google Maps
                                </a>
                            </p>
                        </div>

                        {/* Justdial */}
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Find Us on Justdial</h3>
                            <p className="text-gray-600 mb-2">
                                You can also connect with us on Justdial to see reviews,
                                ratings, and more details about our tutoring services.
                            </p>
                            <p className="flex items-center gap-2 font-medium">
                                <img
                                    src="/Images/Contact/contact-icon-3.png"
                                    alt="Justdial Icon"
                                    className="w-5 h-5"
                                />
                                <a
                                    href="https://www.justdial.com/Hyderabad/Vivekananda-Home-Tuitions-Dilsukhnagar/040PXX40-XX40-200104220044-M2Y7_BZDET"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline text-[#FE6E01]"
                                >
                                    Visit on Justdial
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Bottom Row: Map */}
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3805.083500673354!2d78.313011!3d17.503527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDMwJzEyLjciTiA3OMKwMTgnNDYuOCJF!5e0!3m2!1sen!2sin!4v1756273548333!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-[450px] rounded-2xl"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Floating Social Icons */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
                {/* WhatsApp */}
                <a
                    href="https://wa.me/919059746820"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform text-white"
                >
                    <FaWhatsapp className="w-6 h-6" />
                </a>

                {/* Instagram */}
                <a
                    href="https://www.instagram.com/vivekaananda_home_tuitions?igsh=MWtzZDQ0Z3c2aXplMQ%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-transform text-white"
                >
                    <FaInstagram className="w-6 h-6" />
                </a>

                {/* YouTube */}
                <a
                    href="https://youtu.be/f3_TVSTXtKk?si=zkeh48I4KULeC17w"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 p-3 rounded-full shadow-lg hover:scale-110 transition-transform text-white"
                >
                    <FaYoutube className="w-6 h-6" />
                </a>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;
