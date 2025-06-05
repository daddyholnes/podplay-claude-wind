import React, { ReactNode } from 'react';
import { MainNav } from '@/components/ui/MainNav';
import { SettingsMenu } from '@/components/ui/SettingsMenu';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

export function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">PodPlay</h1>
          <MainNav className="mx-6" />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <SettingsMenu />
        </div>
      </div>
      <main className="container mx-auto p-4">
        {title && (
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
