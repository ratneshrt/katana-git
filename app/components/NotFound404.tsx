"use client";
import React from "react";
import { WavyBackground } from "./Wavy";

export function NotFound() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center ">
        Oh oh, lost in the Sea?
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Looks like you were looking for something that doesn't exist
      </p>
    </WavyBackground>
  );
}
