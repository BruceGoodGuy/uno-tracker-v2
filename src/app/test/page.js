import Image from "next/image";

export default function Khoa() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
      <h3 className="text-white text-xl font-bold animate-bounce">
        Welcome to the Fun Zone!
      </h3>
      <div className="flex flex-col items-center">
        <div className="relative w-64 h-64 mb-8 transform hover:rotate-12 transition-transform duration-300">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGJlNHB1NGMzd3hpc3pkYnprMDFubW91a21jaGVhMHRnczh3bnkwaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41lPaVXzvGGMuJO/giphy.gif"
            alt="Funny GIF"
            layout="fill"
            className="rounded-full"
          />
        </div>
        <a
          href="/"
          className="text-white text-lg font-semibold mb-4 hover:underline"
        >
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-8 rounded-full text-xl transform hover:scale-110 transition-transform duration-200 animate-pulse">
            Click me... if you dare!
          </button>
        </a>
        <p className="mt-8 text-white text-lg italic">
          This page is still under construction... or destruction!
        </p>
      </div>
      <p className="text-white text-sm animate-spin-slow">
        Khoa's Wacky Test Page
      </p>
    </div>
  );
}
