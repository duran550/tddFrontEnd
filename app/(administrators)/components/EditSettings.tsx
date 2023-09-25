'use client';
import Image from 'next/image';
import menuBtn from '../../../public/icons/menu-btn.svg';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import deleteIcon from '../../../public/icons/delete.svg';
import editIcon from '../../../public/icons/edit.svg';
import UpdateUserForm from './forms/UpdateUserForm';
import FormCard from './forms/FormCard';
import Modal from '@/components/Modal';
import { SuperAdminContext } from '../context/admin.context';
import ConfirmDelete from './ConfirmDelete';
import { useClickOutside } from '@/app/hooks/useClickOutside';

type Props = {
  id: number;
};

const EditSettings: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(SuperAdminContext);

  // Updating a user
  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  const updateUser = async (id: number) => {
    dispatch({ type: 'SUPER_ADMIN_MODAL_UPDATE_USER', payload: true });
    dispatch({ type: 'UPDATE_USER', payload: id });
    setOpen(!open);
  };

  return (
    <div>
      {state.SuperAdminModalUpdateUser ? (
        <Modal>
          <FormCard>
            <UpdateUserForm id={state?.idToBeUpdated} />
          </FormCard>
        </Modal>
      ) : (
        ''
      )}
      {state.SuperAdminConfirmDeleteModal ? (
        <div>
          <Modal>
            <ConfirmDelete id={1} />
          </Modal>
        </div>
      ) : (
        ''
      )}
      <div ref={domNode}>
        <motion.div
          className="cursor-pointer hover:text-green-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
        >
          <Image src={menuBtn} width={30} height={20} alt="icon" />
        </motion.div>
        {open ? (
          <div className="rounded-md flex flex-col justify-start items-start py-2 px-4  bg-slate-100 shadow-lg">
            <div
              onClick={() => updateUser(id)}
              className="mb-2 flex cursor-pointer hover:text-greenpale   items-center justify-between"
            >
              <Image className="w-3 mr-4 " src={editIcon} alt="Delete icon" />
              <div>Edit</div>
            </div>
            <hr className="bg-black w-full mb-2" />
            <div
              onClick={() => {
                dispatch({ type: 'DELETE', payload: id }),
                  dispatch({
                    type: 'SUPER_ADMIN_MODAL_DELETE_USER',
                    payload: true,
                  });
                setOpen(!open);
              }}
              className="flex cursor-pointer hover:text-red-600 items-baseline justify-between"
            >
              <Image
                className="w-3 mr-4 text-red-600"
                src={deleteIcon}
                alt="Delete icon"
              />
              <div className="pr-4">Delete</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default EditSettings;
