import { useState, useEffect } from "react";
import { Translation } from "../translation/translation";
import Button from "./Button";
import Notification from "./Notification";

const translation: Translation[] = [
  new Translation("alligator", "crocodile"),
  new Translation("apple", "pomme"),
  new Translation("plate", "assiette"),
  new Translation("fork", "fourchette"),
  new Translation("easy", "facile"),
  new Translation("happy", "heureux"),
  new Translation("wedding", "mariage"),
  new Translation("sad", "triste"),
  new Translation("hard", "dur"),
  new Translation("nightmare", "cauchemard"),
];
let translations: Translation[] = [
  new Translation("alligator", "crocodile"),
  new Translation("apple", "pomme"),
  new Translation("plate", "assiette"),
  new Translation("fork", "fourchette"),
  new Translation("easy", "facile"),
  new Translation("happy", "heureux"),
  new Translation("wedding", "mariage"),
  new Translation("sad", "triste"),
  new Translation("hard", "dur"),
  new Translation("nightmare", "cauchemard"),
];

function Game() {
  const scoreJson = localStorage.getItem("score");
  const [currentTranslation, setCurrentTranslation] =
    useState<Translation | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationText, setNotificationText] = useState("");
  const [score, setScore] = useState(
    scoreJson !== null ? JSON.parse(scoreJson) : 0
  );

  function startGame() {
    const tradJson = localStorage.getItem("translation");
    translations = tradJson !== null ? JSON.parse(tradJson) : translations;
    const randomIndex = Math.floor(Math.random() * translations.length);
    setCurrentTranslation(translations[randomIndex]);
    setUserAnswer("");
  }
  function reset() {
    translations = translation;
    localStorage.clear();
    setScore(0);
    startGame();
  }
  function checkAnswer() {
    if (
      currentTranslation &&
      userAnswer === currentTranslation.translatedWord
    ) {
      // user answered correctly
      // show notification and start a new game
      setScore(score + 100);
      localStorage.setItem("score", JSON.stringify(score + 100));
      setShowNotification(true);
      setNotificationTitle("Congratulation !");
      setNotificationText("Right answer");
      const index = translations.indexOf(currentTranslation);
      if (index !== -1) {
        translations.splice(index, 1);
      }
      localStorage.setItem("translation", JSON.stringify(translations));
      startGame();
    } else {
      if (showNotification) {
        setShowNotification(false);
      }
      if (score - 10 >= 0) {
        setScore(score - 10);
        localStorage.setItem("score", JSON.stringify(score - 10));
      } else setScore(0);
      // user answered incorrectly
      // show notification
      setShowNotification(true);
      setNotificationTitle("Try again !");
      setNotificationText("Wrong answer");
    }
  }

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div>
      {showNotification && (
        <Notification
          title={notificationTitle}
          text={notificationText}
          onClose={() => setShowNotification(false)}
          show={true}
        />
      )}

      {currentTranslation && (
        <div className="h-screen">
          <section className="relative flex flex-col h-1/2 items-center justify-around p-4 sm:p-20 py-4">
            <div className="flex justify-between items-center w-full">
              <p>Score: {score}</p>
              <Button
                onClick={() => reset()}
                name="Reset"
                className="bg-rose-900 py-2 px-8 rounded-xl text-white"
              />
            </div>
            <h1 className="text-2xl text-[#4e4d5c]">Translate the word</h1>
            <h5 className="pb-4 text-[#4e4d5c]">To french</h5>
            <p className="text-xl">{currentTranslation.word}</p>
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="relative block h-[80px] md:h-[150px] w-[calc(100%+1.3px)]"
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  className=" fill-[#93B7BE]"
                ></path>
              </svg>
            </div>
          </section>
          <section className="bg-[#93B7BE] h-1/2 flex justify-center items-center flex-col -translate-y-px">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="mb-20 rounded p-2"
            />
            <Button
              onClick={() => {
                checkAnswer();
              }}
              name="Check"
              className="bg-[#e2b6cf] py-2 px-8 text-lg rounded-xl"
            />
          </section>
        </div>
      )}

      {!currentTranslation && (
        <div className="h-screen">
          <section className="relative flex flex-col h-1/2 items-start p-4 sm:p-20 py-4">
            <div className="flex justify-between w-full">
              <p>Score: {score}</p>
              <Button
                onClick={() => {
                  setCurrentTranslation(null);
                  reset();
                }}
                name="Reset"
                className="bg-rose-900 py-2 px-8 rounded-xl text-white"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="relative block h-[100px] md:h-[150px] w-[calc(100%+1.3px)]"
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  className=" fill-[#93B7BE]"
                ></path>
              </svg>
            </div>
          </section>
          <section className="bg-[#93B7BE] h-1/2 flex justify-center items-center flex-col -translate-y-px">
            <h1 className="text-2xl text-[#4e4d5c]">
              Congrats ! You've translated all the words !
            </h1>
          </section>
        </div>
      )}
    </div>
  );
}
export default Game;
