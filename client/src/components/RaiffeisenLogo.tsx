import { Logotype } from "vienna-ui";

interface RaiffeisenLogoProps {
  className?: string;
}



export default function RaiffeisenLogo({ className = "" }: RaiffeisenLogoProps) {
  return (
    <Logotype 
      className={className}
      locale="ru"
      type="one-line"
      design="light"
    />
  );
}