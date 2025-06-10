'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, User, Mail, Calendar, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { uploadImage } from '@/lib/storage';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import ProtectedRoute from '@/components/auth/protected-route';
import { toast } from 'sonner';
import { format } from 'date-fns';

const profileSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      email: user?.email || '',
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !auth.currentUser) return;

    setUploadingImage(true);
    setError(null);

    try {
      const uploadResult = await uploadImage(file, user.id);
      
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        photoURL: uploadResult.url,
      });

      // Update Firestore user document
      await updateDoc(doc(db, 'users', user.id), {
        photoURL: uploadResult.url,
        updatedAt: new Date(),
      });

      toast.success('Profile picture updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!user || !auth.currentUser) return;

    setLoading(true);
    setError(null);

    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: data.displayName,
      });

      // Update Firestore user document
      await updateDoc(doc(db, 'users', user.id), {
        displayName: data.displayName,
        updatedAt: new Date(),
      });

      toast.success('Profile updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="w-full py-8 text-left">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Profile Settings</h1>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <User className="mr-2 h-5 w-5" />
                  Profile Picture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || user?.email} />
                    <AvatarFallback className="text-lg">
                      {user?.displayName ? user.displayName[0].toUpperCase() : user?.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <Label htmlFor="avatar-upload" asChild>
                        <Button variant="outline" disabled={uploadingImage}>
                          {uploadingImage ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Upload className="mr-2 h-4 w-4" />
                          )}
                          {uploadingImage ? 'Uploading...' : 'Upload New Picture'}
                        </Button>
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Recommended: Square image, at least 200x200px
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <User className="mr-2 h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      {...register('displayName')}
                      disabled={loading}
                    />
                    {errors.displayName && (
                      <p className="text-sm text-destructive">{errors.displayName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      disabled={true}
                      className="bg-muted"
                    />
                    <p className="text-sm text-muted-foreground">
                      Email address cannot be changed
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Button type="submit" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Email</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{user?.email}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Member since</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {user?.createdAt ? format(user.createdAt, 'MMMM dd, yyyy') : 'Unknown'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}