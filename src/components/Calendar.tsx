import React, { useState, useMemo } from "react";
import { Holiday } from "../types/holidays";
import { InlineIcon } from "@iconify/react/dist/iconify.js";

interface CalendarProps {
    value: Date;
    onChange: (date: Date) => void;
    error?: string;
    holidays: Holiday[] | null;
    onHolidayInfo?: (holiday: Holiday | null) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
    value,
    onChange,
    error,
    holidays,
    onHolidayInfo,
}) => {
    const [currentYear, setCurrentYear] = useState(value.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(value.getMonth());

    const { weeks, monthLabel } = useMemo(() => {
        const monthStart = new Date(currentYear, currentMonth, 1);
        const monthEnd = new Date(currentYear, currentMonth + 1, 0);
        const startDate = new Date(monthStart);
        startDate.setDate(
            1 - (startDate.getDay() === 0 ? 6 : startDate.getDay() - 1)
        );

        const weeksArray: Date[][] = [];
        let currentDate = new Date(startDate);

        while (currentDate <= monthEnd) {
            const week: Date[] = [];
            for (let i = 0; i < 7; i++) {
                week.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            weeksArray.push(week);
        }

        return {
            weeks: weeksArray,
            monthLabel: monthStart.toLocaleString("default", {
                month: "long",
                year: "numeric",
            }),
        };
    }, [currentYear, currentMonth]);

    const isSelected = (date: Date) =>
        date.toDateString() === value.toDateString();

    const isCurrentMonth = (date: Date) =>
        date.getMonth() === currentMonth && date.getFullYear() === currentYear;

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const isDisabled = (date: Date) => {
        const formattedDate = formatDate(date);
        const holiday = holidays?.find((h) => h.date === formattedDate);
        return (
            date.getDay() === 0 ||
            (holiday && holiday.type === "NATIONAL_HOLIDAY")
        );
    };

    const getHolidayInfo = (date: Date) => {
        const formattedDate = formatDate(date);
        return holidays?.find(
            (h) => h.date === formattedDate && h.type === "OBSERVANCE"
        );
    };

    const handleDateClick = (date: Date) => {
        if (!isDisabled(date)) {
            onChange(date);
            const holiday = getHolidayInfo(date);
            if (onHolidayInfo) {
                onHolidayInfo(holiday || null);
            }
        }
    };

    const changeMonth = (delta: number) => {
        const newMonth = currentMonth + delta;
        if (newMonth < 0) {
            setCurrentYear(currentYear - 1);
            setCurrentMonth(11); // December
        } else if (newMonth > 11) {
            setCurrentYear(currentYear + 1);
            setCurrentMonth(0); // January
        } else {
            setCurrentMonth(newMonth);
        }
    };

    return (
        <div>
            <label className="block text-navy-900 text-sm mb-1">Date</label>
            <div
                className={`border border-borderDefault bg-white rounded-lg p-4 ${
                    error ? "border-error bg-red-50" : ""
                }`}
            >
                <div className="flex justify-between items-center mb-4">
                    <button
                        type="button"
                        onClick={() => changeMonth(-1)}
                        className="p-1 hover:bg-gray-100 rounded "
                    >
                        <InlineIcon
                            icon="bxs:left-arrow"
                            style={{ color: "#CBB6E5", fontSize: 16 }}
                        />
                    </button>
                    <span className="font-medium text-navy-900">
                        {monthLabel}
                    </span>
                    <button
                        type="button"
                        onClick={() => changeMonth(1)}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <InlineIcon
                            icon="bxs:right-arrow"
                            style={{ color: "#CBB6E5", fontSize: 16 }}
                        />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                        <div
                            key={day}
                            className="text-center text-navy-900 py-1"
                        >
                            {day}
                        </div>
                    ))}
                    {weeks.map((week, weekIndex) =>
                        week.map((date, dateIndex) => {
                            const disabled = isDisabled(date);
                            return (
                                <button
                                    key={`${weekIndex}-${dateIndex}`}
                                    type="button"
                                    onClick={() => handleDateClick(date)}
                                    className={`
                    w-full p-1 text-sm
                    ${
                        isSelected(date)
                            ? "bg-purple-600 text-white rounded-full"
                            : "rounded-full hover:bg-gray-100"
                    }
                    ${!isCurrentMonth(date) ? "text-gray-300" : ""}
                    ${
                        disabled
                            ? "text-disabled cursor-not-allowed"
                            : "text-navy-900"
                    }
                  `}
                                    disabled={disabled}
                                >
                                    {date.getDate()}
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
            {error && (
                <p className="mt-1 text-sm text-navy-900 flex items-center justify-center gap-1">
                    <InlineIcon
                        icon="mingcute:warning-fill"
                        style={{ color: "#CBB6E5", fontSize: 18 }}
                    />
                    <span>{error}</span>
                </p>
            )}
        </div>
    );
};
