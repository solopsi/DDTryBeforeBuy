import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from '../AppSidebar';

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar 
          activeItem="/supplies"
          onItemClick={(url) => console.log('Navigation:', url)}
        />
        <div className="flex-1 p-4 bg-background">
          <p>Main content area</p>
        </div>
      </div>
    </SidebarProvider>
  );
}