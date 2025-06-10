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
import { Shield, User, Settings, LogOut, Users, Award, Calendar } from 'lucide-react';
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
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="w-full max-w-[1920px] mx-auto px-8 lg:px-16 xl:px-24">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-slate-900">JROTC Command</span>
              {isDemoMode && (
                <Badge variant="outline" className="ml-2 text-xs">
                  Demo
                </Badge>
              )}
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link 
              href="/" 
              className="transition-colors hover:text-blue-600 text-slate-600"
            >
              Home
            </Link>
            {user && (
              <>
                <Link 
                  href="/dashboard" 
                  className="transition-colors hover:text-blue-600 text-slate-600"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/cadets" 
                  className="transition-colors hover:text-blue-600 text-slate-600"
                >
                  Cadets
                </Link>
                <Link 
                  href="/units" 
                  className="transition-colors hover:text-blue-600 text-slate-600"
                >
                  Units
                </Link>
                <Link 
                  href="/awards" 
                  className="transition-colors hover:text-blue-600 text-slate-600"
                >
                  Awards
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
            ) : user ? (
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || user.email} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
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
                        <p className="w-[200px] truncate text-sm text-slate-600">
                          {user.email}
                        </p>
                        {isDemoMode && (
                          <Badge variant="secondary" className="text-xs w-fit">
                            Demo User
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/cadets">
                        <Users className="mr-2 h-4 w-4" />
                        Manage Cadets
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/awards">
                        <Award className="mr-2 h-4 w-4" />
                        Awards System
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/events">
                        <Calendar className="mr-2 h-4 w-4" />
                        Events
                      </Link>
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
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/signup">Join Corps</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}