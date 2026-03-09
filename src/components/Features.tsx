import { Building, Users, Trophy, Briefcase } from "lucide-react";

const features = [
  {
    icon: Building,
    title: "State-of-the-Art Infrastructure",
    description: "Modern classrooms, labs, library, hostel, sports facilities, and campus-wide Wi-Fi"
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description: "Experienced faculty with research publications, patents, and industry collaboration"
  },
  {
    icon: Trophy,
    title: "Award-Winning Institution",
    description: "Best Engineering College in Bangalore - Big Impact 2025 Awards Winner"
  },
  {
    icon: Briefcase,
    title: "Strong Placement Record",
    description: "15+ recruiting companies with 500+ job offers and comprehensive training programs"
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(var(--seacet-navy-dark))] to-[hsl(var(--seacet-navy))] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-[hsl(var(--seacet-gold))]">SEACET?</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Excellence in education, research, and holistic development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx}
                className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[hsl(var(--seacet-red))] to-[hsl(var(--seacet-gold))] rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
