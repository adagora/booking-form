import React from "react";
import { Info } from "lucide-react";

interface AgeSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    error?: string;
}

export const AgeSlider: React.FC<AgeSliderProps> = ({
    value,
    onChange,
    min = 8,
    max = 100,
    error,
}) => {
    return (
        <div className="mb-4">
            <label className="block text-navy-900 text-sm mb-1">Age</label>
            <div className="relative pt-1">
                <div className="flex justify-between">
                    <span className="text-xs text-navy-900">{min}</span>
                    <span className="text-xs text-navy-900">{max}</span>
                </div>
                <div className="relative h-2">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="
                            absolute
                            top-1/2
                            -translate-y-1/2
                            w-full
                            h-2
                            appearance-none
                            cursor-pointer
                            bg-transparent
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:w-4
                            [&::-webkit-slider-thumb]:h-4
                            [&::-webkit-slider-thumb]:bg-[#761BE4]
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:cursor-pointer
                            [&::-webkit-slider-thumb]:relative
                            [&::-webkit-slider-thumb]:z-20
                            [&::-webkit-slider-thumb]:translate-y-[-5px]
                            [&::-webkit-slider-runnable-track]:w-full
                            [&::-webkit-slider-runnable-track]:h-1
                            [&::-webkit-slider-runnable-track]:bg-[#CBB6E5]
                            [&::-webkit-slider-runnable-track]:rounded-lg
                            [&::-moz-range-thumb]:w-4
                            [&::-moz-range-thumb]:h-4
                            [&::-moz-range-thumb]:bg-[#761BE4]
                            [&::-moz-range-thumb]:border-none
                            [&::-moz-range-thumb]:rounded-full
                            [&::-moz-range-thumb]:cursor-pointer
                            [&::-moz-range-thumb]:translate-y-[-5px]
                            [&::-moz-range-track]:w-full
                            [&::-moz-range-track]:h-2
                            [&::-moz-range-track]:bg-[#CBB6E5]
                            [&::-moz-range-track]:rounded-lg
                            [&::-moz-range-progress]:h-2
                            [&::-moz-range-progress]:bg-[#761BE4]
                            [&::-moz-range-progress]:rounded-lg
                        "
                    />

                    <div
                        className="absolute top-6 transform -translate-x-1/2 px-2 py-1 bg-tooltip text-purple-600 text-sm rounded border border-borderDefault before:content-[''] before:absolute before:left-1/2 before:top-0 before:-translate-x-1/2 before:-translate-y-full before:border-4 before:border-transparent before:border-b-borderDefault"
                        style={{
                            left: `${((value - min) / (max - min)) * 100}%`,
                        }}
                    >
                        {value}
                    </div>
                </div>
            </div>
            {error && (
                <p className="mt-1 text-sm text-navy-900 flex items-center gap-1">
                    <Info size={16} className="text-error" />
                    <span>{error}</span>
                </p>
            )}
        </div>
    );
};
