'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Plus, 
  Shield, 
  Users, 
  Star,
  Award,
  ChevronRight,
  MapPin,
  Calendar
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/protected-route';

// Mock data for units
const mockUnits = [
  {
    id: 1,
    name: 'Alpha Company',
    type: 'Company',
    commander: 'Cadet Colonel Sarah Johnson',
    commanderPhoto: '',
    strength: 62,
    location: 'Building A, Room 101',
    established: '2020-08-15',
    motto: 'First in Excellence',
    awards: ['Honor Unit', 'Drill Excellence', 'Community Service'],
    platoons: [
      { name: '1st Platoon', leader: 'Cadet Major Michael Chen', strength: 31 },
      { name: '2nd Platoon', leader: 'Cadet Major Emily Rodriguez', strength: 31 }
    ]
  },
  {
    id: 2,
    name: 'Bravo Company',
    type: 'Company',
    commander: 'Cadet Colonel David Thompson',
    commanderPhoto: '',
    strength: 58,
    location: 'Building A, Room 102',
    established: '2020-08-15',
    motto: 'Brave and Bold',
    awards: ['Physical Fitness', 'Leadership Excellence'],
    platoons: [
      { name: '1st Platoon', leader: 'Cadet Major Jessica Wilson', strength: 29 },
      { name: '2nd Platoon', leader: 'Cadet Major Robert Garcia', strength: 29 }
    ]
  },
  {
    id: 3,
    name: 'Charlie Company',
    type: 'Company',
    commander: 'Cadet Colonel Amanda Martinez',
    commanderPhoto: '',
    strength: 54,
    location: 'Building A, Room 103',
    established: '2021-08-20',
    motto: 'Courage and Honor',
    awards: ['Academic Achievement', 'Color Guard Excellence'],
    platoons: [
      { name: '1st Platoon', leader: 'Cadet Major Christopher Lee', strength: 27 },
      { name: '2nd Platoon', leader: 'Cadet Major Ashley Brown', strength: 27 }
    ]
  },
  {
    id: 4,
    name: 'Honor Guard',
    type: 'Special Unit',
    commander: 'Cadet Captain Maria Gonzalez',
    commanderPhoto: '',
    strength: 12,
    location: 'Building A, Room 105',
    established: '2020-09-01',
    motto: 'Honor Above All',
    awards: ['Ceremonial Excellence', 'Precision Drill'],
    platoons: []
  },
  {
    id: 5,
    name: 'Drill Team',
    type: 'Special Unit',
    commander: 'Cadet Captain James Anderson',
    commanderPhoto: '',
    strength: 16,
    location: 'Gymnasium',
    established: '2020-09-15',
    motto: 'Precision in Motion',
    awards: ['State Champions', 'Regional Excellence'],
    platoons: []
  }
];

const unitTypeColors = {
  'Company': 'bg-blue-100 text-blue-800 border-blue-200',
  'Special Unit': 'bg-purple-100 text-purple-800 border-purple-200',
  'Battalion': 'bg-red-100 text-red-800 border-red-200'
};

export default function UnitsPage() {
  const [selectedType, setSelectedType] = useState('All');

  const filteredUnits = mockUnits.filter(unit => {
    return selectedType === 'All' || unit.type === selectedType;
  });

  const totalCadets = mockUnits.reduce((sum, unit) => sum + unit.strength, 0);
  const totalAwards = mockUnits.reduce((sum, unit) => sum + unit.awards.length, 0);

  return (
    <ProtectedRoute>
      <div className="w-full py-8 text-left">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Unit Organization</h1>
              <p className="text-slate-600 mt-2">
                Manage company structure and unit assignments
              </p>
            </div>
            <Button asChild className="mt-4 sm:mt-0">
              <Link href="/units/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Unit
              </Link>
            </Button>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Total Units</p>
                    <p className="text-2xl font-bold">{mockUnits.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Total Cadets</p>
                    <p className="text-2xl font-bold">{totalCadets}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Unit Awards</p>
                    <p className="text-2xl font-bold">{totalAwards}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Avg Strength</p>
                    <p className="text-2xl font-bold">{Math.round(totalCadets / mockUnits.length)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Button
                  variant={selectedType === 'All' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('All')}
                >
                  All Units
                </Button>
                <Button
                  variant={selectedType === 'Company' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('Company')}
                >
                  Companies
                </Button>
                <Button
                  variant={selectedType === 'Special Unit' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('Special Unit')}
                >
                  Special Units
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Units Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredUnits.map((unit) => (
              <Card key={unit.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{unit.name}</h3>
                        <Badge className={unitTypeColors[unit.type]}>
                          {unit.type}
                        </Badge>
                      </div>
                    </div>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/units/${unit.id}`}>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="text-center bg-slate-50 rounded-lg p-3 mt-4">
                    <p className="text-sm text-slate-600 mb-1">Unit Motto</p>
                    <p className="font-medium italic">"{unit.motto}"</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Commander Info */}
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={unit.commanderPhoto} alt={unit.commander} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {unit.commander.split(' ').slice(-2).map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-slate-600">Unit Commander</p>
                      <p className="font-medium">{unit.commander}</p>
                    </div>
                  </div>

                  {/* Unit Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Strength</p>
                      <p className="font-medium flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {unit.strength} cadets
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600">Awards</p>
                      <p className="font-medium flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        {unit.awards.length} awards
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600">Location</p>
                      <p className="font-medium flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {unit.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600">Established</p>
                      <p className="font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(unit.established).getFullYear()}
                      </p>
                    </div>
                  </div>

                  {/* Platoons */}
                  {unit.platoons.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Platoons</p>
                      <div className="space-y-2">
                        {unit.platoons.map((platoon, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                            <div>
                              <p className="font-medium text-sm">{platoon.name}</p>
                              <p className="text-xs text-slate-600">{platoon.leader}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {platoon.strength} cadets
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Awards */}
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Recent Awards</p>
                    <div className="flex flex-wrap gap-1">
                      {unit.awards.slice(0, 3).map((award, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {award}
                        </Badge>
                      ))}
                      {unit.awards.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{unit.awards.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/units/${unit.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/units/${unit.id}/edit`}>
                        Edit
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUnits.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No units found</h3>
                <p className="text-slate-600 mb-4">
                  Create your first unit to get started with organization.
                </p>
                <Button asChild>
                  <Link href="/units/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Unit
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