import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "What areas do you deliver to?",
    answer:
      "We currently offer same-day delivery to Cairo and Giza. Free delivery is available on orders over 500 EGP. We're working on expanding our delivery areas soon!",
  },
  {
    id: "2",
    question: "How long does delivery take?",
    answer:
      "We offer same-day delivery for orders placed before 2:00 PM. Orders placed after 2:00 PM will be delivered the next day. Delivery times are typically between 9:00 AM and 10:00 PM.",
  },
  {
    id: "3",
    question: "Can I track my order?",
    answer:
      "Yes! Once your order is confirmed, you'll receive a tracking number via email and SMS. You can use this number to track your order status in real-time on our Track Order page.",
  },
  {
    id: "4",
    question: "What payment methods do you accept?",
    answer:
      "We accept cash on delivery, credit/debit cards (Visa, Mastercard), and various payment methods through Valu. All online payments are secure and encrypted.",
  },
  {
    id: "5",
    question: "Can I cancel or modify my order?",
    answer:
      "You can cancel or modify your order within 30 minutes of placing it by contacting our customer service. After that, orders are processed and cannot be changed. For cancellations, please contact us immediately.",
  },
  {
    id: "6",
    question: "Do you offer gift wrapping?",
    answer:
      "Yes! We offer free gift wrapping on all orders. You can add a personalized message card at checkout. Our gift wrapping service ensures your gift looks beautiful and ready to present.",
  },
  {
    id: "7",
    question: "What if I'm not satisfied with my order?",
    answer:
      "We guarantee 100% satisfaction. If you're not happy with your order, please contact us within 24 hours of delivery. We'll work with you to resolve the issue, including replacement or refund options.",
  },
  {
    id: "8",
    question: "Do you have a physical store?",
    answer:
      "Currently, we operate as an online flower delivery service. However, you can visit our showroom by appointment. Contact us to schedule a visit and see our beautiful arrangements in person.",
  },
  {
    id: "9",
    question: "How do I care for my flowers?",
    answer:
      "We include care instructions with every order. Generally, keep flowers in fresh water, trim stems at an angle every 2-3 days, and place them away from direct sunlight and heat sources. Change the water regularly to extend their lifespan.",
  },
  {
    id: "10",
    question: "Can I schedule a delivery for a future date?",
    answer:
      "Yes! You can schedule deliveries up to 30 days in advance. Simply select your preferred delivery date during checkout. This is perfect for birthdays, anniversaries, and special occasions.",
  },
];

export const FAQs: FC = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const toggleFAQ = (id: string): void => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-wardity-bg dark:bg-wardity-bg-dark py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find answers to common questions about our services, delivery, and more.
          </p>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="font-semibold text-gray-900 dark:text-gray-100 pr-4">
                  {faq.question}
                </span>
                {openFAQ === faq.id ? (
                  <ChevronUpIcon className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-primary/5 dark:bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

