import * as React from "react";

export default function useQuery<T>(url: string, options: RequestInit = {}) {
    const [data, setData] = React.useState<T | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        let ignore = false;

        const handleFetch = async () => {
            setData(null);
            setIsLoading(true);
            setError(null);

            try {
                const res = await fetch(url, options);

                if (ignore) {
                    return;
                }

                if (res.ok === false) {
                    throw new Error(`A network error occurred.`);
                }

                const json = await res.json();

                setData(json);
                setIsLoading(false);
            } catch (e) {
                setError(e.message);
                setIsLoading(false);
            }
        };

        handleFetch();

        return () => {
            ignore = true;
        };
    }, [url]);

    return { data, isLoading, error };
}
