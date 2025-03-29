import React, { useState } from "react";
import { FaMap, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaWhatsapp } from 'react-icons/fa'

const Contact = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault(e);
    const phoneNumber = "919517188738"; 
    const encodedMessage = encodeURIComponent(
      `Hello! My query is:`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      id="contact"
      className="w-full h-[800px] bg-contact-image bg-no-repeat bg-cover bg-fixed text-white px-4 relative"
    >
      <div className="w-full h-full bg-black bg-opacity-80 py-20">
        <div className="max-w-6xl h-full mx-auto flex flex-col gap-6 md:gap-12">
          <h1 className="text-3xl font-thin tracking-widest uppercase text-center">
            Say Hello!
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center gap-3">
              <FaMap className="text-4xl text-designColor" />
              <p className="text-sm tracking-wide">Sunderdas Saw Mill Compound</p>
              <p className="text-sm tracking-wide">Reay Road Mumbai, Maharashtra, India</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FaPhoneAlt className="text-4xl text-designColor" />
              <p className="text-sm tracking-wide">+91 9569690457</p>
            </div>
            <div onClick={handleSubmit} className="flex flex-col items-center gap-3">
              <FaWhatsapp className="text-4xl text-designColor" />
              <p className="text-sm tracking-wide">Message us</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <FaEnvelope className="text-4xl text-designColor" />
              <p className="text-sm tracking-wide">nbtubeindia@gmail.com</p>
            </div>
          </div>
          <div className="w-full py-10 bg-black flex flex-col md:flex-row px-4 md:items-center justify-between">
            <div className="text-lg font-thin">
              <p>For project enquries</p>
              <p>
                or say 'Hello' -{" "}
                <span className="font-semibold text-designColor">
                  nbtubeindia@gmail.com
                </span>
              </p>
            </div>
            <a href="https://reactbd.com/" target="_blank">
              <p>© 2024 NbTubeIndia All rights reserved.</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
