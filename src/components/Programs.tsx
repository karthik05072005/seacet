import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, FlaskConical } from "lucide-react";

const programs = [
  {
    category: "Undergraduate (UG)",
    icon: GraduationCap,
    programs: [
      "Computer Science and Engineering (CSE)",
      "Information Science and Engineering (ISE)",
      "Electronics and Communication Engineering (ECE)",
      "Mechanical Engineering",
      "Civil Engineering",
      "Artificial Intelligence & Machine Learning (AI&ML)",
      "Artificial Intelligence & Data Science (AI&DS)",
      "CSE (IoT & Cyber Security including Blockchain Technology)",
      "Agricultural Engineering"
    ]
  },
  {
    category: "Postgraduate (PG)",
    icon: BookOpen,
    programs: [
      "M.Tech - VLSI Design",
      "M.Tech - Computer Science and Engineering",
      "MBA - Master of Business Administration"
    ]
  },
  {
    category: "Research (PhD)",
    icon: FlaskConical,
    programs: [
      "Computer Science and Engineering",
      "Mechanical Engineering",
      "Electronics and Communication Engineering",
      "MBA",
      "Chemistry"
    ]
  }
];

export const Programs = () => {
  return (
    <section className="programs-section py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-[hsl(var(--seacet-red))]">Programs</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Quality education across diverse engineering and management disciplines
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((category, idx) => {
            const Icon = category.icon;
            return (
              <Card 
                key={idx}
                className="hover:shadow-[var(--shadow-elevated)] transition-all duration-300 border-[hsl(var(--seacet-gold))]/20"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--seacet-red))] to-[hsl(var(--seacet-red))]/80 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{category.category}</CardTitle>
                  <CardDescription>
                    {category.programs.length} Programs Available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.programs.map((program, pidx) => (
                      <li key={pidx} className="flex items-start gap-2 text-sm">
                        <span className="text-[hsl(var(--seacet-red))] mt-1">•</span>
                        <span>{program}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
