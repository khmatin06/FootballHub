import { type ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

// // Page layout with page content and navbar
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="pitch-bg min-h-screen">
      <Navbar />
      <main className="page-enter">
        {children}
      </main>
      <footer
        className="mt-16 py-8 text-center border-t"
        style={{ borderColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)' }}
      >
        <div className="text-sm font-semibold">
          FootballHub -- The Best Football App
        </div>
        <div className="text-xs mt-1">Built by Matin Khalilov</div>
      </footer>
    </div>
  );
}
