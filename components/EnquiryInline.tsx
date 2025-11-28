import React, { useState } from "react";
import { toast } from "react-toastify";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const EnquiryInline: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxXCZ0bQPFlEYz9fTfPOyT2m_46z1v74f7gpsEK2KlP1aViXzd-a2Ab-UTibK18TcGWAg/exec";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Restrict phone input to digits only
    if (name === "phone" && !/^\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 letters";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix errors before submitting.", {
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
          icon: <CheckCircle className="text-white font-semibold" />,
        });
        setFormData({ name: "", phone: "" });
      } else {
        toast.error("Error submitting form.", {
          icon: <XCircle className="text-white font-semibold" />,
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
    <div className="w-full bg-white dark:bg-gray-900 py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          name="enquiryForm"
          className="flex flex-col md:flex-row items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
        >
          {/* Name Input */}
          <div className="flex-1 w-full">
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

          {/* Phone Input */}
          <div className="flex-1 w-full">
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryInline;
