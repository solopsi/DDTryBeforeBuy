import { X } from "lucide-react";

interface RaiffeisenLogoProps {
  className?: string;
}

export default function RaiffeisenLogo({ className = "" }: RaiffeisenLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-primary w-8 h-8 rounded-sm flex items-center justify-center">
        <X className="w-5 h-5 text-primary-foreground" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-foreground">Райффайзен</span>
        <span className="text-xs text-muted-foreground">Банк</span>
      </div>
    </div>
  );
}