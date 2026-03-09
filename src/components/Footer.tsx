export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[hsl(var(--seacet-red))] to-[hsl(var(--seacet-red))]/90 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-2 text-white text-sm text-center">
          <p>© Copyright 2025. All Rights Reserved.</p>
          <p>
            Designed By :{" "}
            <a
              href="https://candid-halva-3d833a.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--seacet-gold))] hover:underline font-semibold transition-colors"
            >
              Karthik Kashyap K S
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
