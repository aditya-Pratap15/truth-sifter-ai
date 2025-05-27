
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-gray-600 leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
