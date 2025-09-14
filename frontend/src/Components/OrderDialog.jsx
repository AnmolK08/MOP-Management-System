import React, { useState, useEffect } from "react";
import { RiCloseLine, RiAddLine, RiSubtractLine } from "react-icons/ri";

const OrderDialog = ({ isOpen, onClose, menu }) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [riceOption, setRiceOption] = useState("Roti only");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const totalSelections = Object.values(selectedItems).reduce(
    (sum, count) => sum + count,
    0
  );
  const REQUIRED_SELECTIONS = 2;

  if (!isOpen) return null;

  const handleItemCount = (item, increment) => {
    setSelectedItems((prev) => {
      const currentCount = prev[item] || 0;
      const newCount = increment
        ? currentCount + 1
        : Math.max(0, currentCount - 1);

      const newItems = { ...prev };
      if (newCount === 0) {
        delete newItems[item];
      } else {
        newItems[item] = newCount;
      }
      return newItems;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderItems = Object.entries(selectedItems).flatMap(([item, count]) =>
      Array(count).fill(item)
    );

    const orderData = {
      items: [...orderItems, riceOption],
      type: menu.type,
    };
    console.log("Order Data:", orderData);
    onClose();
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
      onClick={handleClickOutside}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[calc(100%-2rem)] sm:max-w-sm md:max-w-md relative animate-fadeIn max-h-[calc(100vh-2rem)] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Place Order
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RiCloseLine className="w-6 h-6" />
          </button>
        </div>

        {/* Blue Info Box (fixed, not scrollable) */}
        <div className="bg-blue-50 rounded-lg p-3 sm:p-4 shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-blue-900 text-sm sm:text-base">
              {menu?.type} Menu
            </h3>
            <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
              {totalSelections}/{REQUIRED_SELECTIONS} Selected
            </span>
          </div>
        </div>

        {/* Scrollable Items + Rice Option */}
        <form id="order-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-6">
            {/* Menu Items Selection */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                Select Items (Total 2)
              </h3>
              <div className="space-y-3">
                {menu?.options.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <span className="text-gray-700">{item}</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleItemCount(item, false)}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                        disabled={!selectedItems[item]}
                      >
                        <RiSubtractLine className="w-5 h-5" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {selectedItems[item] || 0}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleItemCount(item, true)}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                        disabled={totalSelections >= REQUIRED_SELECTIONS}
                      >
                        <RiAddLine className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rice Option */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                Select Rice Option
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRiceOption("Roti only")}
                  className={`p-3 rounded-lg text-center transition-colors ${
                    riceOption === "Roti only"
                      ? "bg-blue-50 text-blue-600 border-2 border-blue-500"
                      : "bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100"
                  }`}
                >
                  Roti Only
                </button>
                <button
                  type="button"
                  onClick={() => setRiceOption("Roti and Rice")}
                  className={`p-3 rounded-lg text-center transition-colors ${
                    riceOption === "Roti and Rice"
                      ? "bg-blue-50 text-blue-600 border-2 border-blue-500"
                      : "bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100"
                  }`}
                >
                  Roti and Rice
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Footer (fixed, not scrollable) */}
        <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 p-4 border-t shrink-0 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-100 text-gray-700 text-sm sm:text-base font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="order-form"
            disabled={totalSelections !== REQUIRED_SELECTIONS}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-500 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {totalSelections === REQUIRED_SELECTIONS
              ? "Place Order"
              : `Select ${REQUIRED_SELECTIONS - totalSelections} More`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDialog;
