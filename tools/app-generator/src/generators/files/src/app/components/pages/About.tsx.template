import React from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">About</CardTitle>
          <CardDescription>Learn more about this React Router v7 application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            This is a modern React application built with React Router v7, TypeScript, and Tailwind CSS.
          </p>
          <p className="text-muted-foreground">
            Features include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Strict TypeScript configuration for enhanced type safety</li>
            <li>React Router v7 for client-side routing</li>
            <li>Tailwind CSS 4.0 for utility-first styling</li>
            <li>Shadcn UI components for consistent design</li>
            <li>Nx monorepo setup for scalable development</li>
            <li>Modern development tools and practices</li>
          </ul>

          <div className="pt-6">
            <Link
              to="/"
              className="text-primary hover:text-primary/80 underline-offset-4 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
