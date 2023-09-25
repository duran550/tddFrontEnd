'use client';

import adminicon from '../../../public/icons/grommet-icons_user-admin.svg';
import usericon from '../../../public/icons/mdi_users.svg';
import menuBtn from '../../../public/icons/menu-btn.svg';

import TsoCards from '../components/TsoCards';
import DisplaySuperAdminForm from '../components/forms/DisplaySuperAdminForm';
import HeaderButtonGroup from '../components/HeaderButtonGroup';
import { ToastContainer } from 'react-toastify';
import { Suspense, useContext, useEffect, useState } from 'react';
import { SuperAdminContext } from '../context/admin.context';
import { getTsoList } from '../actions/get-tsoList';

type Tso = Object[];

const Page = () => {
  const [tsoList, setTsoList] = useState<Tso>([]);
  const { dispatch, state } = useContext(SuperAdminContext);

  useEffect(() => {
    const fetchTsos = async () => {
      const res = await getTsoList();

      setTsoList(res);
      dispatch({ type: 'GET_TSO_LIST', payload: res });
    };

    fetchTsos();

    return () => {
      //
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.refreshData]);

  return (
    <div>
      <DisplaySuperAdminForm />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <HeaderButtonGroup />
      <Suspense>
        <main className="w-fit mx-auto relative px-4 h-fit py-4 mt-32 place-items-center grid ">
          <div className="elements grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 place-items-center  mx-auto gap-5 center w-fit">
            {tsoList?.map((tso: any) => (
              <div
                onClick={() =>
                  dispatch({ type: 'SELECT_TSO', payload: tso?.id })
                }
                key={tso?.id}
              >
                <TsoCards
                  tsoName={tso?.company}
                  tsoLogo={tso?.logo_path}
                  detailsIcon={menuBtn}
                  userCount={
                    tso?.userList?.filter((el: any) => el?.is_actif === true)
                      ?.length
                  }
                  adminIcon={adminicon}
                  userIcon={usericon}
                  link={`/super-admin/${tso?.tsoAbbreviation}`}
                />
              </div>
            ))}
          </div>
        </main>
      </Suspense>
    </div>
  );
};

export default Page;
