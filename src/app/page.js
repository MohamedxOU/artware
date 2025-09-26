"use client";
import Home from '../components/home/home';
import { GuestRoute } from '@/components/auth/RouteGuards';

export default function Page() {
  return (
    <GuestRoute>
      <div>
        <Home />
      </div>
    </GuestRoute>
  );
}
