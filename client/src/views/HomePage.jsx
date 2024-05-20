import Card from "../components/Card";
export default function HomePage() {
  return (
    <>
      <div>
  <div className="bg-black flex items-center p-4">
    <img
      className="w-24 mx-auto"
      src="https://vip.idlixofficial.net/wp-content/uploads/2020/07/logov4.png"
      alt="Logo"
    />
    <div className="relative w-full max-w-md ml-4">
      <input
        className="w-full p-3 text-md text-white placeholder-neutral-500 bg-[#0f0f0f] rounded-lg focus:outline-none"
        type="text"
        placeholder="Search..."
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-neutral-500"
        viewBox="0 0 30 30"
        fill="currentColor"
      >
        <path d="M 13 3 C 7.4886661 3 3 7.4886661 3 13 C 3 18.511334 7.4886661 23 13 23 C 15.396652 23 17.59741 22.148942 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148942 17.59741 23 15.396652 23 13 C 23 7.4886661 18.511334 3 13 3 z M 13 5 C 17.430666 5 21 8.5693339 21 13 C 21 17.430666 17.430666 21 13 21 C 8.5693339 21 5 17.430666 5 13 C 5 8.5693339 8.5693339 5 13 5 z"></path>
      </svg>
    </div>
  </div>
  <div className="min-h-screen flex justify-center items-center bg-black">
    <Card />
  </div>
</div>

    </>
  );
}
