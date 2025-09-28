import React, { useState } from "react";

const ProviderUsersPage = () => {
  // Dummy user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      paid: true,
      premium: true,
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob@example.com",
      paid: false,
      premium: false,
    },
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      paid: true,
      premium: true,
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob@example.com",
      paid: false,
      premium: false,
    },{
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      paid: true,
      premium: true,
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob@example.com",
      paid: false,
      premium: false,
    },{
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      paid: true,
      premium: true,
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob@example.com",
      paid: false,
      premium: false,
    },{
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      paid: true,
      premium: true,
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob@example.com",
      paid: false,
      premium: false,
    },{
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      paid: true,
      premium: true,
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob@example.com",
      paid: false,
      premium: false,
    },{
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      paid: true,
      premium: true,
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob@example.com",
      paid: false,
      premium: false,
    },{
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      paid: true,
      premium: true,
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob@example.com",
      paid: false,
      premium: false,
    },{
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      paid: true,
      premium: true,
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob@example.com",
      paid: false,
      premium: false,
    },{
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      paid: true,
      premium: true,
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob@example.com",
      paid: false,
      premium: false,
    },
    {
      id: 3,
      name: "Catherine Davis",
      email: "catherine@example.com",
      paid: true,
      premium: false,
    },
    {
      id: 4,
      name: "David Miller",
      email: "david@example.com",
      paid: false,
      premium: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const togglePremium = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, premium: !user.premium } : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "paid" && user.paid) ||
      (filter === "unpaid" && !user.paid) ||
      (filter === "premium" && user.premium) ||
      (filter === "not-premium" && !user.premium);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg flex-grow"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="all">All Users</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Not Paid</option>
          <option value="premium">Premium</option>
          <option value="not-premium">Not Premium</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Payment Status</th>
              <th className="text-left p-3">Premium Status</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      user.paid
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.paid ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      user.premium
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.premium ? "Premium" : "Normal"}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => togglePremium(user.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Toggle Premium
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderUsersPage;
