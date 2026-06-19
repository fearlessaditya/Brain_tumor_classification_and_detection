import React from "react";
import {useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const Particle=()=>{
  const [init, setInit] = useState(false);

  useEffect(() => {
    console.log("init");
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      {init && (
        <Particles
        id="tsparticles"
        options={{
          background: {
            color: "transparent",
          },
          particles: {
            number: {
              value: 150,
              density: { enable: true, area: 800 },
            },
            color: { value: "#ffffff" },
            links: {
              enable: true,
              distance: 200,
              color: "#ffffff",
              opacity: 0.4,
              width: 1.5,
            },
            move: {
              enable: true,
              speed: 1,
            },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
          },
          interactivity: {
            events: {
              onHover: { enable: false },
              onClick: { enable: false },
            },
          },
          detectRetina: true,
        }}
      />
      )}
    </>
  );
}



export default Particle;