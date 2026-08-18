interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className = "" }: SectionProps) {
  return (
    <section
      className={`h-full w-full snap-start flex items-stretch px-4 md:px-8 ${className}`}
    >
      {children}
    </section>
  );
}
