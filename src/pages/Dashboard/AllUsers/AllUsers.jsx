import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Menu } from "@headlessui/react";
import { FiMoreVertical } from "react-icons/fi";
import { FaCheck, FaUserShield, FaUserEdit, FaBan } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";


const AllUsers = () => {
  const [filter, setFilter] = useState("");
  const axiosSecure = useAxiosSecure()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { data: users = [], refetch,isLoading } = useQuery({
    queryKey: ["users", filter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users?status=${filter}`);
      return res.data.data;
    },
  });

  // for pagination
  const filteredUsers = filter ? users.filter(user => user.status === filter) : users;

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentItems = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // handle status change and update status
  const handleStatusChange = async (id, status) => {
    setCurrentPage(1);
    try {
      await axiosSecure.patch(`/users/${id}/status`, { status });
      refetch();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // handle role changes and update role.
  const handleRoleChange = async (id, role, name) => {
    const result = await Swal.fire({
      title: `Make ${name} an ${role}?`,
      text: "Are you sure you want to change this user's role?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, make ${role}`,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${id}/role`, { role });
        await refetch();

        Swal.fire({
          icon: 'success',
          title: `Success!`,
          text: `${name} is now an ${role}.`,
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Error updating role:", err);
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: 'Could not update user role.',
        });
      }
    }
  };

  return (
    <div className="p-4 text-gray-800">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#E53935]">All Users</h2>
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-1 rounded bg-white"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-[#F5F5F5]">
            <tr className="text-left">
              <th className="p-3">Avatar</th>
              <th className="p-3">Email</th>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <LoadingSpinner></LoadingSpinner>}
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">No donation requests found.</td>
              </tr>
            ) :
              currentItems.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3 capitalize">{user.status}</td>
                  <td className="p-3 text-center z-50">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="text-xl">
                        <FiMoreVertical />
                      </Menu.Button>
                      <Menu.Items className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                        {user.status === "active" ? (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() =>
                                  handleStatusChange(user._id, "blocked")
                                }
                                className={`${active ? "bg-gray-100" : ""
                                  } flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600`}
                              >
                                <FaBan /> Block
                              </button>
                            )}
                          </Menu.Item>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() =>
                                  handleStatusChange(user._id, "active")
                                }
                                className={`${active ? "bg-gray-100" : ""
                                  } flex items-center gap-2 w-full px-4 py-2 text-sm text-green-600`}
                              >
                                <FaCheck /> Unblock
                              </button>
                            )}
                          </Menu.Item>
                        )}

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleRoleChange(user._id, "volunteer", user.name)}
                              className={`${active ? "bg-gray-100" : ""
                                } flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-600`}
                            >
                              <FaUserEdit /> Make Volunteer
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleRoleChange(user._id, "admin", user.name)}
                              className={`${active ? "bg-gray-100" : ""
                                } flex items-center gap-2 w-full px-4 py-2 text-sm text-[#E53935]`}
                            >
                              <FaUserShield /> Make Admin
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border ${currentPage === i + 1 ? 'bg-[#B71C1C] text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
