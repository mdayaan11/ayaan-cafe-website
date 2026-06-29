"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Utensils, Home, Info, Phone, ShoppingCart, Calendar, BookOpen, LogIn, UserCircle, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

// Define the structure for navigation links
interface NavLink {
  name: string;
  href: string;
  icon?: React.ElementType; // Optional icon component from lucide-react
}

// Array of main navigation links
const navLinks: NavLink[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Menu', href: '/menu', icon: Utensils },
  { name: 'About Us', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: Phone },
  { name: 'Order Online', href: '/order', icon: ShoppingCart },
  { name: 'Reservations', href: '/reservations', icon: Calendar },
  { name: 'Blog', href: '/blog', icon: BookOpen },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession(); // Get session data and loading status

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <Link href="/" className="flex items-center space-x-2">
          {/* Assuming a logo image exists in the public folder */}
          <Image src="/logo.png" alt="Ayaan Cafe Logo" width={40} height={40} className="rounded-full" />
          <span className="text-2xl font-bold text-gray-800">Ayaan Cafe</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-gray-600 hover:text-primary-600 transition-colors duration-200 font-medium">
              {link.name}
            </Link>
          ))}

          {/* Authentication Links for Desktop */}
          {status === 'loading' ? (
            <div className="w-20 h-6 bg-gray-200 animate-pulse rounded"></div> // Skeleton loader for auth status
          ) : session?.user ? (
            <> {/* User is logged in */}
              <Link href="/profile" className="text-gray-600 hover:text-primary-600 transition-colors duration-200 font-medium flex items-center space-x-1">
                <UserCircle size={18} />
                <span>{session.user.name || 'Profile'}</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <> {/* User is not logged in */}
              <Link href="/api/auth/signin" className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200 text-sm">
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button and Auth Icon */}
        <div className="md:hidden flex items-center">
          {status === 'loading' ? (
            <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full mr-4"></div>
          ) : session?.user ? (
            <Link href="/profile" className="text-gray-600 hover:text-primary-600 transition-colors duration-200 font-medium mr-4">
              <UserCircle size={24} />
            </Link>
          ) : (
            <Link href="/api/auth/signin" className="text-gray-600 hover:text-primary-600 transition-colors duration-200 font-medium mr-4">
              <LogIn size={24} />
            </Link>
          )}
          <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-primary-600 focus:outline-none">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-[64px] left-0 w-full shadow-lg pb-4 animate-slide-down">
          <div className="flex flex-col space-y-4 px-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={toggleMobileMenu} // Close menu on link click
                className="flex items-center space-x-3 text-lg text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium py-2 border-b border-gray-100 last:border-b-0"
              >
                {link.icon && <link.icon size={20} />} {/* Render icon if available */}
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Mobile Authentication Links */}
            <div className="pt-4 border-t border-gray-100">
              {status === 'loading' ? (
                <div className="w-full h-8 bg-gray-200 animate-pulse rounded"></div>
              ) : session?.user ? (
                <> {/* User is logged in */}
                  <Link
                    href="/profile"
                    onClick={toggleMobileMenu}
                    className="flex items-center space-x-3 text-lg text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium py-2"
                  >
                    <UserCircle size={20} />
                    <span>{session.user.name || 'Profile'}</span>
                  </Link>
                  <button
                    onClick={() => { signOut(); toggleMobileMenu(); }} // Close menu after logout
                    className="w-full text-left flex items-center space-x-3 text-lg text-red-500 hover:text-red-600 transition-colors duration-200 font-medium py-2"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <> {/* User is not logged in */}
                  <Link
                    href="/api/auth/signin"
                    onClick={toggleMobileMenu}
                    className="w-full text-left flex items-center space-x-3 text-lg text-primary-500 hover:text-primary-600 transition-colors duration-200 font-medium py-2"
                  >
                    <LogIn size={20} />
                    <span>Login</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
