import { useState, useEffect } from "react";
import braini from "../assets/braini.webp";
import openrouter from "../helper/openRouter";

interface Message {
  content: string;
  role: "user" | "assistant";
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [close, setClose] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(true), 3000);
    return () => clearTimeout(timer);
  }, [close]);

  const closeMess = () => {
    setShowIntro(false);
    setClose(true);
  };

  const handleUserMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const userMessageObj: Message = { content: userMessage, role: "user" };
    const allMessages = [...messages, userMessageObj]; // combine previous + new
    setMessages(allMessages); // update state first
    setUserMessage(""); // clear input
    setIsLoading(true); // show Thinking...

    try {
      console.log("Sending request to OpenRouter...", { messages: allMessages });

      const response = await openrouter.post("/chat/completions", {
        model: "google/gemma-4-26b-a4b-it:free",
        messages: allMessages,
      });

      console.log("Response received:", response.data);

      const botMessage =
        response.data?.choices?.[0]?.message?.content ||
        response.data?.choices?.[0]?.message?.text ||
        "Sorry, I could not get a response. Please consult a doctor.";

      const disclaimer =
        "Please note, the information provided here may not be completely accurate. It is always best to consult a doctor for professional advice.";

      setMessages((prev) => [
        ...prev,
        { content: `${botMessage}\n\n${disclaimer}`, role: "assistant" },
      ]);
    } catch (err) {
  const error: any = err;
  // Log the full error response
  console.error("API ERROR FULL:", error?.response?.data || error?.message || error);
  setMessages((prev) => [
    ...prev,
    { content: "Sorry, something went wrong.", role: "assistant" },
  ]);
}
 finally {
      setIsLoading(false); // hide Thinking...
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Floating Welcome Box */}
      {showIntro && (
        <div className="flex relative">
          <div className="mb-2 max-w-xs bg-white border shadow-lg rounded-lg px-3 py-2 text-sm fade-in">
            🙏 Welcome! I’m Braini, how can I help you today?
          </div>
          <span
            onClick={closeMess}
            className="text-black absolute -top-3 cursor-pointer text-center right-0 text-lg font-bold bg-gray-200 rounded-full w-6 h-6"
          >
            X
          </span>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition cursor-pointer"
      >
        <img src={braini} alt="bot img" className="w-12 h-12" />
      </button>

      {/* Chatbox */}
      {open && (
        <div className="mt-3 min-w-50 max-w-80 bg-white shadow-xl rounded-lg border p-3">
          <div className="font-semibold text-gray-700 mb-2">Braini</div>

          <div className="min-h-40 max-h-88 overflow-y-auto text-sm p-2 bg-gray-50 rounded flex flex-col gap-1">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.role === "user" ? "text-right" : "text-left"}
              >
                <div
                  className={`inline-block p-2 rounded ${
                    msg.role === "user" ? "bg-blue-200" : "bg-gray-200"
                  }`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: msg.content.replace(
                        /Please note[\s\S]*/i,
                        `<span style="color:red;">$&</span>`
                      ),
                    }}
                  ></div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-center text-sm text-gray-500">Thinking...</div>
            )}
          </div>

          <div className="flex items-center mt-2">
            <input
              disabled={isLoading}
              type="text"
              value={userMessage}
              onChange={handleUserMessage}
              className={`w-full border rounded px-2 py-1 text-sm ${isLoading?"bg-opacity-40":""}`}
              placeholder="Ask me about brain tumors..."
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              disabled={isLoading}
              onClick={handleSendMessage}
              className={`ml-2 bg-blue-600 text-white p-2 rounded-full ${isLoading?"bg-gray-400 cursor-not-allowed":"cursor-pointer"}`}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
