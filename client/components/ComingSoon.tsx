import React from "react";
import Particles from "react-particles-js";
import video from "../assets/video.mp4";

const ComingSoon = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* <Particles
        className="absolute w-full h-full"
        params={{
          particles: {
            number: {
              value: 200,
              density: { enable: true, value_area: 1803.4120608655228 },
            },
            color: { value: "#ffffff" },
            shape: {
              type: "circle",
              stroke: { width: 2, color: "#000000" },
              polygon: { nb_sides: 4 },
              image: { src: "img/github.svg", width: 100, height: 100 },
            },
            opacity: {
              value: 0.4008530152163807,
              random: false,
              anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
            },
            size: {
              value: 1.5,
              random: true,
              anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.3687847739990702,
              width: 1,
            },
            move: {
              enable: true,
              speed: 6,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              grab: { distance: 400, line_linked: { opacity: 1 } },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: { distance: 200, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
            },
          },
          retina_detect: true,
        }}
      /> */}
      <div className="absolute z-10 text-center text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <video
          autoPlay
          loop
          muted
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto z-[-1] transform -translate-x-1/2 -translate-y-1/2 bg-cover transition duration-1000 opacity-0 brightness-50"
        >
          <source src={"./video.mp4"} type="video/mp4" />
        </video>
        <h1 className="text-5xl font-bold">QuizGPT</h1>
        <p className="text-2xl">Coming soon...</p>
      </div>
    </div>
  );
};

export default ComingSoon;
