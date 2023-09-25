'use client';
import { useContext, useEffect } from 'react';
import AdmingIcon from '../../../../public/icons/admin_panel_settings.svg';
import settingIcon from '../../../../public/icons/settings_suggest.svg';
import userIcon from '../../../../public/icons/users.svg';
import SuperAdminCardSettings from '../../components/SuperAdminCardSettings';
import { redirect, usePathname } from 'next/navigation';
import { getTSOById } from '../../actions/get-tsoById';
import { SuperAdminContext } from '../../context/admin.context';
import { useAuth } from '@/app/hooks/useAuth';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';

const Page = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [getCurrentTSO, setCurrentTSO, clearCurrentTSO] =
    useLocalStorage('currentTso');

  const { state, dispatch } = useContext(SuperAdminContext);

  useEffect(() => {
    console.log('selected tso', state.selectedIdTSO);

    if (user?.role !== 0 && !user.token) {
      redirect('/');
    }
    if (state?.selectedIdTSO) {
      const fetchCurrentTSO = async (id: number) => {
        const res = await getTSOById(id);
        setCurrentTSO(res?.companie);
        return dispatch({ type: 'GET_CURRENT_TSO', payload: res?.companie });
      };

      fetchCurrentTSO(state?.selectedIdTSO);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.selectedIdTSO]);
  let currentTso = getCurrentTSO();
  return (
    <>
      <main className="container lg:max-w-7xl mx-auto px-4 mt-32 space-y-40">
        {/* Company logo placeholder */}
        <div className="flex justify-center items-center">
          <div className="font-bold text-4xl">{currentTso?.company}</div>
        </div>

        {/* Company logo placeholder */}

        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-5 ">
          <SuperAdminCardSettings
            icon={userIcon}
            title="Users"
            description="The user menu lets you manage of all the simple users, their privileges don't allow them to modify anything in the settings"
            link={`${pathname}/users`}
          />

          <SuperAdminCardSettings
            icon={AdmingIcon}
            title="Admin"
            description="The user menu lets you manage of all the admin users, their privileges allow them to manage users and the config file"
            link={`${pathname}/admin`}
          />

          <SuperAdminCardSettings
            icon={settingIcon}
            title="settings"
            description="The security dashboard lets you view the health of your security settings"
            link={`${pathname}/settings/profile`}
          />
        </div>
      </main>
    </>
  );
};

export default Page;
