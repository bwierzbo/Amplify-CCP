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
  ChevronUpIcon,
  ClipboardDocumentIcon,
  DocumentTextIcon,
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
    name: 'Orchard Management',
    href: '/dashboard/orchardmanagement',
    icon: CogIcon,
    children: [
      { name: 'Apple Varieties', href: '/dashboard/orchardmanagement/applevarieties', icon: SunIcon },
      { name: 'Tree Management', href: '/dashboard/orchardmanagement/treemanagement', icon: BeakerIcon },
      { name: 'Havest Management', href: '/dashboard/orchardmanagement/harvestmanagement'},
      { name: 'Maintenance', href: '/dashboard/orchardmanagement/maintenance'},
    ],
  },
  {
    name: 'Production',
    href: '/dashboard/production',
    icon: ClipboardDocumentIcon,
    children: [
      { name: 'Inventory', href: '/dashboard/production/inventory', icon: TruckIcon },
      { name: 'Suppliers', href: '/dashboard/production/suppliers', icon: TruckIcon },
      { name: 'Recipes', href: '/dashboard/production/recipes', icon: TruckIcon },
      { name: 'Liquid Tracking', href: '/dashboard/production/liquidtracking', icon: DocumentDuplicateIcon },
    ],
  },
  {
    name: 'Sales',
    href: '/dashboard/sales',
    icon: CurrencyDollarIcon,
    children: [
      { name: 'Customers', href: '/dashboard/sales/customers', icon: UserGroupIcon },
      { name: 'Invoices', href: '/dashboard/sales/invoices', icon: DocumentTextIcon },
    ],
  },
];

function NavLink({
  link,
  isOpen,
  onClick,
  activePath,
}: {
  link: NavLinkType;
  isOpen: boolean;
  onClick: () => void;
  activePath: string;
}) {
  const LinkIcon = link.icon;
  const isActive = activePath === link.href || (link.name !== 'Home' && activePath.startsWith(link.href));

  return (
    <div className="w-full">
      <div
        className="flex items-center justify-between w-full"
        onClick={link.children ? onClick : undefined}
      >
        <Link
          href={link.href}
          className={clsx(
            'flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-sky-100 text-blue-600': isActive,
            }
          )}
          onClick={() => !link.children && onClick()}
        >
          {LinkIcon && <LinkIcon className="w-6" />}
          <p className="hidden md:block">{link.name}</p>
          {link.children &&
            (isOpen ? <ChevronUpIcon className="w-5" /> : <ChevronDownIcon className="w-5" />)}
        </Link>
      </div>
      {isOpen && link.children && (
        <div className="ml-4">
          {link.children.map((child) => (
            <NavLink
              key={child.name}
              link={child}
              isOpen={activePath.startsWith(child.href)}
              onClick={onClick}
              activePath={activePath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function NavLinks() {
  const pathname = usePathname();
  const [openTab, setOpenTab] = useState<string | null>(null);

  const handleToggle = (tabName: string) => {
    setOpenTab((prevOpenTab) => (prevOpenTab === tabName ? null : tabName));
  };

  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.name}
          link={link}
          isOpen={openTab === link.name || pathname.startsWith(link.href)}
          onClick={() => handleToggle(link.name)}
          activePath={pathname}
        />
      ))}
    </>
  );
}