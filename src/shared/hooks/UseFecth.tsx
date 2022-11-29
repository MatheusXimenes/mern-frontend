import { useEffect, useState } from "react";

enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
}

const headers = {
  "Content-type": "application/json",
};

const options = (verb = HTTP_METHODS.GET, body: string): RequestInit => {
  if (verb === HTTP_METHODS.POST || verb === HTTP_METHODS.PATCH) {
    console.log("here")
    return {
      method: verb,
      headers: headers,
      body: body,
    };
  }

  return {
    method: verb,
  };
};

export function useInitialFetch(url: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    //Constrains
    if (!url || !url.trim()) return;

    //Abort Fetch
    const controller = new AbortController();

    //Fetch Feature
    const fetchFunc = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          signal: controller.signal,
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    };

    // Call to use Async and Wait Structure
    fetchFunc();

    return () => {
      //Cancel Fetch call in case of unmount.
      controller.abort();
    };
  }, [url]);

  return [data, isLoading, error];
}

export function useFetch() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //Abort Fetch
  const controller = new AbortController();

  const executeFetch = async (
    url: string,
    verb: HTTP_METHODS,
    body: string
  ) => {
    //Constrains
    if (!url || !url.trim()) return;

    try {
      setIsLoading(true);
      const response = await fetch(url, {
        ...options(verb, body),
        signal: controller.signal,
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelFetch = () => {
    controller.abort();
  };

  return [data, executeFetch, cancelFetch, isLoading, error];
}
