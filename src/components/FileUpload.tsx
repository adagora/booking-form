import React, { useCallback } from "react";
import { InlineIcon } from "@iconify/react";

interface FileUploadProps {
    label: string;
    value?: File | null;
    onChange: (file: File | null) => void;
    error?: string;
    disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
    label,
    value,
    onChange,
    error,
    disabled = false,
}) => {
    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (disabled) return;
            const file = e.dataTransfer.files[0];
            if (file) onChange(file);
        },
        [onChange, disabled]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) onChange(file);
        },
        [onChange]
    );

    return (
        <div className="mb-4">
            <label className="block text-navy-900 text-sm mb-1">{label}</label>
            <div
                className={`
          bg-white border border-borderDefault rounded-lg p-6 text-center
          ${error ? "border-error bg-red-50" : ""}
          ${!value && !disabled ? "hover:border-purple-600" : ""}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          transition-colors
        `}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                {value ? (
                    <div className="flex items-center justify-center bg-white rounded">
                        <span className="text-navy-900 truncate">
                            {value.name}
                        </span>
                        <button
                            type="button"
                            onClick={() => onChange(null)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                            disabled={disabled}
                        >
                            <InlineIcon
                                icon="mingcute:close-circle-fill"
                                style={{ color: "#000853", fontSize: 24 }}
                            />
                        </button>
                    </div>
                ) : (
                    <div className="text-gray-500">
                        <label
                            className={`${
                                disabled
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                            }`}
                        >
                            <span className="text-purple-600 hover:text-purple-700 md:hidden font-light">
                                Upload a file
                            </span>
                            <span className="text-purple-600 hover:text-purple-700 hidden md:inline">
                                <span className="underline font-light">
                                    Upload a file
                                </span>
                                <span className="text-gray-500 no-underline font-light">
                                    {" "}
                                    or drag and drop here
                                </span>
                            </span>
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleChange}
                                accept="image/*"
                                disabled={disabled}
                            />
                        </label>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-navy-900 flex items-center gap-1">
                    <InlineIcon
                        icon="mingcute:warning-fill"
                        style={{ color: "#CBB6E5", fontSize: 16 }}
                    />
                    <span>{error}</span>
                </p>
            )}
        </div>
    );
};
