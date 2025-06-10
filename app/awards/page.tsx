'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Plus, 
  Search, 
  Award, 
  Medal,
  Star,
  Trophy,
  Calendar,
  User,
  Filter
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/protected-route';

// Mock data for awards
const mockAwards = [
  {
    id: 1,
    name: 'Academic Excellence Ribbon',
    type: 'Ribbon',
    category: 'Academic',
    description: 'Awarded for maintaining a GPA of 3.5 or higher',
    criteria: 'GPA ≥ 3.5 for full semester',
    recipients: [
      { name: 'Sarah Johnson', date: '2024-01-15', unit: 'Alpha Company' },
      { name: 'Michael Chen', date: '2024-01-15', unit: 'Bravo Company' },
      { name: 'Emily Rodriguez', date: '2024-01-15', unit: 'Charlie Company' }
    ],
    totalAwarded: 45,
    color: 'blue'
  },
  {
    id: 2,
    name: 'Leadership Excellence Medal',
    type: 'Medal',
    category: 'Leadership',
    description: 'Recognizes outstanding leadership qualities and achievements',
    criteria: 'Demonstrated exceptional leadership in unit activities',
    recipients: [
      { name: 'David Thompson', date: '2024-02-01', unit: 'Alpha Company' },
      { name: 'Jessica Wilson', date: '2024-02-01', unit: 'Bravo Company' }
    ],
    totalAwarded: 12,
    color: 'gold'
  },
  {
    id: 3,
    name: 'Physical Fitness Award',
    type: 'Certificate',
    category: 'Physical Fitness',
    description: 'Awarded for exceptional performance in physical fitness tests',
    criteria: 'Score 90+ on JROTC Physical Fitness Test',
    recipients: [
      { name: 'Robert Garcia', date: '2024-01-20', unit: 'Bravo Company' },
      { name: 'Amanda Martinez', date: '2024-01-20', unit: 'Charlie Company' },
      { name: 'Christopher Lee', date: '2024-01-20', unit: 'Alpha Company' }
    ],
    totalAwarded: 28,
    color: 'green'
  },
  {
    id: 4,
    name: 'Community Service Ribbon',
    type: 'Ribbon',
    category: 'Service',
    description: 'Recognizes significant contribution to community service',
    criteria: '40+ hours of documented community service',
    recipients: [
      { name: 'Ashley Brown', date: '2024-02-10', unit: 'Charlie Company' },
      { name: 'Maria Gonzalez', date: '2024-02-10', unit: 'Honor Guard' }
    ],
    totalAwarded: 33,
    color: 'purple'
  },
  {
    id: 5,
    name: 'Drill Team Excellence Trophy',
    type: 'Trophy',
    category: 'Competition',
    description: 'Awarded to outstanding drill team performers',
    criteria: 'Top performance in regional drill competition',
    recipients: [
      { name: 'James Anderson', date: '2024-03-01', unit: 'Drill Team' }
    ],
    totalAwarded: 8,
    color: 'red'
  }
];

const awardTypeColors = {
  'Ribbon': 'bg-blue-100 text-blue-800 border-blue-200',
  'Medal': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Certificate': 'bg-green-100 text-green-800 border-green-200',
  'Trophy': 'bg-red-100 text-red-800 border-red-200'
};

const categoryColors = {
  'Academic': 'bg-blue-50 text-blue-700',
  'Leadership': 'bg-purple-50 text-purple-700',
  'Physical Fitness': 'bg-green-50 text-green-700',
  'Service': 'bg-orange-50 text-orange-700',
  'Competition': 'bg-red-50 text-red-700'
};

