import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaGamepad,
  FaPlus,
  FaDoorOpen,
  FaTrophy,
} from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const navigation = [
  { name: "Explore", href: "/", icon: MdSearch },
  { name: "Create Quiz", href: "/quiz/create", icon: FaPlus },
  { name: "Leaderboard", href: "/leaderboard", icon: FaTrophy },
];

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const user = useUser();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 760);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 right-0 z-10 bg-black bg-opacity-95"
    >
      {({ open }) => (
        <>
          <div className="p-3 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/">
                  <h1 className="text-3xl font-bold text-white">QuizGPT</h1>
                </Link>

                {!isMobile && (
                  <div className="hidden md:block">
                    <div className="flex items-baseline ml-10 space-x-4">
                      {navigation.map((item, itemIdx) => (
                        <Link
                          href={item.href}
                          className="flex items-center px-3 py-2 text-lg font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                          key={itemIdx}
                        >
                          <item.icon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {user ? (
                <div className="hidden md:block">
                  <div className="flex items-center ml-4 md:ml-6">
                    <Link
                      href="/profile"
                      className="flex items-center text-white"
                    >
                      <img
                        className="rounded-full w-9 h-9"
                        src={user.user_metadata.avatar_url}
                        alt=""
                      />
                      <p className="ml-3 text-md">
                        {user.user_metadata.full_name}
                      </p>
                    </Link>
                    {/* <button className="p-1 ml-3 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Logout</span>
                      <FaDoorOpen className="w-6 h-6" aria-hidden="true" />
                    </button> */}
                  </div>
                </div>
              ) : (
                <div className="hidden md:block">
                  <div className="flex items-center ml-4 md:ml-6">
                    <Link href="/auth">
                      <button className="p-1 ml-3 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <p className="text-lg sr-only">Login</p>
                        <FaUser className="w-6 h-6" aria-hidden="true" />
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="flex -mr-2 md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <Disclosure.Panel className="absolute bottom-0 left-0 z-10 flex flex-col items-start justify-center w-full h-full space-y-4 bg-black md:hidden bg-opacity-90 top-20">
                {navigation.map((item, itemIdx) => (
                  <Link
                    href={item.href}
                    className="block w-full px-3 py-2 text-base font-medium text-center text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                    key={itemIdx}
                  >
                    <item.icon
                      className="w-5 h-5 mx-auto mb-1"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </Disclosure.Panel>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
