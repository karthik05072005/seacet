import { Sparkles, Award, Building2 } from "lucide-react";
import seacetLogo from "@/assets/seacet-logo.png";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToChat = () => {
    document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPrograms = () => {
    document.querySelector('.programs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[hsl(var(--seacet-navy-dark))] via-[hsl(var(--seacet-navy))] to-[hsl(var(--seacet-navy-dark))]">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--seacet-gold)) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo and Title */}
          <div className="animate-fade-in">
            <img 
              src={seacetLogo} 
              alt="SEACET Logo" 
              className="h-48 w-auto mx-auto mb-6 drop-shadow-2xl bg-white p-4 rounded-lg"
            />
          </div>

          {/* Award Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[hsl(var(--seacet-red))] to-[hsl(var(--seacet-red))]/90 rounded-full text-white shadow-[var(--shadow-elevated)] animate-fade-in">
            <Award className="w-5 h-5 text-[hsl(var(--seacet-gold))]" />
            <span className="font-semibold">Best Engineering College in Bangalore - Big Impact 2025 Awards</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              S.E.A COLLEGE OF
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--seacet-gold))] to-yellow-400">
                ENGINEERING & TECHNOLOGY
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              South East Asian Education Trust
            </p>
          </div>

          {/* Accreditation Badges */}
          <div className="flex flex-wrap justify-center gap-4 text-white/90 text-sm md:text-base animate-fade-in">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <Building2 className="w-4 h-4 text-[hsl(var(--seacet-gold))]" />
              <span>NAAC B++ Accredited</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <Building2 className="w-4 h-4 text-[hsl(var(--seacet-gold))]" />
              <span>AICTE Approved</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <Building2 className="w-4 h-4 text-[hsl(var(--seacet-gold))]" />
              <span>VTU Affiliated</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="max-w-3xl text-lg md:text-xl text-white/80 leading-relaxed animate-fade-in">
            Ekta Nagar, A. Krishnappa Circle, Ayyappanagar, Devasandra Main Road,
            <br />
            Virgo Nagar Post, K.R. Puram, Bangalore - 560 049
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button 
              onClick={scrollToChat}
              className="bg-[hsl(var(--seacet-red))] hover:bg-[hsl(var(--seacet-red))]/90 text-white px-8 py-6 text-lg shadow-[var(--shadow-elevated)] border-2 border-[hsl(var(--seacet-gold))]"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Ask SEACET AI Assistant
            </Button>
            <Button 
              onClick={scrollToPrograms}
              className="bg-white text-[hsl(var(--seacet-navy))] hover:bg-white/90 px-8 py-6 text-lg font-semibold shadow-[var(--shadow-elevated)]"
            >
              Explore Programs
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm animate-fade-in">
            <div>
              <span className="font-semibold">Call:</span> +91 7353945999 / 6366453030
            </div>
            <div className="hidden sm:block">|</div>
            <div>
              <span className="font-semibold">Email:</span> seaconference@seaedu.ac.in
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