export default function AwardsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const filteredAwards = mockAwards.filter(award => {
    const matchesSearch = award.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         award.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || award.category === selectedCategory;
    const matchesType = selectedType === 'All' || award.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const totalAwards = mockAwards.reduce((sum, award) => sum + award.totalAwarded, 0);
  const recentAwards = mockAwards.flatMap(award => 
    award.recipients.map(recipient => ({
      ...recipient,
      awardName: award.name,
      awardType: award.type
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <ProtectedRoute>
      <div className="w-full py-8 text-left">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Awards & Recognition</h1>
              <p className="text-slate-600 mt-2">
                Manage awards, ribbons, medals, and recognition programs
              </p>
            </div>
            <Button asChild className="mt-4 sm:mt-0">
              <Link href="/awards/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Award
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Award Types</p>
                    <p className="text-2xl font-bold">{mockAwards.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Medal className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Total Awarded</p>
                    <p className="text-2xl font-bold">{totalAwards}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">This Month</p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Trophy className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Recipients</p>
                    <p className="text-2xl font-bold">156</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Awards List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        placeholder="Search awards..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md text-sm"
                      >
                        <option value="All">All Categories</option>
                        <option value="Academic">Academic</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Physical Fitness">Physical Fitness</option>
                        <option value="Service">Service</option>
                        <option value="Competition">Competition</option>
                      </select>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md text-sm"
                      >
                        <option value="All">All Types</option>
                        <option value="Ribbon">Ribbons</option>
                        <option value="Medal">Medals</option>
                        <option value="Certificate">Certificates</option>
                        <option value="Trophy">Trophies</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Awards Grid */}
              <div className="space-y-4">
                {filteredAwards.map((award) => (
                  <Card key={award.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            award.type === 'Medal' ? 'bg-yellow-100' :
                            award.type === 'Trophy' ? 'bg-red-100' :
                            award.type === 'Certificate' ? 'bg-green-100' :
                            'bg-blue-100'
                          }`}>
                            {award.type === 'Medal' ? <Medal className="h-6 w-6 text-yellow-600" /> :
                             award.type === 'Trophy' ? <Trophy className="h-6 w-6 text-red-600" /> :
                             award.type === 'Certificate' ? <Star className="h-6 w-6 text-green-600" /> :
                             <Award className="h-6 w-6 text-blue-600" />}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{award.name}</h3>
                            <div className="flex gap-2 mt-1">
                              <Badge className={awardTypeColors[award.type]}>
                                {award.type}
                              </Badge>
                              <Badge variant="outline" className={categoryColors[award.category]}>
                                {award.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-slate-900">{award.totalAwarded}</p>
                          <p className="text-sm text-slate-600">awarded</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-slate-700 mb-2">{award.description}</p>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-slate-700 mb-1">Criteria:</p>
                          <p className="text-sm text-slate-600">{award.criteria}</p>
                        </div>
                      </div>

                      {award.recipients.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">Recent Recipients:</p>
                          <div className="space-y-2">
                            {award.recipients.slice(0, 3).map((recipient, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                                      {recipient.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-sm">{recipient.name}</p>
                                    <p className="text-xs text-slate-600">{recipient.unit}</p>
                                  </div>
                                </div>
                                <p className="text-xs text-slate-600">
                                  {new Date(recipient.date).toLocaleDateString()}
                                </p>
                              </div>
                            ))}
                            {award.recipients.length > 3 && (
                              <p className="text-xs text-slate-600 text-center">
                                +{award.recipients.length - 3} more recipients
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 pt-4 border-t">
                        <Button asChild size="sm" className="flex-1">
                          <Link href={`/awards/${award.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/awards/${award.id}/present`}>
                            Present Award
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Recent Awards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentAwards.map((award, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                          {award.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{award.name}</p>
                        <p className="text-xs text-slate-600">{award.awardName}</p>
                        <p className="text-xs text-slate-500">{award.unit}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">
                          {award.awardType}
                        </Badge>
                        <p className="text-xs text-slate-600 mt-1">
                          {new Date(award.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button asChild className="w-full justify-start" variant="outline">
                    <Link href="/awards/ceremony">
                      <Trophy className="mr-2 h-4 w-4" />
                      Plan Award Ceremony
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start" variant="outline">
                    <Link href="/awards/recommendations">
                      <Star className="mr-2 h-4 w-4" />
                      Award Recommendations
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start" variant="outline">
                    <Link href="/awards/reports">
                      <Award className="mr-2 h-4 w-4" />
                      Awards Report
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}