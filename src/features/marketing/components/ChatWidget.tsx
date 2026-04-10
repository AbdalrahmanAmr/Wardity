import { FC, useState } from "react";
import { ChatBubbleLeftRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

const WHATSAPP_NUMBERS = [
  { label: "Sales & Orders", number: "201115239553" },
  { label: "Support", number: "201124713292" },
];

const QUICK_MESSAGES = [
  { label: "Track my order", text: "Hi, I'd like to track my order" },
  { label: "Delivery info", text: "Hi, I have a question about delivery" },
  { label: "Custom bouquet", text: "Hi, I'd like to order a custom bouquet" },
  { label: "Product inquiry", text: "Hi, I have a question about a product" },
];

export const ChatWidget: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = (number: string, message: string): void => {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-900/50 overflow-hidden animate-slide-up">
          <div className="bg-green-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Chat with Wardity</h3>
                <p className="text-xs text-white/80">Usually replies within minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-white">W</span>
              </div>
              <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  Hi there! How can we help you today? Choose a topic or contact us directly.
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Quick Messages</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {QUICK_MESSAGES.map((msg) => (
                <button
                  key={msg.label}
                  onClick={() => openWhatsApp(WHATSAPP_NUMBERS[0]?.number ?? "", msg.text)}
                  className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-xs font-medium text-gray-700 dark:text-gray-200 hover:border-green-400 hover:text-green-600 transition-colors"
                >
                  {msg.label}
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Contact Us</p>
            <div className="space-y-2">
              {WHATSAPP_NUMBERS.map((wa) => (
                <button
                  key={wa.number}
                  onClick={() => openWhatsApp(wa.number, "Hi, I need help with...")}
                  className="w-full flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors border border-gray-100 dark:border-gray-600"
                >
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{wa.label}</p>
                    <p className="text-xs text-gray-500">+{wa.number.slice(0, 2)} {wa.number.slice(2, 5)} {wa.number.slice(5, 8)} {wa.number.slice(8)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            : "bg-green-500 text-white hover:bg-green-600 hover:scale-110"
        }`}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};
