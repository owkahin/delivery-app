"use client";

import React from "react";

export default function HomeInteractive({ data }: { data: unknown }) {
  function handleClick() {
    // client-only handler
    console.log("clicked");
  }

  return (
    <div>
      {/* use local handlers here */}
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}