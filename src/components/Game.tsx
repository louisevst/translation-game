import { useState, useEffect } from "react";
import { Translation } from "../translation/translation";
import Button from "./Button";
import Notification from "./Notification";

const translation: Translation[] = [
  new Translation("alligator", "crocodile"),
  new Translation("apple", "pomme"),
  // add more translations here
];
let translations: Translation[] = [
  new Translation("alligator", "crocodile"),
  new Translation("apple", "pomme"),
  // add more translations here
];

function Game() {
  const [currentTranslation, setCurrentTranslation] =
    useState<Translation | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationText, setNotificationText] = useState("");
  const [score, setScore] = useState(0);

  function startGame() {
    const randomIndex = Math.floor(Math.random() * translations.length);
    setCurrentTranslation(translations[randomIndex]);
    setUserAnswer("");
  }
  function reset() {
    translations = translation;
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
      setScore(100);
      setShowNotification(true);
      setNotificationTitle("Congratulation !");
      setNotificationText("Right answer");
      const index = translations.indexOf(currentTranslation);
      if (index !== -1) {
        translations.splice(index, 1);
      }
      startGame();
    } else {
      if (showNotification) {
        setShowNotification(false);
        console.log("ca devrait marcher");
      }
      if (score - 10 >= 0) {
        setScore(score - 10);
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
        <div>
          <p>Score: {score}</p>
          <Button
            onClick={() => reset()}
            name="Reset"
            className="bg-rose-900"
          />
          <h1 className="text-xl text-[#4e4d5c]">Translate the word</h1>
          <p>{currentTranslation.word}</p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <Button
            onClick={() => {
              checkAnswer();
            }}
            name="Check"
            className="bg-[#e2b6cf]"
          />
        </div>
      )}

      {!currentTranslation && (
        <>
          <p>Score: {score}</p>
          <Button onClick={() => reset()} name="Reset" />
          <p>Congrats ! You've translated all the words !</p>
        </>
      )}
    </div>
  );
}
export default Game;
