'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Code, User, Settings, LogOut, Book } from 'lucide-react';
import { isDemoMode } from '@/lib/firebase';

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-[1920px] mx-auto px-8 lg:px-16 xl:px-24">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Your App</span>
            {isDemoMode && (
              <Badge variant="outline" className="ml-2 text-xs">
                Template
              </Badge>
            )}
          </Link>

          <nav className="flex items-center space-x-8 text-sm font-medium">
            <Link 
              href="/" 
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Home
            </Link>
            {user && (
              <Link 
                href="/dashboard" 
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Dashboard
              </Link>
            )}
            <Link 
              href="#" 
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Features
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
            ) : user ? (
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost\" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || user.email} />
                        <AvatarFallback>
                          {user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {user.displayName && (
                          <p className="font-medium">{user.displayName}</p>
                        )}
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                        {isDemoMode && (
                          <Badge variant="secondary" className="text-xs w-fit">
                            Template User
                          </Badge>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <Settings className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Book className="mr-2 h-4 w-4" />
                      Documentation
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}