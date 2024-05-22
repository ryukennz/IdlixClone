import MovieCard from "../components/MovieCard";
import { useState } from "react";
import axios from "../utils/axios";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviePerPage, setMoviePerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("rating");

  const getData = async (page = 1, searchQuery = "", limit = 5) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/movies",
        params: {
          search: searchQuery,
          page,
          limit,
          genre,
          sort,
        },
      });
      setMovies(data.movies);
      setTotalPage(data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    setCurrentPage(1);
    setMenuOpen(false);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="bg-black flex items-center p-8 justify-between">
        <img
          className="w-24 lg:ml-24"
          src="https://vip.idlixofficial.net/wp-content/uploads/2020/07/logov4.png"
          alt="Logo"
        />
        <div className="relative w-full max-w-sm hidden md:block">
          <input
            onChange={handleChange}
            value={search}
            className="w-full p-3 pl-4 text-md text-white placeholder-neutral-500 bg-[#0f0f0f] rounded-lg focus:outline-none"
            type="text"
            placeholder="Search..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-neutral-500"
            viewBox="0 0 30 30"
            fill="currentColor"
          >
            <path d="M 13 3 C 7.4886661 3 3 7.4886661 3 13 C 3 18.511334 7.4886661 23 13 23 C 15.396652 23 17.59741 22.148942 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148942 17.59741 23 15.396652 23 13 C 23 7.4886661 18.511334 3 13 3 z M 13 5 C 17.430666 5 21 8.5693339 21 13 C 21 17.430666 17.430666 21 13 21 C 8.5693339 21 5 17.430666 5 13 C 5 8.5693339 8.5693339 5 13 5 z"></path>
          </svg>
        </div>
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={handleMenuToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="bg-black p-8">
          <div className="mb-4">
            <input
              onChange={handleChange}
              value={search}
              className="w-full p-3 pl-4 text-md text-white placeholder-neutral-500 bg-[#0f0f0f] rounded-lg focus:outline-none"
              type="text"
              placeholder="Search..."
            />
          </div>
          <div className="mb-4">
            <h3 className="text-white mb-2">Genre</h3>
            <div>
              <label className="text-white mr-4">
                <input
                  type="radio"
                  name="genre"
                  value="All"
                  checked={genre === "All"}
                  onChange={handleGenreChange}
                />
                All
              </label>
              <label className="text-white mr-4">
                <input
                  type="radio"
                  name="genre"
                  value="Action"
                  checked={genre === "Action"}
                  onChange={handleGenreChange}
                />
                Action
              </label>
              <label className="text-white mr-4">
                <input
                  type="radio"
                  name="genre"
                  value="Comedy"
                  checked={genre === "Comedy"}
                  onChange={handleGenreChange}
                />
                Comedy
              </label>
            </div>
          </div>
          <div>
            <h3 className="text-white mb-2">Sort By</h3>
            <div>
              <label className="text-white mr-4">
                <input
                  type="radio"
                  name="sort"
                  value="rating"
                  checked={sort === "rating"}
                  onChange={handleSortChange}
                />
                Rating
              </label>
              <label className="text-white mr-4">
                <input
                  type="radio"
                  name="sort"
                  value="releaseDate"
                  checked={sort === "releaseDate"}
                  onChange={handleSortChange}
                />
                Release Date
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="min-h-screen flex flex-col items-center bg-black">
        <MovieCard
          search={search}
          fetchData={getData}
          movies={movies}
          currentPage={currentPage}
          moviePerPage={moviePerPage}
        />
        <div className="flex justify-center mt-4">
          {[...Array(totalPage)].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
