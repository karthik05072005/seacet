const stats = [
  { value: "10+", label: "UG Programs" },
  { value: "3", label: "PG Programs" },
  { value: "5", label: "PhD Specializations" },
  { value: "500+", label: "Placement Offers" },
];

export const Stats = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[hsl(var(--seacet-red))] mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
