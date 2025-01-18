"use client";
import React from "react";
import { HoverBorderGradient } from "./hover-border-gradient";
import Link from "next/link";

export function Katana() {
  return (
    <Link href={'/'}>
        <div className="pt-6 bg-black flex px-6 text-center">
        <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
            <KatanaLogo />
            <span>Katana</span>
        </HoverBorderGradient>
        </div>
    </Link>
  );
}

const KatanaLogo = () => {
    return (
      <span className="text-lg" role="img" aria-label="Crossed Swords">
        ⚔️
      </span>
    );
  };
  
