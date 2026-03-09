import { Hero } from "@/components/Hero";
import { Programs } from "@/components/Programs";
import { Features } from "@/components/Features";
import { Stats } from "@/components/Stats";
import { ChatbotSection } from "@/components/ChatbotSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <Features />
      <Programs />
      <ChatbotSection />
      <Footer />
    </div>
  );
};

export default Index;
