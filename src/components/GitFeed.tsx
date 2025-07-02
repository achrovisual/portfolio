"use client";

import React, { useState, useEffect } from "react";

interface DailyActivity {
  date: string;
  commitCount: number;
}

const getColorClass = (commitCount: number): string => {
  if (commitCount === 0) return "bg-gray-200"; // No commits
  if (commitCount >= 1 && commitCount <= 3) return "bg-green-200";
  if (commitCount >= 4 && commitCount <= 7) return "bg-green-400";
  if (commitCount >= 8 && commitCount <= 12) return "bg-green-600";
  if (commitCount >= 13) return "bg-green-800";
  return "bg-gray-200";
};

const GitFeed: React.FC = () => {
  const [activityData, setActivityData] = useState<DailyActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const generateActivityData = (): DailyActivity[] => {
      const data: DailyActivity[] = [];
      const today = new Date();
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const commitCount = Math.floor(Math.random() * 15);

        data.push({
          date: date.toISOString().split("T")[0],
          commitCount,
        });
      }
      return data;
    };

    setActivityData(generateActivityData());
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading activity data...</p>
      </div>
    );
  }

  const numColumns = 53;
  const numRows = 7;

  const grid: (DailyActivity | null)[][] = Array.from({ length: numRows }, () =>
    Array.from({ length: numColumns }, () => null)
  );

  activityData.forEach((activity) => {
    const date = new Date(activity.date);
    const dayOfWeek = date.getDay();
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const diffTime = Math.abs(date.getTime() - startOfYear.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const dayIndex = activityData.indexOf(activity);
    const colIndex = Math.floor(dayIndex / numRows);
    const rowIndex = dayIndex % numRows;

    if (colIndex < numColumns && rowIndex < numRows) {
      grid[rowIndex][colIndex] = activity;
    }
  });

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-inter">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        GitHub Activity Feed
      </h1>

      <div className="flex flex-col items-start space-y-2">
        <div className="grid grid-cols-[auto_1fr] gap-1">
          <div className="flex flex-col text-sm text-gray-600 pr-2 pt-2">
            {dayLabels.map((label, index) => (
              <div
                key={label}
                className={`h-4 flex items-center ${
                  index !== 1 && index !== 3 && index !== 5 ? "opacity-0" : ""
                }`}
              >
                {label}
              </div>
            ))}
          </div>

          <div className="flex overflow-x-auto pb-4 scrollbar-hide">
            {Array.from({ length: numColumns }).map((_, colIndex) => (
              <div key={`col-${colIndex}`} className="flex flex-col gap-1 mr-1">
                {Array.from({ length: numRows }).map((_, rowIndex) => {
                  const day = grid[rowIndex][colIndex];
                  const tooltipText = day
                    ? `${day.commitCount} commits on ${day.date}`
                    : "No activity";
                  const colorClass = day
                    ? getColorClass(day.commitCount)
                    : "bg-gray-200";

                  return (
                    <div
                      key={`cell-${rowIndex}-${colIndex}`}
                      className={`relative w-4 h-4 rounded-sm ${colorClass} transition-colors duration-200 group`}
                      title={tooltipText}
                    >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                        {tooltipText}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center space-x-4 text-sm text-gray-700">
        <span>Less</span>
        <div className="flex space-x-1">
          <div className="w-4 h-4 rounded-sm bg-gray-200"></div>
          <div className="w-4 h-4 rounded-sm bg-green-200"></div>
          <div className="w-4 h-4 rounded-sm bg-green-400"></div>
          <div className="w-4 h-4 rounded-sm bg-green-600"></div>
          <div className="w-4 h-4 rounded-sm bg-green-800"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default GitFeed;
