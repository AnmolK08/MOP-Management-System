import React from 'react';

const AttendancePage = () => {
    // Basic calendar logic for demonstration
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
    const consumedDays = [5, 7, 10, 14, 16, 17];
    const upcomingDays = [21];
    
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Meal Attendance</h2>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Calendar */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <button>&larr;</button>
                        <h3 className="text-xl font-semibold">July 2024</h3>
                        <button>&rarr;</button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day} className="font-bold">{day}</div>)}
                        {daysInMonth.map(day => (
                            <div key={day} className={`p-2 rounded-lg ${consumedDays.includes(day) ? 'bg-green-200' : ''} ${upcomingDays.includes(day) ? 'bg-blue-500 text-white' : ''}`}>
                                {day}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Summary for July</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Total Meals Consumed</span>
                            <span className="font-bold">{consumedDays.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Upcoming Meals</span>
                            <span className="font-bold">{upcomingDays.length}</span>
                        </div>
                        <hr className="my-4"/>
                        <div className="space-y-2">
                           <div className="flex items-center"><div className="w-4 h-4 bg-green-200 mr-2"></div> Meal Consumed</div>
                           <div className="flex items-center"><div className="w-4 h-4 bg-blue-500 mr-2"></div> Upcoming Meal</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendancePage;
