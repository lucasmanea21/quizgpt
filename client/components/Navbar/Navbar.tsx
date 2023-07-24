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
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/solid";

const navigation = [
  { name: "Explore", href: "/", icon: MdSearch },
  { name: "Create", href: "/quiz/create", icon: FaPlus },
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
      className="fixed top-0 left-0 right-0 z-50 bg-zinc-950"
    >
      {({ open }) => (
        <>
          <div className="p-3 px-8 mx-auto max-w-7xl sm:px-8 lg:px-20">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/">
                  <h1 className="text-3xl font-bold text-white cursor-pointer">
                    QuizGPT
                  </h1>
                </Link>
              </div>

              {!isMobile && (
                <div className="hidden md:block">
                  <div className="flex items-baseline justify-center ml-10">
                    {navigation.map((item, itemIdx) => (
                      <Link
                        href={item.href}
                        className="flex items-center justify-center px-6 py-2 font-medium text-center text-gray-300 rounded-full text-md hover:bg-zinc-900 hover:text-white"
                        key={itemIdx}
                      >
                        <item.icon
                          className="w-5 h-5 mr-2"
                          aria-hidden="true"
                        />
                        <p>{item.name}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

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
                      <p className="ml-3 text-lg">
                        {user.user_metadata.full_name}
                      </p>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="hidden md:block">
                  <div className="flex items-center ml-4 md:ml-6">
                    <Link href="/auth">
                      <button className="p-1 ml-3 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <p className="text-lg sr-only">Login</p>
                        <FaUser className="w-6 h-6" aria-hidden="true" />
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-7 h-7" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-7 h-7" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="fixed inset-x-0 z-40 flex flex-col items-center justify-start w-full h-full pt-10 origin-top-right transform bg-black md:hidden bg-opacity-90">
            <div className="w-3/4 space-y-4">
              {navigation.map((item, itemIdx) => (
                <Link
                  href={item.href}
                  className="flex flex-row items-center justify-start w-full px-3 py-2 text-xl font-bold text-center text-gray-300 rounded-md hover:bg-zinc-900 hover:text-white"
                  key={itemIdx}
                >
                  <item.icon className="w-6 h-6 mr-5" aria-hidden="true" />
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="absolute flex flex-col items-center w-full pb-6 space-y-2 bottom-[100px]">
              {user ? (
                <div className="flex items-center w-3/4 py-2 space-x-4">
                  <img
                    className="rounded-full w-9 h-9"
                    src={user.user_metadata.avatar_url}
                    alt=""
                  />
                  <Link
                    href="/profile"
                    className="flex items-center text-lg font-bold text-white"
                  >
                    {user.user_metadata.full_name}
                  </Link>
                </div>
              ) : (
                <Link href="/auth" className="w-3/4 ">
                  <button className="w-full py-2 font-bold text-white bg-gray-700 rounded-md focus:outline-none">
                    <p className="text-lg">Login</p>
                  </button>
                </Link>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
