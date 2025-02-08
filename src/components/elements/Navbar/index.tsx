'use client';
import React, { useState } from 'react';
import { HoveredLink, Menu, MenuItem } from './Menu/index';
import { cn } from '@/lib/utils';
import { useLogout } from '@/hooks/useDogs';

export function NavbarComponent() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { mutate } = useLogout();
  return (
    <div
      className={cn(
        'fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ',
        className
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Favorites">
          <div className="flex flex-col space-y-4 text-sm ">
            <HoveredLink href="/favorites">Favorites</HoveredLink>
            <HoveredLink href="/search">Search</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Logout">
          <div className="flex flex-col space-y-4 text-sm">
            <button
              onClick={async () => {
                mutate();
              }}
            >
              Logout
            </button>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
