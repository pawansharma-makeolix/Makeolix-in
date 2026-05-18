import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const BackgroundParticles = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      init={particlesInit}
      className="fixed inset-0 z-0"
      options={{
        fullScreen: false,
        background: {
          color: "transparent",
        },

        particles: {
          number: {
            value: 60,
            density: { enable: true, area: 800 },
          },

          color: {
            value: "#118ab2", // subtle blue
          },

          links: {
            enable: true,
            color: "#118ab2",
            distance: 150,
            opacity: 0.15,
            width: 1,
          },

          move: {
            enable: true,
            speed: 0.5,
          },

          size: {
            value: 2,
          },

          opacity: {
            value: 0.2,
          },
        },

        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },

          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.3,
              },
            },
          },
        },
      }}
    />
  );
};

export default BackgroundParticles;
