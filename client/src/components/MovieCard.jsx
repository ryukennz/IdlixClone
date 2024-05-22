import { useEffect } from "react";

export default function Card({
  fetchData,
  movies,
  search,
  currentPage,
  moviePerPage,
}) {
  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchData(currentPage, search, moviePerPage);
  }, [currentPage, search, moviePerPage]);

  return (
    <>
      <div className="p-10 bg-[#0f0f0f]">
        <div className="grid md:grid-cols-2 gap-10 lg:grid-cols-3">
          {filteredMovies?.map((movie, index) => (
            <div
              key={index}
              className="rounded-3xl group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30"
            >
              <div className="h-96 w-72">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-125"
                  src={movie.img}
                  alt={movie.name}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70" />
              <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center text-center transition-all duration-500 group-hover:-translate-y-6">
                <h1 className="font-[open-sans] text-2xl font-bold text-white">
                  {movie.name}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
