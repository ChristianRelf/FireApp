'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Users, Award, Calendar, BookOpen, Target } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-900/20 via-red-900/10 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="text-center relative z-10">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex justify-center">
              <Badge variant="outline" className="px-4 py-2 text-sm border-blue-200 bg-blue-50 text-blue-800">
                <Shield className="mr-2 h-4 w-4" />
                JROTC Personnel Management
              </Badge>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl text-slate-900">
              Excellence in
              <span className="text-blue-600 block"> Leadership Training</span>
            </h1>
            
            <p className="mb-8 text-lg text-slate-600 sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Comprehensive personnel management system for JROTC programs. Track cadets, manage units, 
              monitor progress, and build tomorrow's leaders with precision and care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button asChild size="lg" className="text-lg px-8 bg-blue-600 hover:bg-blue-700">
                  <Link href="/dashboard">
                    Access Command Center
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="text-lg px-8 bg-blue-600 hover:bg-blue-700">
                  <Link href="/signup">
                    Join the Corps
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
              
              <Button asChild variant="outline" size="lg" className="text-lg px-8 border-slate-300 hover:bg-slate-50">
                <Link href="/dashboard">
                  View Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="text-center">
          <div className="mx-auto max-w-2xl mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
              Mission-Critical Features
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Everything you need to manage your JROTC program effectively
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Cadet Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Complete cadet profiles with ranks, achievements, performance tracking, and disciplinary records.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Unit Organization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Organize cadets into companies, platoons, and squads with clear chain of command structure.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Awards & Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Track ribbons, medals, certificates, and achievements with automated award recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Event Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Schedule drills, ceremonies, competitions, and training events with attendance tracking.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Academic Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Link JROTC performance with academic records and graduation requirements tracking.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Comprehensive reporting and analytics for program effectiveness and cadet development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 bg-slate-900 text-white">
        <div className="text-center">
          <div className="mx-auto max-w-2xl mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Building Leaders Since Day One
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Trusted by JROTC programs nationwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-slate-300">Active Cadets</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400 mb-2">25+</div>
              <div className="text-slate-300">JROTC Units</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">1,200+</div>
              <div className="text-slate-300">Awards Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">98%</div>
              <div className="text-slate-300">Graduation Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Lead?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join the ranks of excellence and start managing your JROTC program today
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user && (
                <Button asChild size="lg" className="text-lg px-8 bg-white text-blue-600 hover:bg-slate-100">
                  <Link href="/signup">
                    Enlist Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
              
              <Button asChild variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/dashboard">
                  Explore System
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}