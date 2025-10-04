import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../Redux/Slices/orderSlice";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const AttendancePage = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.orderSlice.userOrders);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!allOrders || allOrders.length === 0) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch]);

  const deliveredOrders = useMemo(() => {
    return allOrders?.filter((order) => order.status === "DELIVERED") || [];
  }, [allOrders]);

  const events = useMemo(() => {
    const groupedByDate = deliveredOrders.reduce((acc, order) => {
      const dateKey = order.date.split("T")[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(order.type);
      return acc;
    }, {});

    return Object.entries(groupedByDate).map(([date, types]) => ({
      id: date,
      start: date,
      display: "block",
      backgroundColor: "transparent",
      borderColor: "transparent",
      extendedProps: { types },
    }));
  }, [deliveredOrders]);

  const renderEventContent = (eventInfo) => {
    const { types } = eventInfo.event.extendedProps;
    return (
      <div className="flex justify-center items-center gap-1 py-1">
        {types.map((type, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              type === "LUNCH" ? "bg-orange-500" : "bg-blue-600"
            } border border-white`}
            style={{ margin: "0 2px" }}
          ></div>
        ))}
      </div>
    );
  };

  const { consumedDays, totalLunch, totalDinner } = useMemo(() => {
    const groupedByDate = deliveredOrders.reduce((acc, o) => {
      const dateKey = o.date.split("T")[0];
      acc[dateKey] = true;
      return acc;
    }, {});

    return {
      consumedDays: Object.keys(groupedByDate).length,
      totalLunch: deliveredOrders.filter((o) => o.type === "LUNCH").length,
      totalDinner: deliveredOrders.filter((o) => o.type === "DINNER").length,
    };
  }, [deliveredOrders]);

  return (
    <div className="px-4 py-4 md:px-6 md:py-6 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Meal Attendance
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 w-full lg:w-1/3 xl:w-1/4">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Summary</h3>
          <div className="grid grid-cols-1 gap-4">
            <SummaryCard title="Total Consumed Days" value={consumedDays} />
            <SummaryCard title="Delivered Lunches" value={totalLunch} />
            <SummaryCard title="Delivered Dinners" value={totalDinner} />
          </div>
          <Legend />
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm flex-1 min-h-[550px]">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: isMobile ? "" : "today",
            }}
            events={events}
            eventContent={renderEventContent}
            height="auto"
            contentHeight="auto"
            aspectRatio={isMobile ? 0.8 : 1.35}
            firstDay={1}
            fixedWeekCount={false}
            dayMaxEventRows={1}
            eventDisplay="block"
            dayHeaderFormat={
              isMobile ? { weekday: "narrow" } : { weekday: "short" }
            }
            eventClassNames={() => [
              "!bg-transparent",
              "border-0",
              "outline-none",
            ]}
            dayCellClassNames={() => ["min-h-[40px]", "sm:min-h-[80px]"]}
          />
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-bold mt-1 text-gray-800">{value}</div>
  </div>
);

const Legend = () => (
  <div className="mt-6 pt-6 border-t border-gray-200">
    <h4 className="text-sm font-medium text-gray-800 mb-3">Legend</h4>
    <div className="flex flex-col sm:flex-row sm:gap-4 space-y-2 sm:space-y-0">
      <div className="flex items-center">
        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
        <span className="ml-2 text-sm text-gray-600">Lunch</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
        <span className="ml-2 text-sm text-gray-600">Dinner</span>
      </div>
    </div>
  </div>
);

export default AttendancePage;
