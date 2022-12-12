import { useCallback, useEffect, useRef, useState } from "react";

export interface ErrorResponse {
	message: string, 
  status: number
}

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
}

const headers = {
  "Content-type": "application/json",
};

const options = (method:HTTP_METHODS = HTTP_METHODS.GET, body?: any): RequestInit => {
  
  if (method === HTTP_METHODS.POST || method === HTTP_METHODS.PATCH) {
    const options = {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    };
    return options;
  }

  return {
    method: method,
  };
};

export function useFetch() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const controllers = useRef<AbortController[]>([]);

    //Fetch Feature
    const fetchData = useCallback( 
      async (url: string, method?: HTTP_METHODS, body?: {}) => { 
      
      //Abort Fetch
      const controller = new AbortController();
      controllers.current.push(controller);

      try {
        setIsLoading(true)
        const response = await fetch(url, {
          ...options(method, body),
          signal: controller.signal,
        })
        const result = await response.json();
        if(!response.ok) throw new Error(result.message)
        return result;
      } catch (error) {
        setError((error as ErrorResponse).message)
        return error;
      } finally {
        setIsLoading(false);
      }
      
    }, [])
    
    const clearError = () => {
      setError(null);
    }

    useEffect(() => {
      return () => {
        /* eslint-disable*/
        controllers.current.forEach((controller) => controller.abort());
      }
    }, [])


  return {fetchData, isLoading, error, clearError};
}