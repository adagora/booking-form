import React from "react";
import { InlineIcon } from "@iconify/react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    onClear?: () => void;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    className = "",
    onClear,
    ...props
}) => {
    return (
        <div className="mb-4">
            <label className="block text-navy-900 text-sm mb-1">{label}</label>
            <div className="relative">
                <input
                    className={`
            w-full px-3 py-2 rounded-lg transition-colors text-navy-900
            ${
                error
                    ? "border-2 border-error bg-red-50 focus:border-error"
                    : "border border-borderDefault focus:border-purple-600"
            }
            focus:outline-none
            ${className}
          `}
                    {...props}
                />
                {onClear && props.value && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <InlineIcon
                            icon="mingcute:close-circle-fill"
                            style={{ color: "#000853" }}
                        />
                    </button>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-navy-900 flex items-center gap-1">
                    <InlineIcon
                        icon="mingcute:warning-fill"
                        style={{ color: "#ED4545", fontSize: 18 }}
                    />
                    <span>{error}</span>
                </p>
            )}
        </div>
    );
};
