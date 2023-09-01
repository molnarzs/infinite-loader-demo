import { useMemo } from "react";
import { PicsumPagedDataLoader } from "../data/picsum-paged-data-loader";
import { PicsumData } from "../domain/picsum-data";
import { InfiniteContainer } from "./infinite-container";

export const ScrolledContainers = () => {
  const propsImage = useMemo(
    () => ({
      dataLoader: new PicsumPagedDataLoader(),
      itemBuilder: (data: PicsumData, key: string) => {
        return (
          <div key={key}>
            <img src={data.url} style={{ width: "200px" }} />
          </div>
        );
      },
    }),
    []
  );

  const propsTextual = useMemo(
    () => ({
      dataLoader: new PicsumPagedDataLoader(),
      itemBuilder: (data: PicsumData, key: string) => {
        return <div key={key}>{data.url}</div>;
      },
    }),
    []
  );

  return (
    <>
      <div style={{ height: "200px" }}>
        <InfiniteContainer {...propsImage} />
      </div>
      <hr />
      <div style={{ height: "200px" }}>
        <InfiniteContainer {...propsTextual} />
      </div>
    </>
  );
};
