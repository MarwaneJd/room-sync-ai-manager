
import React from "react";
import { Link } from "react-router-dom";
import { Home, Calendar, Users, LayoutDashboard, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: "Home", icon: <Home className="h-4 w-4 mr-2" />, path: "/" },
    { name: "Rooms", icon: <Users className="h-4 w-4 mr-2" />, path: "/rooms" },
    { name: "Reservations", icon: <Calendar className="h-4 w-4 mr-2" />, path: "/reservations" },
    { name: "Dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-2" />, path: "/dashboard" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 10V7C19 5.9 18.1 5 17 5H14M5 19H8M5 5H8M7 19V5M15 7V5M17 19H14M15 19V17M8 19C8 19 13 16.5 13 12C13 7.5 8 5 8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ml-2 font-bold text-xl text-foreground">MeetRoom</span>
            </Link>
            
            {!isMobile && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="outline" className="flex items-center">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center px-4 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary block"
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="flex items-center px-4 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary block"
            onClick={() => setIsOpen(false)}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
