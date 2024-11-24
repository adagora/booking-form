import React, { useState } from "react";
import { Input } from "./components/Input";
import { FileUpload } from "./components/FileUpload";
import { Calendar } from "./components/Calendar";
import { TimeSlots } from "./components/TimeSlots";
import { AgeSlider } from "./components/AgeSlider";
import type { FormData, FormErrors, Holiday } from "./types/holidays";
import useQuery from "./hooks/useQuery";
import { API_KEY, TIME_SLOTS } from "./helpers/const";
import { isFormEmpty, validateForm } from "./helpers/validate";
import { InlineIcon } from "@iconify/react/dist/iconify.js";

function App() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        age: 18,
        photo: null,
        date: new Date(),
        time: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [holidayInfo, setHolidayInfo] = useState<Holiday | null>(null);
    console.log('holidayInfo";;', holidayInfo);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const year = formData.date.getFullYear();

    const { data: holidaysData = [], error: holidaysError } = useQuery<
        Holiday[]
    >(`https://api.api-ninjas.com/v1/holidays?country=PL&year=${year}`, {
        headers: {
            "X-Api-Key": API_KEY,
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        const newErrors = validateForm(formData, holidayInfo);
        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);

            try {
                const requestBody = {
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    email: formData.email.trim(),
                    age: formData.age,
                    photo: formData.photo,
                    date: formData.date.toISOString(),
                    time: formData.time,
                };

                const response = await fetch("http://letsworkout.pl/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    throw new Error(
                        errorData?.message ||
                            `Submission failed with status: ${response.status}`
                    );
                }
                setSubmitSuccess(true);

                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    age: 28,
                    photo: null,
                    date: new Date(),
                    time: "",
                });
                setHolidayInfo(null);
                setErrors({});
            } catch (error) {
                setSubmitError(
                    error instanceof Error
                        ? error.message
                        : "An unexpected error occurred. Please try again."
                );
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    const handleInputChange = (field: keyof FormData, value: any) => {
        if (formData[field] !== value) {
            setFormData((prev) => ({ ...prev, [field]: value }));
            if (errors[field]) {
                setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[field];
                    return newErrors;
                });
            }
            setSubmitError(null);
        }
    };

    const isFormEmptyCheck = () => isFormEmpty(formData, holidayInfo);

    return (
        <div className="min-h-screen bg-form p-4 md:p-8">
            <div className="max-w-[426px] mx-auto">
                <form onSubmit={handleSubmit} className="rounded-xl">
                    <div className="p-6 md:p-8 space-y-6">
                        <div>
                            <h1 className="text-2xl text-navy-900 mb-6">
                                Personal info
                            </h1>
                            <div className="space-y-4">
                                <Input
                                    label="First Name"
                                    value={formData.firstName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "firstName",
                                            e.target.value
                                        )
                                    }
                                    onClear={() =>
                                        handleInputChange("firstName", "")
                                    }
                                    error={errors.firstName}
                                    autoFocus
                                    disabled={isSubmitting}
                                />

                                <Input
                                    label="Last Name"
                                    value={formData.lastName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "lastName",
                                            e.target.value
                                        )
                                    }
                                    onClear={() =>
                                        handleInputChange("lastName", "")
                                    }
                                    error={errors.lastName}
                                    disabled={isSubmitting}
                                />

                                <Input
                                    label="Email Address"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    onClear={() =>
                                        handleInputChange("email", "")
                                    }
                                    error={errors.email}
                                    disabled={isSubmitting}
                                />

                                <div className="pb-10">
                                    <AgeSlider
                                        value={formData.age}
                                        onChange={(value) =>
                                            handleInputChange("age", value)
                                        }
                                        error={errors.age}
                                    />
                                </div>

                                <FileUpload
                                    label="Photo"
                                    value={formData.photo}
                                    onChange={(file) =>
                                        handleInputChange("photo", file)
                                    }
                                    error={errors.photo}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl text-navy-900 mb-6">
                                Your workout
                            </h2>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-10/12">
                                    <Calendar
                                        value={formData.date}
                                        onChange={(date) => {
                                            handleInputChange("date", date);
                                            setHolidayInfo(null);
                                        }}
                                        error={
                                            errors.date ||
                                            (holidaysError
                                                ? "holiday information is currently not available"
                                                : "")
                                        }
                                        holidays={holidaysData}
                                        onHolidayInfo={setHolidayInfo}
                                    />
                                    {holidayInfo && (
                                        <div className="mt-3 rounded-lg text-sm text-navy-900 flex items-center gap-2">
                                            <InlineIcon
                                                icon="mingcute:warning-fill"
                                                style={{
                                                    color: "#CBB6E5",
                                                    fontSize: 16,
                                                }}
                                            />
                                            <span>{holidayInfo.name}</span>
                                        </div>
                                    )}
                                    {holidayInfo &&
                                        holidayInfo.type ===
                                            "NATIONAL_HOLIDAY" && (
                                            <div className="mt-3 rounded-lg text-sm text-navy-900 flex items-center gap-2">
                                                <InlineIcon
                                                    icon="mingcute:warning-fill"
                                                    style={{
                                                        color: "#CBB6E5",
                                                        fontSize: 16,
                                                    }}
                                                />
                                                <span>
                                                    Training does not take place
                                                    on national day
                                                </span>
                                            </div>
                                        )}
                                    {formData.date.getDay() === 0 && (
                                        <div className="mt-3 rounded-lg text-sm text-navy-900 flex items-center gap-2">
                                            <InlineIcon
                                                icon="mingcute:warning-fill"
                                                style={{
                                                    color: "#CBB6E5",
                                                    fontSize: 16,
                                                }}
                                            />
                                            <span>
                                                Training does not take place on
                                                sundays
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="md:w-2.5/4/6">
                                    {formData.date.getDay() !== 0 &&
                                        holidayInfo?.type !==
                                            "NATIONAL_HOLIDAY" && (
                                            <TimeSlots
                                                value={formData.time}
                                                onChange={(time) =>
                                                    handleInputChange(
                                                        "time",
                                                        time
                                                    )
                                                }
                                                slots={TIME_SLOTS}
                                                error={errors.time}
                                            />
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 md:px-8 py-4 rounded-b-xl">
                        <button
                            type="submit"
                            disabled={
                                isSubmitting ||
                                isFormEmptyCheck() ||
                                Object.keys(errors).length > 0 ||
                                holidayInfo?.type === "NATIONAL_HOLIDAY" ||
                                formData.date.getDay() === 0
                            }
                            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium
                hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors"
                        >
                            {isSubmitting ? "Sending..." : "Send Application"}
                        </button>

                        {submitError && (
                            <div className="mt-4 mb-4 p-3 bg-red-50 border border-error rounded-lg text-error text-sm">
                                {submitError}
                            </div>
                        )}

                        {submitSuccess && (
                            <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                                <span>Submitted successfully!</span>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;
