"use client";
import React, { useRef, useEffect, useState } from "react";

const TorchRevealSection = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateSpotlight = (e: MouseEvent) => {
      const rect = spotlightRef.current?.getBoundingClientRect();
      if (rect) {
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };

    document.addEventListener("mousemove", updateSpotlight);
    return () => document.removeEventListener("mousemove", updateSpotlight);
  }, []);

  return (
    <div className="relative w-full lg:w-1/2 bg-black overflow-hidden">
      {/* Torch Effect Layer */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(300px at ${coords.x}px ${coords.y}px, rgba(0,0,0,0.6) 0%, rgba(0,0,0,1) 80%)`,
          mixBlendMode: "darken",
          transition: "background 0.1s ease",
        }}
      />

      {/* Your content with hidden-to-visible on hover effect */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 z-0 relative">
        {infoBoxes.map((box, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-gray-700 backdrop-blur bg-black/60 text-white  transition-opacity duration-300 ease-in-out"
          >
            <h3 className={`text-xl font-semibold mb-2 ${box.color}`}>
              {box.title}
            </h3>
            <p className="text-sm text-gray-300">{box.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TorchRevealSection;

const infoBoxes = [
  {
    title: "What is Crypto?",
    description:
      "Cryptocurrency is digital money built on blockchain technology. It’s decentralized, secure, and powered by cryptography.",
    color: "text-cyan-400",
  },
  {
    title: "Blockchain Basics",
    description:
      "A blockchain is a public, unchangeable ledger that records all transactions securely using consensus and cryptography.",
    color: "text-emerald-400",
  },
  {
    title: "How Trading Works",
    description:
      "Buy low, sell high. Crypto trading involves analyzing charts, market trends, and using strategies like HODLing or scalping.",
    color: "text-yellow-400",
  },
  {
    title: "Wallets & Security",
    description:
      "Crypto wallets store your assets. Use hardware wallets and enable 2FA for strong security in this digital frontier.",
    color: "text-purple-400",
  },
  {
    title: "Decentralization",
    description:
      "Unlike traditional systems, decentralized networks like Bitcoin run on peer-to-peer protocols without central control.",
    color: "text-pink-400",
  },
  {
    title: "Risks & Rewards",
    description:
      "Crypto is volatile — while gains can be huge, losses can be just as fast. Learn, test, and manage your risks wisely.",
    color: "text-red-400",
  },
];
