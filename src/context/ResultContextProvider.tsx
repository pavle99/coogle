import React, { createContext, useContext, useState } from "react";

interface ResultProps {
  getResults: (type: string) => Promise<void>;
  results: any;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const ResultContext = createContext<ResultProps>({
  getResults(type: string): Promise<void> {
    return Promise.resolve(undefined);
  },
  isLoading: false,
  results: undefined,
  searchTerm: "",
  setSearchTerm(value: ((prevState: string) => string) | string): void {},
});

const baseURL = "https://google-search3.p.rapidapi.com/api/v1";

export const ResultContextProvider: React.FC<any> = ({ children }) => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem("searchItem") ?? ""
  );

  const getResults = async (type: string) => {
    if (process.env.REACT_APP_GOOGLE_SEARCH_API_KEY) {
      setIsLoading(true);

      const response = await fetch(`${baseURL}${type}`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_GOOGLE_SEARCH_API_KEY,
          "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
        },
      });

      const data = await response.json();
      if (!data.message) {
        if (type.includes("/news")) setResults(data.entries);
        else if (type.includes("/image")) setResults(data.image_results);
        else if (type.includes("video"))
          setResults(
            data.results.filter(
              (video: { link: string }) =>
                video.link.startsWith("https://www.youtube") &&
                !video.link.includes("channel")
            )
          );
        else setResults(data.results);

        setIsLoading(false);
      } else console.log("Invalid API key!");
    } else console.log("Please provide the API key!");
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
