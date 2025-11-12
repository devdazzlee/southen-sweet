interface PageHeroProps {
  title: string;
  description?: string;
  backgroundImage?: string;
}

export default function PageHero({ title, description, backgroundImage }: PageHeroProps) {
    return (
      <div 
        className="relative w-full bg-gradient-to-r from-orange-500 to-orange-600 pt-56 pb-32 md:pt-64 md:pb-40"
        style={backgroundImage ? {
          backgroundImage: `linear-gradient(rgba(232, 90, 45, 0.85), rgba(232, 90, 45, 0.85)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : {}}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 uppercase tracking-wide">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
