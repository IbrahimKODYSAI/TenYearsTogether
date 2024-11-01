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
    "Une milestone",
    "que peu de couples atteignent...",
    "Toi et moi,",
    "avons quasiment grandi, mûri puis évolué ensemble.",
    "Dès notre rencontre, j'ai vu en toi",
    "qui tu pouvais être, et ce que tu vaux vraiment.",
    "Tu es une belle personne, une personne incroyable,",
    "de confiance, tolérante, avec du cœur et de la patience.",
    "Tu as énormément de qualités en toi,",
    "et je serai toujours là pour te montrer ta vraie valeur.",
    "Je n'aurais jamais pensé avoir",
    "une relation aussi fusionnelle avec quelqu'un",
    "Mais c'est devenu possible tout simplement",
    "parce que...",
    "C'est toi Assia",
    "et c'est moi Ibrahim.",
    "Ensemble",
    "nous avons forgé une belle relation.",
    "Tu te rappelles de notre rencontre ?",
    "Nous avons été complices et fusionnels à la seconde.",
    "Et comme tout couple normal,",
    "il y a eu des hauts et des bas... c'est normal.",
    "Mais lorsqu'on se retrouve au téléphone",
    "ou physiquement en face l'un de l'autre,",
    "on s'aperçoit tout de suite",
    "que nous nous aimons toujours autant.",
    "Nous sommes restés ces deux êtres",
    "complices et fusionnels",
    "Tu te rappelles de nos soirées ensemble ?",
    "C'étaient de merveilleux moments",
    "Des soirées et journées entières ensemble",
    "à se voir sur Skype, au téléphone, etc...",
    "À partager beaucoup de moments ensemble,",
    "à discuter, jouer, préparer nos retrouvailles et nos sorties.",
    "À rire, beaucoup de fous rires !",
    "Beaucoup de moments de joie...",
    "Je me disais que pour te séduire et te faire sentir aimée",
    "je devais prendre soin de toi et te faire rire.",
    "Mais à chaque fois que tu riais,",
    "je tombais de plus en plus amoureux de ta personne.",
    "Et même s'il m'est parfois arrivé",
    "de me sentir seul, délaissé et peu aimé en retour...",
    "j'ai toujours continué de voir le meilleur en toi",
    "de croire en toi et tes mots",
    "Mon amour pour toi n'a alors",
    "jamais cessé de grandir.",
    "J'ai quelque chose pour toi Assia",
    "",
  ];

  useEffect(() => {
    const displayText = (topMessage, bottomMessage = "") => {
      const charactersTop = topMessage.split("").map((char, index) => ({
        char,
        delay: Math.random() * 1,
        key: `top-${index}`,
      }));
      const charactersBottom = bottomMessage
        ? bottomMessage.split("").map((char, index) => ({
            char,
            delay: Math.random() * 1,
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
