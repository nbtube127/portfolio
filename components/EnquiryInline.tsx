import React, { useState } from "react";
import { toast } from "react-toastify";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const EnquiryInline: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);


  // WhatsApp number and message template
  const WHATSAPP_NUMBER = "9569690457";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix errors before submitting.", {
        icon: <AlertTriangle className="text-yellow-500" />,
      });
      return;
    }

    setLoading(true);
    // Compose WhatsApp message
    const message = `Hello, I would like to enquire.\nName: ${formData.name}\nPhone: ${formData.phone}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(url, "_blank");
    setLoading(false);
    setFormData({ name: "", phone: "" });
    toast.success("WhatsApp chat opened!", {
      icon: <CheckCircle className="text-white font-semibold" />,
    });
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
