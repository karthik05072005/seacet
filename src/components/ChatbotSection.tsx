import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import seacetLogo from "@/assets/seacet-logo.png";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const ChatbotSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to SEACET! 👋 I'm your AI assistant for S.E.A College of Engineering & Technology. I have comprehensive knowledge about our programs, admissions, facilities, placements, faculty, events, and everything else about our college. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message: string) => {
    const userMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const CHAT_URL = `http://localhost:3001/api/chat`;

      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: "Rate Limit",
            description: "Too many requests. Please try again later.",
            variant: "destructive",
          });
          setMessages((prev) => prev.slice(0, -1));
          return;
        }
        if (response.status === 402) {
          toast({
            title: "Service Unavailable",
            description: "AI credits exhausted. Please contact administrator.",
            variant: "destructive",
          });
          setMessages((prev) => prev.slice(0, -1));
          return;
        }
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let assistantMessage = "";
      let assistantIndex = messages.length + 1;

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (let line of lines) {
          line = line.trim();
          if (line.startsWith(":") || !line) continue;
          if (!line.startsWith("data: ")) continue;

          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[assistantIndex] = {
                  role: "assistant",
                  content: assistantMessage,
                };
                return newMessages;
              });
            }
          } catch (e) {
            console.error("Parse error:", e);
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="chatbot" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ask Our <span className="text-[hsl(var(--seacet-red))]">AI Assistant</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get instant answers about admissions, courses, facilities, placements, and more
          </p>
        </div>

        <Card className="max-w-4xl mx-auto h-[600px] flex flex-col shadow-[var(--shadow-elevated)] border-[hsl(var(--seacet-gold))]/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-[hsl(var(--seacet-red))] to-[hsl(var(--seacet-red))]/90 p-6 rounded-t-xl border-b-4 border-[hsl(var(--seacet-gold))]">
            <div className="flex items-center gap-4">
              <img
                src={seacetLogo}
                alt="SEACET Logo"
                className="h-16 w-16 object-contain bg-white rounded-full p-1"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  SEACET AI Assistant
                  <Sparkles className="w-6 h-6 text-[hsl(var(--seacet-gold))]" />
                </h3>
                <p className="text-white/90 text-sm mt-1">
                  Your comprehensive guide to SEACET
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-background to-muted/20">
            {messages.map((message, index) => (
              <ChatMessage key={index} role={message.role} content={message.content} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground p-4">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">SEACET Assistant is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t bg-card">
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </div>
        </Card>
      </div>
    </section>
  );
};
