'use client';

import { useState } from 'react';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  SunIcon,
  BeakerIcon,
  TruckIcon,
  CurrencyDollarIcon,
  CogIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type NavLinkType = {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavLinkType[];
};

const links: NavLinkType[] = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Production',
    href: '/dashboard/production',
    icon: CogIcon,
    children: [
      { name: 'Orchard', href: '/dashboard/production/orchard', icon: SunIcon },
      { name: 'Cider', href: '/dashboard/production/cider', icon: BeakerIcon },
    ],
  },
  {
    name: 'Management',
    href: '/dashboard/management',
    icon: BeakerIcon,
    children: [
      { name: 'Suppliers', href: '/dashboard/management/suppliers' },
      { name: 'Inventory', href: '/dashboard/management/inventory' },
    ],
  },
  {
    name: 'Sales',
    href: '/dashboard/sales',
    icon: CurrencyDollarIcon,
    children: [
      { name: 'Orders', href: '/dashboard/sales/orders' },
      { name: 'Invoices', href: '/dashboard/sales/invoices' },
    ],
  },
];

function NavLink({ link }: { link: NavLinkType }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const LinkIcon = link.icon;
  const isActive = pathname === link.href;

  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Link
          href={link.href}
          className={clsx(
            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-sky-100 text-blue-600': isActive,
            },
          )}
          onClick={link.children ? toggleSubmenu : undefined}
        >
          {LinkIcon && <LinkIcon className="w-6" />}
          <p className="hidden md:block">{link.name}</p>
          {link.children && (isOpen ? <ChevronUpIcon className="w-5" /> : <ChevronDownIcon className="w-5" />)}
        </Link>
      </div>
      {isOpen && link.children && (
        <div className="ml-4">
          {link.children.map((child) => (
            <NavLink key={child.name} link={child} />
          ))}
        </div>
      )}
    </>
  );
}

export default function NavLinks() {
  return (
    <>
      {links.map((link) => (
        <NavLink key={link.name} link={link} />
      ))}
    </>
  );
}
