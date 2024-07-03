interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
  
  export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
      <div className="bg-[#333333] rounded-xl p-6 space-y-4 transform hover:scale-105 transition-transform duration-300">
        {icon}
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-[#cccccc]">{description}</p>
      </div>
    );
  }