import { Heart, Target, Users } from "lucide-react";

export default function FundraisingHero() {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/images/hero.png)" }}
    >
      <div className=" absolute h-full w-full bg-black/40" />
      <div className="relative container mx-auto px-4 py-60">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Fundraising Made Simple
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Turn your passion into impact with our comprehensive fundraising
            platform
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6" />
              <span>Make a Difference</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6" />
              <span>Reach Your Goals</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <span>Build Community</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
