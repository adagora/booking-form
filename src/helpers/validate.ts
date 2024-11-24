import { FormData, Holiday } from "../types/holidays";
import { TIME_SLOTS } from "./const";

export const validateForm = (formData, holidayInfo) => {
    const newErrors: FormErrors = {};

    try {
        if (!formData.firstName?.trim()) {
            newErrors.firstName = "Your name is required";
        } else if (formData.firstName.length < 2) {
            newErrors.firstName = "Name must be at least 2 characters long";
        } else if (formData.firstName.length > 50) {
            newErrors.firstName = "Name must be less than 50 characters";
        }

        if (!formData.lastName?.trim()) {
            newErrors.lastName = "Your last name is required";
        } else if (formData.lastName.length < 2) {
            newErrors.lastName = "Last name must be at least 2 characters long";
        } else if (formData.lastName.length > 50) {
            newErrors.lastName = "Last name must be less than 50 characters";
        }

        // RFC 5322 compliant email regex
        const emailRegex =
            /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

        if (!formData.email?.trim()) {
            newErrors.email = "Email address is required";
        } else if (formData.email.length > 254) {
            newErrors.email = "Email address must be less than 254 characters";
        } else if (!formData.email.includes("@")) {
            newErrors.email =
                "Please use correct formatting. Example: address@email.com";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        } else {
            // Additional validation for common edge cases
            const [localPart, domain] = formData.email.split("@");
            if (localPart.length > 64) {
                newErrors.email =
                    "Local part of email cannot exceed 64 characters";
            } else if (domain.startsWith("-") || domain.endsWith("-")) {
                newErrors.email =
                    "Domain name cannot start or end with a hyphen";
            } else if (domain.includes("..")) {
                newErrors.email = "Domain name cannot contain consecutive dots";
            }
        }

        if (!formData.photo) {
            newErrors.photo = "Photo is required";
        } else if (formData.photo.size > 5 * 1024 * 1024) {
            newErrors.photo = "Photo must be less than 5MB";
        } else if (!formData.photo.type.startsWith("image/")) {
            newErrors.photo = "File must be an image";
        }

        if (!formData.time && !holidayInfo) {
            newErrors.time = "Please select a time slot";
        } else if (formData.time && !TIME_SLOTS.includes(formData.time)) {
            newErrors.time = "Invalid time slot selected";
        }

        if (typeof formData.age !== "number") {
            newErrors.age = "Age must be a number";
        } else if (formData.age < 8 || formData.age > 100) {
            newErrors.age = "Age must be between 8 and 100";
        }

        if (!formData.date) {
            newErrors.date = "Date is required";
        } else if (
            !(formData.date instanceof Date) ||
            isNaN(formData.date.getTime())
        ) {
            newErrors.date = "Invalid date";
        }
    } catch (error) {
        console.error("Validation error:", error);
        newErrors.general = "An error occurred while validating the form";
    }

    return newErrors;
};

export const isFormEmpty = (
    formData: FormData,
    holidayInfo: Holiday | null
): boolean => {
    try {
        return (
            !formData.firstName?.trim() ||
            !formData.lastName?.trim() ||
            !formData.email?.trim() ||
            !formData.photo ||
            (!formData.time && !holidayInfo)
        );
    } catch (error) {
        console.error("Error checking form emptiness:", error);
        return true;
    }
};
