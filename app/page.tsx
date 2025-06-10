'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Code, Database, Shield, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section Template */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex justify-center">
              <Badge variant="outline" className="px-3 py-1 text-sm">
                <Code className="mr-2 h-4 w-4" />
                Template Ready
              </Badge>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Your App Name
              <span className="text-primary"> Here</span>
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto">
              Replace this with your app description. This template provides authentication, 
              database, storage, and modern UI components ready for your unique features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button asChild size="lg\" className="text-lg px-8">
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
              
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link href="/dashboard">
                  View Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Template */}
      <section className="py-20 md:py-32">
        <div className="text-center">
          <div className="mx-auto max-w-2xl mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Template Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built-in functionality ready for customization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle>Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Multi-provider auth system with user management and protected routes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Database className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle>Database</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Real-time Firestore integration with CRUD operations and live updates.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle>File Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Secure file uploads with validation and progress tracking.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Code className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle>UI Components</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Complete shadcn/ui library with responsive design system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section Template */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Build?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start customizing this template for your specific needs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user && (
                <Button asChild size="lg\" className="text-lg px-8">
                  <Link href="/signup">
                    Start Building
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
              
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link href="/dashboard">
                  Explore Template
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}