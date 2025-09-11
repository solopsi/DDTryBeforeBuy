import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export default function StatusBadge({ status, variant }: StatusBadgeProps) {
  // Map Russian statuses to appropriate variants and colors
  const getStatusConfig = (status: string) => {
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes("активный") || statusLower.includes("в процессе")) {
      return { variant: "default" as const, className: "bg-green-100 text-green-800 hover:bg-green-200" };
    }
    
    if (statusLower.includes("отклонен") || statusLower.includes("заблокирован")) {
      return { variant: "destructive" as const, className: "" };
    }
    
    if (statusLower.includes("ждет") || statusLower.includes("отправлено")) {
      return { variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" };
    }
    
    if (statusLower.includes("зарегистрирован") || statusLower.includes("приглашение")) {
      return { variant: "outline" as const, className: "border-blue-200 text-blue-800" };
    }
    
    return { variant: "secondary" as const, className: "" };
  };

  const config = getStatusConfig(status);
  
  return (
    <Badge 
      variant={variant || config.variant}
      className={config.className}
      data-testid={`badge-${status.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {status}
    </Badge>
  );
}