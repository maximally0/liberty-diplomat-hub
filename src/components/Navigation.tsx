import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Menu, User, Trophy, BookOpen, LayoutDashboard, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/browse", label: "Browse MUNs", icon: Search },
    { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { path: "/resources", label: "Resources", icon: BookOpen },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Globe className="h-6 w-6" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              ProjectLiberty
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant={isActive(link.path) ? "secondary" : "ghost"}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/auth">
              <Button variant="ghost" className="gap-2">
                <User className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="gap-2">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant={isActive(link.path) ? "secondary" : "ghost"}
                        className="w-full justify-start gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </Button>
                    </Link>
                  );
                })}
                <div className="pt-4 border-t">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full mb-2">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
