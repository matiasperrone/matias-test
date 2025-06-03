import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { UserData, ValidationErrors } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/stores';

const UserEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedUser, isLoading, error, fetchUserById, updateUser, clearSelectedUser, clearError } = useUserStore();

  // Local form state
  const [userData, setUserData] = useState<UserData>({
    id: id ?? 'unknown',
    name: '',
    email: '',
    age: 0,
    bio: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Fetch user data when component mounts or id changes
  useEffect(() => {
    if (id) {
      fetchUserById(id);
    }
  }, [id, fetchUserById]);

  // Update local form state when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      setUserData(selectedUser);
    }
  }, [selectedUser]);

  // Clear selected user and error when component unmounts
  useEffect(() => {
    return () => {
      clearSelectedUser();
      clearError();
    };
  }, [clearSelectedUser, clearError]);

  // Strict null checking - id could be undefined
  if (id === undefined) {
    return (
      <div className="container mx-auto p-6">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <p className="text-destructive">Error: User ID not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (isLoading && !selectedUser) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Edit User Profile</h1>
          <p className="text-muted-foreground">User ID: {id}</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">Loading user...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Edit User Profile</h1>
          <p className="text-muted-foreground">User ID: {id}</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={() => fetchUserById(id)}>Retry</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No user found
  if (!selectedUser) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Edit User Profile</h1>
          <p className="text-muted-foreground">User ID: {id}</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">User not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Form validation function
  const validateForm = (data: UserData): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (data.name.trim().length === 0) {
      newErrors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email.trim().length === 0) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (data.age < 1 || data.age > 120) {
      newErrors.age = 'Age must be between 1 and 120';
    }

    if (data.bio.trim().length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    return newErrors;
  };

  // Handle form input changes
  const handleInputChange = (field: keyof Omit<UserData, 'id'>, value: string | number): void => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[field] !== undefined) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const validationErrors = validateForm(userData);
    setErrors(validationErrors);

    // If there are validation errors, don't submit
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSaving(true);

    try {
      await updateUser(userData);
      console.log('Updated user data:', userData);

      // Navigate back to user profile after successful save
      navigate(`/users/${id}`);
    } catch (error) {
      console.error('Error updating user:', error);
      // Error handling is done in the store, so we don't need to handle it here
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel editing
  const handleCancel = (): void => {
    navigate(`/users/${id}`);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Edit User Profile</h1>
        <p className="text-muted-foreground">User ID: {id}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit User Information</CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={userData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name !== undefined ? 'border-destructive' : ''}
                disabled={isSaving}
              />
              {errors.name !== undefined && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email !== undefined ? 'border-destructive' : ''}
                disabled={isSaving}
              />
              {errors.email !== undefined && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="120"
                value={userData.age}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value, 10) || 0)}
                className={errors.age !== undefined ? 'border-destructive' : ''}
                disabled={isSaving}
              />
              {errors.age !== undefined && (
                <p className="text-sm text-destructive">{errors.age}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                value={userData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical ${
                  errors.bio !== undefined ? 'border-destructive' : ''
                }`}
                disabled={isSaving}
                placeholder="Tell us about yourself..."
              />
              {errors.bio !== undefined && (
                <p className="text-sm text-destructive">{errors.bio}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {userData.bio.length}/500 characters
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSaving}
                className="min-w-[120px]"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6 flex gap-4">
        <Link
          to={`/users/${id}`}
          className="text-primary hover:text-primary/80 underline-offset-4 hover:underline"
        >
          ← Back to User Profile
        </Link>
        <Link
          to="/users"
          className="text-primary hover:text-primary/80 underline-offset-4 hover:underline"
        >
          ← Back to Users
        </Link>
      </div>
    </div>
  );
};

export default UserEdit;
