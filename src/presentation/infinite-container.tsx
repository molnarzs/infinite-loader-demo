import { UIEvent, useEffect, useState } from "react";
import { PagedDataLoader } from "../domain/paged-data-loader";

export type InifiniteScrollingContainerProps<T> = {
  dataLoader: PagedDataLoader<T>;
  itemBuilder: (data: T, key: string) => JSX.Element;
};

export const InfiniteContainer = <T,>({
  dataLoader,
  itemBuilder,
}: InifiniteScrollingContainerProps<T>) => {
  const [itemData, addPage] = useState<T[]>([]);
  const [pageToken, setPageToken] = useState<string | undefined | null>();
  const [pageNum, setPageNum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    if (pageToken === null) {
      return;
    }

    setIsLoading(true);

    try {
      const { nextPageToken, items } = await dataLoader.fetchPage(pageToken);
      setPageToken(nextPageToken);
      addPage((prevData: T[]) => [...prevData, ...items]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const percentageScrolled =
      (e.currentTarget.scrollTop /
        (e.currentTarget.scrollHeight - e.currentTarget.clientHeight)) *
      100;
    const shouldLoad = percentageScrolled > 80;

    if (isLoading || !shouldLoad) {
      return;
    }

    setPageNum((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData();
  }, [pageNum]);

  return (
    <div
      onScroll={handleScroll}
      style={{ overflowY: "scroll", height: "100%" }}
    >
      {itemData.map((data, index) => itemBuilder(data, index.toString()))}
      {isLoading ? <div>Loading...</div> : undefined}
    </div>
  );
};
