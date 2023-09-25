'use client';

import EditSettings from './EditSettings';

type Props = {
  data: any;
};

const UserTable: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <div className="flex  flex-col ">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y  bg-lightWhite divide-gray-200">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th scope="col" className="py-3 pl-4">
                      <div className="flex items-center h-5"></div>
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Settings
                    </th>
                  </tr>
                </thead>
                {data?.lenth !== 0 ? (
                  <tbody className="divide-y divide-gray-200 relative">
                    {data.map((user: any) => (
                      <>
                        <tr key={user?.id}>
                          <td className="py-3 pl-4"></td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {user.username}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {user?.email}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            {user?.role === 2
                              ? 'User'
                              : user?.role === 1
                              ? 'Admin'
                              : 'SuperAdmin'}
                          </td>
                          <td className="pr-8 py-6 text-sm font-medium flex justify-end items-end  h-max  text-right whitespace-nowrap ">
                            <div className="absolute z-50 ">
                              <EditSettings id={user?.id} />
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                ) : (
                  <tbody>No users</tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
