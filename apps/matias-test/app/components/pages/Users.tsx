import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useUserStore, useUsers, useUserSearchTerm, useSetSearchTerm, useFilteredUsersCount, useFilteredUsers, useCurrentPage, usePageSize } from '@/stores';

interface UsersProps {
  enablePagination?: boolean;
  defaultPageSize?: number;
}

const Users: React.FC<UsersProps> = ({
  enablePagination = false,
  defaultPageSize = 10
}) => {
  const { isLoading, error, fetchUsers, clearError, setCurrentPage, setPageSize } = useUserStore();
  const users = useUsers();
  const searchTerm = useUserSearchTerm();
  const setSearchTerm = useSetSearchTerm();
  const filteredCount = useFilteredUsersCount();
  const filteredUsers = useFilteredUsers();
  const currentPage = useCurrentPage();
  const pageSize = usePageSize();

  // Calculate pagination data using useMemo to avoid infinite loops
  const paginationData = useMemo(() => {
    // Filter users based on search term
    let filtered = users;
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const totalUsers = filtered.length;
    const totalPages = Math.ceil(totalUsers / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return {
      paginatedUsers: filtered.slice(startIndex, endIndex),
      totalUsers,
      totalPages,
      hasNextPage: endIndex < totalUsers,
      hasPreviousPage: currentPage > 1
    };
  }, [users, searchTerm, currentPage, pageSize]);

  const { paginatedUsers, totalUsers, totalPages, hasNextPage, hasPreviousPage } = paginationData;

  // Choose which users to display based on pagination setting
  const displayUsers = enablePagination ? paginatedUsers : filteredUsers;
  const userCount = enablePagination ? totalUsers : filteredCount;

  // Initialize page size when pagination is enabled
  useEffect(() => {
    if (enablePagination && defaultPageSize) {
      setPageSize(defaultPageSize);
    }
  }, [enablePagination, defaultPageSize, setPageSize]);

  // Fetch users on component mount
  useEffect(() => {
    if (!isLoading && (!Array.isArray(users) || users.length === 0)) {
      fetchUsers();
    }
  }, [isLoading, fetchUsers]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  if (isLoading && users.length === 0) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Users {enablePagination && '(Paginated)'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {enablePagination ? 'Paginated user management' : 'Manage and view all users'}
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">Loading users...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Users {enablePagination && '(Paginated)'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {enablePagination ? 'Paginated user management' : 'Manage and view all users'}
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={() => fetchUsers()}>
                  Try Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Users {enablePagination && '(Paginated)'}
        </h1>
        <p className="text-xl text-muted-foreground">
          {enablePagination ? 'Paginated user management with search' : 'Manage and view all users'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {enablePagination ? `Users (${userCount} total)` : `All Users (${userCount})`}
          </CardTitle>
          <CardDescription>View and manage user profiles{enablePagination && ' with pagination'}</CardDescription>

          {/* Search Input and Page Size Selector */}
          <div className="mt-4 flex gap-4 items-center">
            <Input
              placeholder="Search users by name, email, or bio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />

            {/* Page Size Selector - only show when pagination is enabled */}
            {enablePagination && (
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="px-3 py-2 border rounded-md"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {displayUsers.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">
                {searchTerm ? 'No users found matching your search' : 'No users found'}
              </p>
            </div>
          ) : (
            <>
              {/* Users Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Bio</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>{user.age}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="truncate" title={user.bio}>
                          {user.bio}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Link to={`/users/${user.id}`}>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </Link>
                          <Link to={`/users/${user.id}/edit`}>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination Controls - only show when pagination is enabled */}
              {enablePagination && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalUsers)} of {totalUsers} users
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!hasPreviousPage}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!hasNextPage}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <div className="mt-6">
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

export default Users;
