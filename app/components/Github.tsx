"use client";

import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "./PlaceHolders-and-Vanish-Input";
import { useState } from "react";
import { BackgroundBeams } from "./BackgroundBeams";
import { Katana } from "./Katana";

export function Github() {
  const placeholders = [
    "If you don’t take risks, you can’t create a future.",
    "Push through the pain. Giving up hurts more.",
    "Hard work is worthless for those that don’t believe in themselves.",
    "If you never listen to anyone, you can't give proper advice.",
    "When you give up, that’s when the game ends.",
  ];

  const router = useRouter()
  const [userInput, setUserInput] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      router.push(`/info?id=${userInput}`)
    }, 500)
    console.log("submitted");
  };
  return (
    <>
  
      <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
        <h2 className="relative z-10 text-md md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold pb-8">
        GitHub just went full otaku. Ready?<span className="text-white">👾📖</span>
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        <BackgroundBeams></BackgroundBeams>
      </div>
    </>
  );
}
