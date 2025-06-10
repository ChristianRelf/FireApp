'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, BarChart3, Users, Database, FileText } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import ProtectedRoute from '@/components/auth/protected-route';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="w-full py-8 text-left">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Header Template */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard Template</h1>
              <p className="text-muted-foreground mt-2">
                Welcome, {user?.displayName || user?.email}
              </p>
            </div>
            <Button asChild className="mt-4 sm:mt-0">
              <Link href="/profile">
                <Settings className="mr-2 h-4 w-4" />
                Profile Settings
              </Link>
            </Button>
          </div>

          {/* Stats Cards Template */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Metric 1</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Replace with your metric
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Metric 2</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Ready</div>
                <p className="text-xs text-muted-foreground">
                  System status
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Metric 3</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Active</div>
                <p className="text-xs text-muted-foreground">
                  Current status
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Action Cards Template */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="mr-2 h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Action 1</p>
                    <p className="text-sm text-muted-foreground">Description of action</p>
                  </div>
                  <Button size="sm">
                    Execute
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Action 2</p>
                    <p className="text-sm text-muted-foreground">Another action description</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Analytics Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Point 1</p>
                    <p className="text-sm text-muted-foreground">Chart or graph placeholder</p>
                  </div>
                  <Badge variant="outline">New</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Point 2</p>
                    <p className="text-sm text-muted-foreground">Another visualization</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Template */}
          <Card>
            <CardHeader>
              <CardTitle>Main Content Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold mb-2">Template Instructions</h3>
                  <p className="text-muted-foreground mb-4">
                    This is a template dashboard. Replace this content with your application's 
                    specific features and functionality. The authentication, routing, and UI 
                    components are already set up for you.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>✅ Authentication:</strong> User management ready</p>
                    <p className="text-sm"><strong>✅ Database:</strong> Firestore integration available</p>
                    <p className="text-sm"><strong>✅ Storage:</strong> File upload system ready</p>
                    <p className="text-sm"><strong>✅ UI:</strong> Complete component library</p>
                    <p className="text-sm"><strong>✅ TypeScript:</strong> Full type safety</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/profile">Edit Profile</Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    Add Feature
                  </Button>
                  <Button variant="outline" size="sm">
                    Customize
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}