import { InlineIcon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface TimeSlotsProps {
    value?: string;
    onChange: (time: string) => void;
    slots: string[];
    error?: string;
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({
    value,
    onChange,
    slots,
    error,
}) => {
    return (
        <div className="h-full">
            <label className="block text-navy-900 text-sm mb-1">Time</label>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 h-[calc(100%-6rem)]">
                {slots.map((time) => (
                    <button
                        key={time}
                        type="button"
                        onClick={() => onChange(time)}
                        className={`
              py-2 px-4 rounded-lg text-sm transition-colors
              ${
                  time === value
                      ? "bg-white border-purple-600 border-2"
                      : "bg-white border-borderDefault border-2 text-navy-900 hover:border-purple-600"
              }
            `}
                    >
                        {time}
                    </button>
                ))}
            </div>
            {error && (
                <p className="mt-1 text-sm text-navy-900 flex items-center gap-1">
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
