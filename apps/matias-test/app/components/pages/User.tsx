import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/stores';

const User: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedUser, isLoading, error, fetchUserById, clearSelectedUser, clearError } = useUserStore();

  // Fetch user data when component mounts or id changes
  useEffect(() => {
    if (id) {
      fetchUserById(id);
    }
  }, [id, fetchUserById]);

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
  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
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
          <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
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
          <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
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

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
        <p className="text-muted-foreground">User ID: {id}</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Profile details for {selectedUser.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Name</Label>
            <p className="text-lg">{selectedUser.name}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Email</Label>
            <p className="text-lg">{selectedUser.email}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Age</Label>
            <p className="text-lg">{selectedUser.age}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Bio</Label>
            <p className="text-lg">{selectedUser.bio}</p>
          </div>
          <div className="pt-4">
            <Link to={`/users/${id}/edit`}>
              <Button>
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex gap-4">
        <Link
          to="/users"
          className="text-primary hover:text-primary/80 underline-offset-4 hover:underline"
        >
          ← Back to Users
        </Link>
        <Link
          to="/"
          className="text-primary hover:text-primary/80 underline-offset-4 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default User;
