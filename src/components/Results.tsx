import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useResultContext } from "../contexts/ResultContextProvider";

import Loading from "./Loading";

interface TextResult {
  link: string,
  title: string
}

interface ImageResult {
  image: any,
  link: {
    href: string,
    title: string
  }
}

const Results = () => {
  // @ts-ignore
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm){
      if (location.pathname === '/videos')
        getResults(`/search/q=${searchTerm} videos`);
      else
        getResults(`/${location.pathname}/q=${searchTerm}&num=30`)
    }
  }, [searchTerm, location.pathname, getResults]);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.results?.map(({ link, title }: TextResult, index: number) => (
            <div id={index.toString()} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.image_results?.map(({ image, link: { href, title } }: ImageResult, index: number) => (
            <a className="sm:p-3 p-5" href={href} key={index.toString()} target="_blank" rel="noreferrer">
              <img src={image?.src} alt={title} loading="lazy"/>
              <p className="w-36 break-words text-sm mt-2">
                {title}
              </p>
            </a>
          ))}
        </div>
      );
    case "/news":
      return "Search";
    case "/videos":
      return "Search";

    default:
      return "Error";
  }
};

export default Results;