interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContentSection({ children, className = '' }: ContentSectionProps) {
  return (
    <section className={`py-12 md:py-16 lg:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}







