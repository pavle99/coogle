import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

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

interface NewsResults {
  links: Array<{ href: string }>,
  source: {
    href: string
  },
  title: string,
  id: number
}

const Results = () => {
  // @ts-ignore
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/video")
        getResults(`/search/q=${searchTerm} video`);
      else
        getResults(`${location.pathname}/q=${searchTerm}&num=30`);
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map(({ link, title }: TextResult, index: number) => (
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
    case "/image":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map(({ image, link: { href, title } }: ImageResult, index: number) => (
            <a className="sm:p-3 p-5" href={href} key={index.toString()} target="_blank" rel="noreferrer">
              <img src={image?.src} alt={title} loading="lazy" />
              <p className="w-36 break-words text-sm mt-2">
                {title}
              </p>
            </a>
          ))}
        </div>
      );
    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {results?.map(({ links, id, source, title }: NewsResults) => (
            <div id={id.toString()} className="md:w-2/5 w-full">
              <a href={links?.[0].href} target="_blank" rel="noreferrer" className="hover:underline">
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <div className="flex gap-4">
                  <a href={source?.href} target="_blank" rel="noreferrer">
                    {source?.href}
                  </a>
                </div>
              </a>
            </div>
          ))}
        </div>
      );
    case "/video":
      return (
        <div className="flex flex-wrap">
          {results.map((video: { link: string }, index: number) => (
              <div key={index.toString()} className="p-2">
                <ReactPlayer url={video.link} controls width="335px" height="200px" />
              </div>
            ))}
        </div>
      );

    default:
      throw new Error("Error result");
  }
};

export default Results;