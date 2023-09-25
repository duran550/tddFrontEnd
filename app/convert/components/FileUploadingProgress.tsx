'use client';

import React, { useEffect, useState } from 'react';

import { useFileContext } from '@/app/hooks/useFileContext';
import { getToken } from '@/app/utils/getToken';
import { Button } from '@/components/Button';
import { notifySuccess } from '@/components/notifications/SuccessNotification';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import LoadingIndicator from './LoadingIndicator';
import UploadPlaceholder from './UploadPlaceholder';

type Props = {
  filename: string;
};

const dropIn = {
  hidden: {
    y: -100,
    zIndex: -1,
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    zIndex: 1,
    transition: {
      duration: 0.2,
      type: 'spring',
      damping: 35,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

const FileUploadingProgress: React.FC<Props> = ({ filename }) => {
  const { dispatch, fileConverted, file } = useFileContext();

  const [loading, setLoading] = useState<boolean>(false);

  console.log('loading', loading);

  useEffect(() => {
    fileConverted ? notifySuccess('Completed successfully') : '';
  }, [fileConverted]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={
          'relatitve p-4 md:p-12   w-full h-72 flex flex-col items-center justify-between border border-dashed border-gray-50 text-white bg-greenpale rounded-md'
        }
      >
        <UploadPlaceholder />
        <div className="w-full ">
          <LoadingIndicator percentage={0} filename={filename} />
        </div>
        <div className="my-8">
          {fileConverted ? (
            ''
          ) : (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({ type: 'CANCEL_CONVERSION', payload: false })
              }
            >
              Cancel
            </Button>
          )}
        </div>
      </motion.div>

      {fileConverted && file ? (
        <motion.div
          className="mt-4"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => dispatch({ type: 'CANCEL_CONVERSION', payload: '' })}
        >
          <Button
            // onClick={() => {
            //   download(
            //     `${BACKEND_URL}/builder?token=${GetCookie()}/`,
            //     `${filename.split('.')[0]}.xml`
            //   );
            // }}
            href={`api/download?filename=${
              filename.split('.')[0]
            }&token=${getToken()}`}
            variant="primary"
          >
            Download
          </Button>
        </motion.div>
      ) : (
        ''
      )}
    </div>
  );
};

export default FileUploadingProgress;
