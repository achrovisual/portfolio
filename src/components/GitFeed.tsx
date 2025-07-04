"use client";

import React, { useState, useEffect, useRef } from "react";

interface GitFeedProps {
  activityData: DailyActivity[];
}

interface DailyActivity {
  date: string;
  commitCount: number;
}

const getColorClass = (commitCount: number): string => {
  if (commitCount === 0) return "bg-neutral-200 dark:bg-neutral-700";
  if (commitCount >= 1 && commitCount <= 3)
    return "bg-green-200 dark:bg-green-700";
  if (commitCount >= 4 && commitCount <= 7)
    return "bg-green-400 dark:bg-green-600";
  if (commitCount >= 8 && commitCount <= 12)
    return "bg-green-600 dark:bg-green-500";
  if (commitCount >= 13) return "bg-green-800 dark:bg-green-400";
  return "bg-neutral-200 dark:bg-neutral-700";
};

const GitFeed: React.FC<GitFeedProps> = ({ activityData }) => {
  const [visibleColumns, setVisibleColumns] = useState(0);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const dayLabelsRef = useRef<HTMLDivElement>(null);

  const cellWidth = 16;
  const columnSpacing = 4;

  const numRows = 7;

  useEffect(() => {
    const updateVisibleColumns = () => {
      if (mainContainerRef.current && dayLabelsRef.current) {
        const totalContainerWidth = mainContainerRef.current.offsetWidth;
        const dayLabelsWidth = dayLabelsRef.current.offsetWidth;
        const widthAvailableForGridCells =
          totalContainerWidth - dayLabelsWidth - columnSpacing;

        const maxColumnsThatFit = Math.floor(
          (widthAvailableForGridCells + columnSpacing) /
            (cellWidth + columnSpacing)
        );

        const totalDataColumns = Math.ceil(activityData.length / numRows);
        setVisibleColumns(Math.min(maxColumnsThatFit, totalDataColumns));

        console.log("--- GitFeed Debug ---");
        console.log(
          "Total GitFeed container width (mainContainerRef):",
          totalContainerWidth
        );
        console.log("Day Labels Column Width:", dayLabelsWidth);
        console.log(
          "Available width for grid cells (calculated):",
          widthAvailableForGridCells
        );
        console.log(
          "Calculated Max Columns That Fit (based on width):",
          maxColumnsThatFit
        );
        console.log(
          "Total Data Columns (based on activityData length):",
          totalDataColumns
        );
        console.log(
          "Final Visible Columns (clamped):",
          Math.min(maxColumnsThatFit, totalDataColumns)
        );
        console.log("--- End GitFeed Debug ---");
      }
    };

    updateVisibleColumns();
    const resizeObserver = new ResizeObserver(() => {
      updateVisibleColumns();
    });
    if (mainContainerRef.current) {
      resizeObserver.observe(mainContainerRef.current);
    }
    return () => {
      if (mainContainerRef.current) {
        resizeObserver.unobserve(mainContainerRef.current);
      }
    };
  }, [activityData]);

  if (!activityData || activityData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-neutral-700 dark:text-neutral-300">
        <p className="text-lg">
          No GitHub activity data available for the last 30 days.
        </p>{" "}
      </div>
    );
  }

  const totalGridColumns = Math.ceil(activityData.length / numRows);
  const grid: (DailyActivity | null)[][] = Array.from({ length: numRows }, () =>
    Array.from({ length: totalGridColumns }, () => null)
  );

  if (activityData.length > 0) {
    const firstDate = new Date(activityData[0].date);
    const firstDayOfWeek = firstDate.getUTCDay();

    activityData.forEach((activity, activityIndex) => {
      const effectiveIndex = firstDayOfWeek + activityIndex;
      const colIndex = Math.floor(effectiveIndex / numRows);
      const rowIndex = effectiveIndex % numRows;

      if (colIndex < grid[0].length && rowIndex < numRows) {
        grid[rowIndex][colIndex] = activity;
      }
    });
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const startColIndex = Math.max(0, totalGridColumns - visibleColumns);

  return (
    <div className="w-full h-full text-neutral-900 dark:text-neutral-100 p-4 flex flex-col items-center justify-between">
      <div
        className="flex flex-col items-start space-y-2 w-full"
        ref={mainContainerRef}
      >
        <div className="grid grid-cols-[auto_1fr] gap-1 w-full justify-center">
          <div
            className="flex flex-col text-sm text-neutral-600 dark:text-neutral-400 pr-2 pt-2"
            ref={dayLabelsRef}
          >
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

          <div className="flex overflow-x-hidden flex-grow justify-center">
            {Array.from({ length: visibleColumns }).map((_, loopColIndex) => {
              const actualColIndex = startColIndex + loopColIndex;

              return (
                <div
                  key={`col-${actualColIndex}`}
                  className="flex flex-col gap-1 mr-1 flex-grow flex-shrink-0"
                >
                  {Array.from({ length: numRows }).map((_, rowIndex) => {
                    const day =
                      grid[rowIndex] && grid[rowIndex][actualColIndex]
                        ? grid[rowIndex][actualColIndex]
                        : null;

                    const tooltipText = day
                      ? `${day.commitCount} commits on ${day.date}`
                      : "No activity";
                    const colorClass = day
                      ? getColorClass(day.commitCount)
                      : "bg-neutral-200 dark:bg-neutral-700";

                    return (
                      <div
                        key={`cell-${rowIndex}-${actualColIndex}`}
                        className={`relative w-4 h-4 rounded-sm ${colorClass} transition-colors duration-200 group`}
                        title={tooltipText}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10 dark:bg-neutral-200 dark:text-neutral-900">
                          {tooltipText}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-sm text-neutral-700 dark:text-neutral-300 mt-4">
        <span>Less</span>
        <div className="flex space-x-1">
          <div className="w-4 h-4 rounded-sm bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="w-4 h-4 rounded-sm bg-green-200 dark:bg-green-700"></div>
          <div className="w-4 h-4 rounded-sm bg-green-400 dark:bg-green-600"></div>
          <div className="w-4 h-4 rounded-sm bg-green-600 dark:bg-green-500"></div>
          <div className="w-4 h-4 rounded-sm bg-green-800 dark:bg-green-400"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default GitFeed;
