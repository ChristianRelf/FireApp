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
  Filter, 
  Users, 
  Star, 
  Award,
  Calendar,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/protected-route';

// Mock data for cadets
const mockCadets = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rank: 'Cadet Colonel',
    unit: 'Alpha Company',
    grade: '12th',
    gpa: 3.8,
    phone: '(555) 123-4567',
    email: 'sarah.johnson@school.edu',
    address: '123 Main St, Anytown, ST 12345',
    awards: ['Leadership Excellence', 'Academic Achievement', 'Community Service'],
    joinDate: '2021-08-15',
    photo: '',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Michael Chen',
    rank: 'Cadet Major',
    unit: 'Bravo Company',
    grade: '11th',
    gpa: 3.6,
    phone: '(555) 234-5678',
    email: 'michael.chen@school.edu',
    address: '456 Oak Ave, Anytown, ST 12345',
    awards: ['Drill Team Excellence', 'Physical Fitness'],
    joinDate: '2022-08-20',
    photo: '',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    rank: 'Cadet Captain',
    unit: 'Charlie Company',
    grade: '10th',
    gpa: 3.9,
    phone: '(555) 345-6789',
    email: 'emily.rodriguez@school.edu',
    address: '789 Pine St, Anytown, ST 12345',
    awards: ['Honor Guard', 'Academic Excellence'],
    joinDate: '2023-08-18',
    photo: '',
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Thompson',
    rank: 'Cadet Lieutenant',
    unit: 'Alpha Company',
    grade: '9th',
    gpa: 3.4,
    phone: '(555) 456-7890',
    email: 'david.thompson@school.edu',
    address: '321 Elm St, Anytown, ST 12345',
    awards: ['Marksmanship'],
    joinDate: '2024-08-15',
    photo: '',
    status: 'Active'
  }
];

const rankColors = {
  'Cadet Colonel': 'bg-red-100 text-red-800 border-red-200',
  'Cadet Major': 'bg-orange-100 text-orange-800 border-orange-200',
  'Cadet Captain': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Cadet Lieutenant': 'bg-green-100 text-green-800 border-green-200',
  'Cadet Sergeant': 'bg-blue-100 text-blue-800 border-blue-200',
  'Cadet Corporal': 'bg-purple-100 text-purple-800 border-purple-200',
  'Cadet Private': 'bg-gray-100 text-gray-800 border-gray-200'
};

export default function CadetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('All');

  const filteredCadets = mockCadets.filter(cadet => {
    const matchesSearch = cadet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cadet.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cadet.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUnit = selectedUnit === 'All' || cadet.unit === selectedUnit;
    return matchesSearch && matchesUnit;
  });

  return (
    <ProtectedRoute>
      <div className="w-full py-8 text-left">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Cadet Management</h1>
              <p className="text-slate-600 mt-2">
                Manage cadet profiles, ranks, and performance
              </p>
            </div>
            <Button asChild className="mt-4 sm:mt-0">
              <Link href="/cadets/new">
                <Plus className="mr-2 h-4 w-4" />
                Add New Cadet
              </Link>
            </Button>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search cadets by name, rank, or unit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-md text-sm"
                  >
                    <option value="All">All Units</option>
                    <option value="Alpha Company">Alpha Company</option>
                    <option value="Bravo Company">Bravo Company</option>
                    <option value="Charlie Company">Charlie Company</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Total Cadets</p>
                    <p className="text-2xl font-bold">{mockCadets.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Avg GPA</p>
                    <p className="text-2xl font-bold">3.7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Awards</p>
                    <p className="text-2xl font-bold">47</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Active</p>
                    <p className="text-2xl font-bold">100%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cadets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCadets.map((cadet) => (
              <Card key={cadet.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={cadet.photo} alt={cadet.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {cadet.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{cadet.name}</h3>
                      <Badge className={rankColors[cadet.rank] || 'bg-gray-100 text-gray-800'}>
                        {cadet.rank}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Unit</p>
                      <p className="font-medium">{cadet.unit}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Grade</p>
                      <p className="font-medium">{cadet.grade}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">GPA</p>
                      <p className="font-medium">{cadet.gpa}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Awards</p>
                      <p className="font-medium">{cadet.awards.length}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-slate-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {cadet.phone}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {cadet.email}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {cadet.address}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex gap-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link href={`/cadets/${cadet.id}`}>
                          View Profile
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/cadets/${cadet.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCadets.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No cadets found</h3>
                <p className="text-slate-600 mb-4">
                  Try adjusting your search criteria or add a new cadet.
                </p>
                <Button asChild>
                  <Link href="/cadets/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Cadet
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}