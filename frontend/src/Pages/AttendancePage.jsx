import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // default styles

// Example mock orders
const ordersData = {
  "2025-09-12": [{ type: "Lunch" }, { type: "Dinner" }],
  "2025-09-13": [{ type: "Lunch" }],
  "2025-09-14": [{ type: "Dinner" }],
};

const AttendancePage = () => {
  const [date, setDate] = useState(new Date());

  // Helper to check orders for each date
  const getOrderDots = (date) => {
    const dateKey = date.toISOString().split("T")[0];
    const orders = ordersData[dateKey] || [];

    const lunchOrder = orders.find((o) => o.type === "Lunch");
    const dinnerOrder = orders.find((o) => o.type === "Dinner");

    return (
      <div className="flex justify-center gap-1 mt-1">
        {/* Lunch Dot */}
        <span
          className={`w-2 h-2 ${
            lunchOrder ? "bg-green-500" : "bg-gray-100"
          }`}
        ></span>
        {/* Dinner Dot */}
        <span
          className={`w-2 h-2 ${
            dinnerOrder ? "bg-green-500" : "bg-gray-100"
          }`}
        ></span>
      </div>
    );
  };

  // Count totals for summary
  const consumedDays = Object.values(ordersData).filter(
    (orders) => orders.length > 0
  ).length;
  const totalLunch = Object.values(ordersData).filter((orders) =>
    orders.some((o) => o.type === "Lunch")
  ).length;
  const totalDinner = Object.values(ordersData).filter((orders) =>
    orders.some((o) => o.type === "Dinner")
  ).length;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Meal Attendance</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar */}
        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">
            {date.toLocaleString("default", { month: "long" })}{" "}
            {date.getFullYear()}
          </h3>

          <Calendar
            onChange={setDate}
            value={date}
            tileContent={({ date }) => getOrderDots(date)}
            className="w-full border-0"
          />
        </div>

        {/* Summary */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Days with Orders</span>
              <span className="font-bold">{consumedDays}</span>
            </div>
            <div className="flex justify-between">
              <span>Lunch Orders</span>
              <span className="font-bold">{totalLunch}</span>
            </div>
            <div className="flex justify-between">
              <span>Dinner Orders</span>
              <span className="font-bold">{totalDinner}</span>
            </div>
            <hr className="my-4" />
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 mr-2"></div> Order Placed
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-100 mr-2"></div> Order Missing
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
