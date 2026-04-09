
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/configure";

const baseQuery = fetchBaseQuery({
  baseUrl: `${server}/api/v1/`,
  credentials: "include",
});

const customBaseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Redirect to login page if unauthorized
    api.dispatch({ type: "auth/userNotExists" });
    window.location.href = "/login";
  }

  return result;
};

export default customBaseQuery;
