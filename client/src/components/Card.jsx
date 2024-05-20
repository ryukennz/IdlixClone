import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

export default function Card() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const getData = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/movies",
      });
      setMovies(data.movies);
      // console.log(response, "<< CEK");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="p-10 bg-[#0f0f0f]">
        <div className="">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full p-3 mb-6 text-lg text-neutral-800 placeholder-neutral-500 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="sm:grid grid-cols-2 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {movies?.map((movie, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="rounded-3xl group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30"
                  >
                    <div className="h-96 w-72 ">
                      <img
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                        src={movie.img}
                        alt=""
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70" />
                    <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center text-center transition-all duration-500 group-hover:translate-y-0">
                      <h1 className="font-[open-sans] text-2xl font-bold text-white">
                        {movie.name}
                      </h1>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
