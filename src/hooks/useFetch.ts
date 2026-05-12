import { useEffect, useState } from "react";
import api from "@/APis/Axios";
import { AxiosError } from "axios";

interface UseFetchReturn<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
}

const useFetch = <T>(endpoint: string): UseFetchReturn<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!endpoint) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await api.get(endpoint);

                setData(res.data.data);
            } catch (err) {
                const error = err as AxiosError;

                setError(error.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, error, loading };
};

export default useFetch;