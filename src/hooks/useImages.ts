/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const accessKey = "L7FSR6jlf5sjbChFxZZe16RqnTbeX06e29vOXQwXN9Y";

// Define the URL for the API endpoint
const apiUrl = "https://api.unsplash.com/photos";

// Set up query parameters to fetch 20 photos
const params = {
  per_page: 10,
};

// Set up headers with your API key
const headers = {
  Authorization: `Client-ID ${accessKey}`,
};

const fetchImages = async () => {
  const response = await axios.get(apiUrl, { params, headers });

  return response.data;
};

export const useImages = () => {
  return useQuery<any>({
    queryKey: ["images"],
    queryFn: () => fetchImages(),
  });
};
