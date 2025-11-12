import { Card, CardContent, CardTitle, CardDescription } from "../ui/card";
import { cn } from "@/lib/utils";

// Specialized Card for WhyChooseUs
interface WhyChooseUsCardProps {
    title: string;
    description: string;
    backgroundImage: string;
    overlayOpacity?: string;
    hover?: boolean;
    className?: string;
  }
  
    export default function WhyChooseUsCard({ 
    title, 
    description, 
    backgroundImage, 
    overlayOpacity = "bg-black/40",
    hover = true,
    className 
  }: WhyChooseUsCardProps) {
    return (
      <Card 
        backgroundImage={backgroundImage}
        overlay={true}
        overlayOpacity={overlayOpacity}
        hover={hover}
        className={cn('w-full h-40 sm:h-48 lg:h-52 rounded-2xl sm:rounded-3xl shadow-lg hover:bg-black/70 flex flex-col items-start justify-end', className)}
      >
        <CardContent className="w-full h-full p-4 sm:p-6">
          <CardTitle className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold">{title}</CardTitle>
          <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
        </CardContent>
      </Card>
    );
  };