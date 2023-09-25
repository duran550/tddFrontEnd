'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DropdownIcon from '../public/icons/dropdownIcon.svg';
import { notify } from './notifications/WarningNotification';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
import { logout } from '@/context/actions/auth-actions';
import { useRouter } from 'next/navigation';
import { useClickOutside } from '@/app/hooks/useClickOutside';

const NavbarProfile: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { push } = useRouter();
  const { user } = useAuth();

  const [authorization, setAuthorization] = useState<boolean>(false);

  let domNode = useClickOutside(() => {
    setToggle(false);
  });

  useEffect(() => {
    if (user?.role !== 2) {
      setAuthorization(true);
    } else {
      setAuthorization(false);
    }
  }, [user?.role]);

  const handleAuth = () => {
    authorization ? '' : notify('you are not authorized');
  };

  console.log('toggle', toggle);

  return (
    <div ref={domNode}>
      <motion.div
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setToggle((toggle) => !toggle)}
        className="bg-gray-100  p-1 relative ml-4 flex justify-center items-center cursor-pointer rounded-full w-8 h-8"
      >
        <div className="text-md uppercase font-bold pt-1 text-greenpale">
          {user?.tsoAbbreviation?.slice(0, 2)}
        </div>

        <div className="relative">
          <div className=" absolute -right-4">
            <Image className="w-2" src={DropdownIcon} alt="dropdown icon" />
          </div>
          {toggle ? (
            <div className="bg-white shadow-lg z-50 absolute top-6  rounded-lg -right-3 p-4">
              <Link
                href={`${
                  user?.role === 0
                    ? '/super-admin'
                    : user?.role === 1
                    ? '/admin'
                    : '/convert'
                }`}
                className=" hover:text-greenpale"
                onClick={() => handleAuth()}
              >
                Settings
              </Link>
              <div
                onClick={() => {
                  logout(), push('/');
                }}
                className="  mt-2 hover:text-greenpale"
              >
                Logout
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NavbarProfile;
