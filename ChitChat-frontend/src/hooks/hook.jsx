import {  useEffect, useState } from "react";
import { toast } from "react-hot-toast";


      








const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error }) => {
      if (isError && error) {
        console.log("Error caught in useErrors: ", error);
        let message = "Your id is not valid";

        if (typeof error?.data?.message === "string") {
          message = error.data.message;

          // Check if message mentions file size error
          if (message.toLowerCase().includes("file too large") || message.toLowerCase().includes("size")) {
            message = "Image size is too large. Please upload a smaller image.";
          }
        }

        toast.error(message);
      }
    });
  }, [errors]);
};



const useAsyncMutation = (mutationHook) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [mutate] = mutationHook();

  const executeMutation = async (toastMessage = "Updating data...", ...args) => {
  setIsLoading(true);

  let safeToastMsg = "Updating data...";
  if (typeof toastMessage === "string") {
    safeToastMsg = toastMessage;
  } else {
    try {
      safeToastMsg = JSON.stringify(toastMessage);
    } catch {
      safeToastMsg = "Updating data...";
    }
  }

  const toastId = toast.loading(safeToastMsg);

  try {
    const res = await mutate(...args);

    if (res?.data) {
      const message =
        typeof res.data.message === "string"
          ? res.data.message
          : "Updated data successfully!";
      toast.success(message, { id: toastId });
      setData(res.data);
    } else {
      const errorMessage =
        typeof res?.error?.data?.message === "string"
          ? res?.error?.data?.message
          : "Something went wrong";
      toast.error(errorMessage, { id: toastId });
    }
  } catch (error) {
    const rawMessage =
      error?.data?.message || error?.message || "Something went wrong";

    const safeMessage =
      typeof rawMessage === "string"
        ? rawMessage
        : "Unexpected error occurred";

    toast.error(safeMessage, { id: toastId });
  } finally {
    setIsLoading(false);
  }
};


  return [executeMutation, isLoading, data];
};


const useSocketEvents = (socket, handlers) => {
   useEffect(() => {
      Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
      });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
      socket.off(event, handler);
      });
    }
  }, [socket, handlers]);
};
 






export { useErrors, useAsyncMutation, useSocketEvents };
