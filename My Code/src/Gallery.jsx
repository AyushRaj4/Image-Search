import { useQuery } from "@tanstack/react-query";
import customFetch from "./utils";
import { useGlobalContext } from "./Context";

const Gallery = () => {
  const { searchTerm } = useGlobalContext();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const res = await customFetch.get("/search/photos/", {
        params: {
          query: searchTerm,
          client_id: `${import.meta.env.VITE_API_KEY}`,
        },
      });
      return res.data;
    },
  });
  // console.log(data);

  if (isLoading)
    return (
      <section className="image-container">
        <h4>loading...</h4>
      </section>
    );
  if (isError)
    return (
      <section className="image-container">
        <h4>there was an error</h4>
      </section>
    );
  if (data?.results?.length < 1)
    return (
      <section className="image-container">
        <h1>no results found</h1>
      </section>
    );

  return (
    <section className="image-container">
      {data?.results.map((item) => {
        return (
          <img
            key={item?.id}
            src={item?.urls?.regular}
            alt={item?.alt_description}
            className="img"
          />
        );
      })}
    </section>
  );
};

export default Gallery;
