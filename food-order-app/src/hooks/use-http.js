import { useState, useCallback } from "react";

const useHtpp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(async (reqConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(reqConfig.url, {
        method: reqConfig.method || "GET",
        headers: reqConfig.headers || {},
        body: JSON.stringify(reqConfig.body) || null,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      applyData(data);
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHtpp;
