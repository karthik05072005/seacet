import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything about SEACET..."
        disabled={disabled}
        className="min-h-[60px] max-h-[120px] resize-none focus-visible:ring-[hsl(var(--seacet-red))]"
      />
      <Button
        type="submit"
        disabled={disabled || !input.trim()}
        className="bg-[hsl(var(--seacet-red))] hover:bg-[hsl(var(--seacet-red))]/90 h-[60px] px-6"
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
};
