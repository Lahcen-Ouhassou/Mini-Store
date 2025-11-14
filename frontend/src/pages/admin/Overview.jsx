import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 500 },
  { name: "Apr", sales: 250 },
  { name: "May", sales: 600 },
];

export default function Overview() {
  return (
    <div className="p-6">
      {/* 📌 Title */}
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* 📊 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-3xl font-semibold mt-2">1,250</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-3xl font-semibold mt-2">350</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-3xl font-semibold mt-2">980</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-semibold mt-2">$45,200</p>
        </div>
      </div>

      {/* 📈 Chart */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📋 Recent Orders */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-3">#1234</td>
              <td className="p-3">John Doe</td>
              <td className="p-3">$120</td>
              <td className="p-3 text-green-600">Delivered</td>
            </tr>

            <tr className="border-b">
              <td className="p-3">#1235</td>
              <td className="p-3">Sarah Smith</td>
              <td className="p-3">$90</td>
              <td className="p-3 text-yellow-500">Pending</td>
            </tr>

            <tr>
              <td className="p-3">#1236</td>
              <td className="p-3">Michael Brown</td>
              <td className="p-3">$250</td>
              <td className="p-3 text-blue-600">Shipped</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
