
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Pill,
  ShoppingCart,
  Users,
  PackageCheck,
  Settings,
  LogOut,
  BrainCircuit,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      name: "Medicines",
      path: "/medicines",
      icon: <Pill className="w-5 h-5" />
    },
    {
      name: "Sales",
      path: "/sales",
      icon: <ShoppingCart className="w-5 h-5" />
    },
    {
      name: "Customers",
      path: "/customers",
      icon: <Users className="w-5 h-5" />
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: <PackageCheck className="w-5 h-5" />
    },
    {
      name: "PharmAssist",
      path: "/assist",
      icon: <BrainCircuit/>

    }
  ];

  return (
    <div className="bg-sidebar h-screen flex flex-col text-sidebar-foreground">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="font-bold text-white">PM</span>
          </div>
          <h1 className="text-xl font-bold">PharmaMate</h1>
        </div>
      </div>
      
      <div className="flex-1 py-6">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-sidebar-accent text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="space-y-1">
          {/* <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link> */}
          {/* <button
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
