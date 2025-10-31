import React, { useEffect, useState } from "react";
import {
  MessageCircle,
  X,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const EnquiryPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // restrict phone to digits only
    if (name === "phone" && !/^\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });

    // clear error when user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  // ✅ Validation function
  const validate = () => {
    let newErrors: { name?: string; phone?: string } = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should contain only letters";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 letters long";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxXCZ0bQPFlEYz9fTfPOyT2m_46z1v74f7gpsEK2KlP1aViXzd-a2Ab-UTibK18TcGWAg/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors before submitting.", {
        icon: <AlertTriangle className="text-yellow-500" />,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: new FormData(e.target as HTMLFormElement),
      });

      if (res.ok) {
        toast.success("Enquiry submitted successfully!", {
          icon: <CheckCircle className="text-white" />,
        });
        setFormData({ name: "", phone: "" });
        setTimeout(() => setIsOpen(false), 1500);
      } else {
        toast.error("Error submitting form. Please try again.", {
          icon: <XCircle className="text-white" />,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        icon: <AlertTriangle className="text-yellow-500" />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Message Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 bg-yellow-400 hover:bg-yellow-500 text-black p-4 rounded-full shadow-xl transition-transform transform hover:scale-110 z-40"
        aria-label="Open Enquiry Form"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm relative p-6">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-center text-black mb-2">
              Get in Touch
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Enter your details and we'll reach out soon.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              name="enquiryForm"
            >
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 text-gray-900 focus:outline-none focus:border-yellow-400`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  maxLength={10}
                  className={`w-full border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-3 text-gray-900 focus:outline-none focus:border-yellow-400`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition-colors duration-300"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EnquiryPopup;
