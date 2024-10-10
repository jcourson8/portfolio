import React from 'react';
import { getProjectBySlug } from "@/actions/getProjectBySlug";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Project not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <a href="/" className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
            </a>
            <CardTitle>{project.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: project.content_html }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function ProjectPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/6" />
        </CardContent>
      </Card>
    </div>
  );
}