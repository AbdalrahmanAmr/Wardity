import { FC, useState } from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact: FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // In a real app, you'd call an API here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-wardity-bg dark:bg-wardity-bg-dark py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We'd love to hear from you! Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Cairo, Egypt
                      <br />
                      Giza, Egypt
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Phone</h3>
                    <a
                      href="tel:+201234567890"
                      className="text-primary hover:underline text-gray-600 dark:text-gray-400"
                    >
                      +20 123 456 7890
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <EnvelopeIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Email</h3>
                    <a
                      href="mailto:info@wardity.com"
                      className="text-primary hover:underline text-gray-600 dark:text-gray-400"
                    >
                      info@wardity.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Business Hours
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Sunday - Thursday: 9:00 AM - 10:00 PM
                      <br />
                      Friday - Saturday: 10:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden h-64 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Map Location</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Send us a Message
              </h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-800 dark:text-green-200">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Question</option>
                    <option value="delivery">Delivery Question</option>
                    <option value="product">Product Question</option>
                    <option value="complaint">Complaint</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

