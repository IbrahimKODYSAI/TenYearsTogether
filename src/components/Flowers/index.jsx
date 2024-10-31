import { useEffect, useState } from "react";
import { stars } from "../../utils";
import "./index.css";
import { Link } from "react-router-dom";

const Flowers = () => {
  const [showOpenButton, setShowOpenButton] = useState(false);

  const [lettersTop, setLettersTop] = useState([]);
  const [lettersBottom, setLettersBottom] = useState([]);
  const [uniqueKey, setUniqueKey] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messageToDisplay = [
    "10 années de relation !",
    "C'est un cap important dans la vie d'un couple.",
    "Un point de sauvegarde",
    "que peu de couples atteignent...",
    "Toi et moi",
    "avons quasiment grandi et évolué ensemble.",
    "Et aujourd'hui, mon désir le plus cher,",
    "",
    "c'est de fonder une famille avec toi",
    "et de vieillir à tes côtés In Sha Allah.",
    "C'est aussi de tout faire",
    "pour te rendre heureuse, t'apporter le sourire",
    "te soutenir à tout moment",
    "et t'aider à être la meilleure version de toi-même.",
    "Que l'on puisse construire notre vie ensemble",
    "et faire des projets de vie.",
    "Tu te rappelles de notre rencontre ?",
    "",
    "Nous avons été super fusionnels,",
    "à la seconde ! Dès le départ !",
    "Mais comme tout couple normal,",
    "il y a eu des hauts et des bas...",
    "Mais lorsqu'on se retrouve au téléphone",
    "ou physiquement en face l'un de l'autre,",
    "on s'aperçoit tout de suite",
    "que nous sommes restés super fusionnels.",
    "Tu te rappelles de nos soirées ensemble ?",
    "",
    "ce fut de moment merveilleux",
    "",
    "Des soirées entières et journées passées sur Skype,",
    "Téléphone, KakaoTalk, LoL, Fortnite, etc...",
    "À partager beaucoup de moments ensemble,",
    "à discuter, jouer, préparer nos retrouvailles et nos sorties,",
    "à rire, beaucoup rire !",
    "",
    "Je me disais que pour te séduire et te rendre amoureuse,",
    "je devais te faire rire.",
    "Mais à chaque fois que tu riais,",
    "je tombais également amoureux.",
    "Et même s'il m'est parfois arrivé",
    "de me sentir seul et peu aimé en retour,",
    "j'ai toujours continué de voir le meilleur en toi.",
    "",
    "Et mon amour pour toi",
    "n'a cessé de grandir.",
    "Tout comme ce qui va suivre.",
    "",
    "j'ai quelque chose pour toi Assia",
    "",
  ];

  useEffect(() => {
    const displayText = (topMessage, bottomMessage = "") => {
      const charactersTop = topMessage.split("").map((char, index) => ({
        char,
        delay: Math.random() * 2,
        key: `top-${index}`,
      }));
      const charactersBottom = bottomMessage
        ? bottomMessage.split("").map((char, index) => ({
            char,
            delay: Math.random() * 2,
            key: `bottom-${index}`,
          }))
        : [];

      setLettersTop(charactersTop);
      setLettersBottom(charactersBottom);
      setUniqueKey((prevKey) => prevKey + 1);
    };

    // Display the first message pair immediately
    displayText(messageToDisplay[0], messageToDisplay[1]);

    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => {
        const nextIndex = prevIndex + 2;

        // Check if we have reached the end of the messages
        if (nextIndex >= messageToDisplay.length) {
          clearInterval(interval);
          return prevIndex; // Keep the current index to stop updating
        }

        // Display next message pair
        displayText(
          messageToDisplay[nextIndex],
          messageToDisplay[nextIndex + 1] || ""
        );

        return nextIndex; // Move to the next pair
      });
    }, 6000);

    const timer1 = () => {
      setTimeout(() => {
        setShowOpenButton(true);
      }, 144000);
    };
    timer1();
    return () => clearInterval(interval, timer1); // Clear interval on component unmount
  }, []);
  return (
    <div className="night-sky">
      {/* {stars.map((star, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.radius}px`,
            height: `${star.radius}px`,
            backgroundColor: `rgba(255, 255, 255, ${star.opacity})`,
            borderRadius: "50%",
          }}
        />
      ))} */}
      <div key={uniqueKey} className="title text-[2.5rem] font-bold">
        {/* Top line */}
        <div className="text-line">
          {lettersTop.map(({ char, delay, key }) => (
            <span
              key={key}
              style={{ animationDelay: `${delay}s` }}
              className="animated-letter"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        {/* Bottom line */}
        {lettersBottom.length > 0 && (
          <div className="text-line mt-4">
            {lettersBottom.map(({ char, delay, key }) => (
              <span
                key={key}
                style={{ animationDelay: `${delay}s` }}
                className="animated-letter"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        )}
      </div>
      {showOpenButton && (
        <div className="absolute flex justify-center top-[60vh] m-auto  w-[100%] left-0">
          <Link to="/flowers-for-you">
            <div className="btn">
              <svg
                height="24"
                width="24"
                fill="#FFFFFF"
                viewBox="0 0 24 24"
                className="sparkle"
              >
                <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
              </svg>
              <span className="text">Open</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Flowers;
