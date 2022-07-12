import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext({});
const baseURL = "https://google-search3.p.rapidapi.com/api/v1";

export const ResultContextProvider: React.FC<any> = ({ children }) => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getResults = async (type: string) => {
    setIsLoading(true);

    const response = await fetch(`${baseURL}${type}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "70a692c3c6msh240b1bc3c4160eap1d8ef6jsn8f28f7e05bad",
        "X-RapidAPI-Host": "google-search3.p.rapidapi.com"
      }
    });

    const data = await response.json();

    setResults(data);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);