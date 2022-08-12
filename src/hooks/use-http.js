import { useCallback, useState } from "react";

// "https://react-http-926be-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json"

const useHttp = (applyDate) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error(response.status);
        }

        const data = await response.json();

        applyDate(data, requestConfig.body);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [applyDate]
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
