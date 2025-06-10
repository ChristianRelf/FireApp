'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Award, Calendar, AlertTriangle, TrendingUp, Shield, BookOpen } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import ProtectedRoute from '@/components/auth/protected-route';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="w-full py-8 text-left">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Command Center</h1>
              <p className="text-slate-600 mt-2">
                Welcome back, {user?.displayName || 'Instructor'}
              </p>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <Button asChild>
                <Link href="/cadets/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Cadet
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/profile">
                  <Shield className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-800">Total Cadets</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">247</div>
                <p className="text-xs text-blue-600">
                  +12 from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-800">Active Units</CardTitle>
                <Shield className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">8</div>
                <p className="text-xs text-green-600">
                  Companies & Platoons
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-800">Awards This Month</CardTitle>
                <Award className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-900">34</div>
                <p className="text-xs text-yellow-600">
                  Ribbons & Medals
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-800">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">7</div>
                <p className="text-xs text-purple-600">
                  Next 30 days
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="mr-2 h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/cadets">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Cadets
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/units">
                    <Shield className="mr-2 h-4 w-4" />
                    Unit Organization
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/awards">
                    <Award className="mr-2 h-4 w-4" />
                    Awards & Recognition
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/events">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Events
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/reports">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Reports
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">Cadet Johnson promoted to Sergeant</p>
                      <p className="text-xs text-slate-600">2 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Promotion</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">Alpha Company drill competition scheduled</p>
                      <p className="text-xs text-slate-600">4 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Event</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">15 cadets awarded Academic Excellence Ribbon</p>
                      <p className="text-xs text-slate-600">1 day ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Awards</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">New cadet orientation completed</p>
                      <p className="text-xs text-slate-600">2 days ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Training</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts & Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-800">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Attention Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-orange-900">3 cadets missing PT scores</p>
                    <p className="text-xs text-orange-700">Due by end of week</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-orange-300 text-orange-700">
                    Review
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-orange-900">Uniform inspection overdue</p>
                    <p className="text-xs text-orange-700">Bravo Company</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-orange-300 text-orange-700">
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Program Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cadet Retention Rate</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Academic Performance</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Leadership Development</span>
                    <span className="font-medium">91%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}