import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

export default function Card() {
  const [movies, setMovies] = useState([]);
  const getData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "/api/movies",
      });
      setMovies(response.data.movies);
      console.log(response, "<< CEK");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-black">
      <div className="py-10 container mx-auto min-h-screen bg-[#0f0f0f]">
      <div className="py-4 flex items-start justify-start align-top">
            <span className="text-white font-bold">IDLIX CLONE</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {movies?.map((movie, index) => {
            return (
              <div key={index} className="relative">
                <img 
                className=""
                src={movie.img} />
                <div className="rounded-2xl inset-0 absolute p-5 flex flex-col justify-end bg-black/40 ">
                  <h1 className="text-xl md:text-3xl text-[#f1f1f1] font-bold ">
                    {movie.name}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
