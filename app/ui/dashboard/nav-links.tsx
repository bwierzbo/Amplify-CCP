'use client';

import { useState, useRef, useEffect } from 'react';
import {
  UserGroupIcon,
  HomeIcon,
  SunIcon,
  BeakerIcon,
  TruckIcon,
  CurrencyDollarIcon,
  CogIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClipboardDocumentIcon,
  DocumentTextIcon,
  WrenchIcon,
  ListBulletIcon,
  ScaleIcon,
  Cog6ToothIcon,
  BookOpenIcon,
  BanknotesIcon,
  DocumentCurrencyDollarIcon,

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
    name: 'Orchard',
    href: '/dashboard/orchardmanagement',
    icon: CogIcon,
    children: [
      { name: 'Orchard Management', href: '/dashboard/orchardmanagement/orchardmanagement', icon: ClipboardDocumentIcon},
      { name: 'Apple Varieties', href: '/dashboard/orchardmanagement/applevarieties', icon: SunIcon },
      { name: 'Maintenance', href: '/dashboard/orchardmanagement/maintenance', icon: WrenchIcon},
    ],
  },
  {
    name: 'Production',
    href: '/dashboard/production',
    icon: Cog6ToothIcon,
    children: [
      { name: 'Inventory', href: '/dashboard/production/inventory', icon: ListBulletIcon },
      { name: 'Suppliers', href: '/dashboard/production/suppliers', icon: TruckIcon },
      { name: 'Recipes', href: '/dashboard/production/recipes', icon: BookOpenIcon },
      { name: 'Liquid Tracking', href: '/dashboard/production/liquidtracking', icon: ScaleIcon },
    ],
  },
  {
    name: 'Sales',
    href: '/dashboard/sales',
    icon: CurrencyDollarIcon,
    children: [
      { name: 'Dashboard', href: '/dashboard/sales/dashboard', icon: ClipboardDocumentIcon },
      { name: 'Customers', href: '/dashboard/sales/customers', icon: UserGroupIcon },
      { name: 'Invoices', href: '/dashboard/sales/invoices', icon: DocumentTextIcon },
    ],
  },
  {
    name: 'Reporting',
    href: '/dashboard/reporting',
    icon: DocumentTextIcon,
    children: [
      { name: 'Financial Reports', href: '/dashboard/reporting/financialreports', icon: BanknotesIcon },
    ],
  },
  {
    name: 'Accounting',
    href: '/dashboard/accounting',
    icon: DocumentCurrencyDollarIcon,
    children: [
      { name: 'Taxes', href: '/dashboard/accounting/taxes', icon: DocumentTextIcon },
    ],
  },
];

function NavLink({
  link,
  isOpen,
  onClick,
  onLinkClick,
  activePath,
}: {
  link: NavLinkType;
  isOpen: boolean;
  onClick: () => void;
  onLinkClick: () => void;
  activePath: string;
}) {
  const LinkIcon = link.icon;
  const isActive = activePath === link.href || (link.name !== 'Home' && activePath.startsWith(link.href));
  const childrenRef = useRef<HTMLDivElement>(null);
  const [childrenHeight, setChildrenHeight] = useState(0);

  useEffect(() => {
    if (childrenRef.current) {
      setChildrenHeight(childrenRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="w-full">
      <div
        className="flex items-center justify-between w-full"
        onClick={onClick}
      >
        <Link
          href={link.children ? '#' : link.href}
          className={clsx(
            'flex w-full items-center justify-start gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
            'transition-all duration-300 ease-in-out',
            {
              'bg-sky-100 text-blue-600': isActive,
            }
          )}
          onClick={() => {
            if (!link.children) {
              onLinkClick();
            }
          }}
        >
          {LinkIcon && <LinkIcon className="w-6" />}
          <span className="flex-grow">{link.name}</span>
          {link.children && (
            <ChevronDownIcon
              className={clsx(
                'w-5 transition-transform duration-300 ease-in-out',
                { 'rotate-180': isOpen }
              )}
            />
          )}
        </Link>
      </div>
      {link.children && (
        <div
          ref={childrenRef}
          className="ml-4 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: isOpen ? `${childrenHeight}px` : '0px' }}
        >
          {link.children.map((child) => (
            <NavLink
              key={child.name}
              link={child}
              isOpen={false}
              onClick={() => {}}
              onLinkClick={onLinkClick}
              activePath={activePath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function NavLinks({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  const pathname = usePathname();
  const [openTab, setOpenTab] = useState<string | null>(null);

  const handleToggle = (tabName: string) => {
    setOpenTab((prevOpenTab) => (prevOpenTab === tabName ? null : tabName));
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.name}
          link={link}
          isOpen={openTab === link.name}
          onClick={() => handleToggle(link.name)}
          onLinkClick={handleLinkClick}
          activePath={pathname}
        />
      ))}
    </>
  );
}