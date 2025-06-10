'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Upload, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap,
  Shield,
  Calendar,
  AlertCircle,
  Save
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/protected-route';
import { toast } from 'sonner';

const cadetSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 characters'),
  grade: z.string().min(1, 'Grade is required'),
  unit: z.string().min(1, 'Unit assignment is required'),
  rank: z.string().min(1, 'Initial rank is required'),
  gpa: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0 && num <= 4.0;
  }, 'GPA must be between 0.0 and 4.0'),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(10, 'Emergency contact phone is required'),
  emergencyContactRelation: z.string().min(2, 'Emergency contact relation is required'),
  medicalConditions: z.string().optional(),
  allergies: z.string().optional(),
});

type CadetFormData = z.infer<typeof cadetSchema>;

export default function NewCadetPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<CadetFormData>({
    resolver: zodResolver(cadetSchema),
    defaultValues: {
      rank: 'Cadet Private',
      grade: '9th',
      unit: 'Alpha Company'
    }
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CadetFormData) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('New cadet data:', data);
      toast.success('Cadet profile created successfully!');
      router.push('/cadets');
    } catch (err) {
      setError('Failed to create cadet profile. Please try again.');
      toast.error('Failed to create cadet profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="w-full py-8 text-left">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Add New Cadet</h1>
              <p className="text-slate-600 mt-2">
                Create a comprehensive profile for the new cadet
              </p>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Photo Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Profile Photo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={photoPreview} alt="Cadet photo" />
                    <AvatarFallback className="text-lg bg-slate-100">
                      <User className="h-8 w-8 text-slate-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Label htmlFor="photo-upload" asChild>
                      <Button variant="outline" type="button">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Photo
                      </Button>
                    </Label>
                    <p className="text-sm text-slate-600 mt-2">
                      Recommended: Square image, at least 200x200px
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    disabled={loading}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    disabled={loading}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    placeholder="(555) 123-4567"
                    disabled={loading}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    {...register('address')}
                    disabled={loading}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      {...register('city')}
                      disabled={loading}
                    />
                    {errors.city && (
                      <p className="text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <select
                      id="state"
                      {...register('state')}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    >
                      <option value="">Select State</option>
                      <option value="AL">Alabama</option>
                      <option value="CA">California</option>
                      <option value="FL">Florida</option>
                      <option value="TX">Texas</option>
                      {/* Add more states as needed */}
                    </select>
                    {errors.state && (
                      <p className="text-sm text-red-600">{errors.state.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      {...register('zipCode')}
                      disabled={loading}
                    />
                    {errors.zipCode && (
                      <p className="text-sm text-red-600">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic & Military Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Academic & Military Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level *</Label>
                  <select
                    id="grade"
                    {...register('grade')}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  >
                    <option value="9th">9th Grade</option>
                    <option value="10th">10th Grade</option>
                    <option value="11th">11th Grade</option>
                    <option value="12th">12th Grade</option>
                  </select>
                  {errors.grade && (
                    <p className="text-sm text-red-600">{errors.grade.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gpa">Current GPA *</Label>
                  <Input
                    id="gpa"
                    {...register('gpa')}
                    placeholder="3.5"
                    disabled={loading}
                  />
                  {errors.gpa && (
                    <p className="text-sm text-red-600">{errors.gpa.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit Assignment *</Label>
                  <select
                    id="unit"
                    {...register('unit')}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  >
                    <option value="Alpha Company">Alpha Company</option>
                    <option value="Bravo Company">Bravo Company</option>
                    <option value="Charlie Company">Charlie Company</option>
                    <option value="Delta Company">Delta Company</option>
                  </select>
                  {errors.unit && (
                    <p className="text-sm text-red-600">{errors.unit.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rank">Initial Rank *</Label>
                  <select
                    id="rank"
                    {...register('rank')}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  >
                    <option value="Cadet Private">Cadet Private</option>
                    <option value="Cadet Private First Class">Cadet Private First Class</option>
                    <option value="Cadet Corporal">Cadet Corporal</option>
                    <option value="Cadet Sergeant">Cadet Sergeant</option>
                  </select>
                  {errors.rank && (
                    <p className="text-sm text-red-600">{errors.rank.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Contact Name *</Label>
                  <Input
                    id="emergencyContactName"
                    {...register('emergencyContactName')}
                    disabled={loading}
                  />
                  {errors.emergencyContactName && (
                    <p className="text-sm text-red-600">{errors.emergencyContactName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
                  <Input
                    id="emergencyContactPhone"
                    {...register('emergencyContactPhone')}
                    placeholder="(555) 123-4567"
                    disabled={loading}
                  />
                  {errors.emergencyContactPhone && (
                    <p className="text-sm text-red-600">{errors.emergencyContactPhone.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="emergencyContactRelation">Relationship *</Label>
                  <select
                    id="emergencyContactRelation"
                    {...register('emergencyContactRelation')}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  >
                    <option value="">Select Relationship</option>
                    <option value="Parent">Parent</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Grandparent">Grandparent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.emergencyContactRelation && (
                    <p className="text-sm text-red-600">{errors.emergencyContactRelation.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Medical Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Medical Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicalConditions">Medical Conditions</Label>
                  <textarea
                    id="medicalConditions"
                    {...register('medicalConditions')}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md h-20 resize-none"
                    placeholder="List any medical conditions or medications..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <textarea
                    id="allergies"
                    {...register('allergies')}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md h-20 resize-none"
                    placeholder="List any known allergies..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Profile...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create Cadet Profile
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}