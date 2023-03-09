import { useState, useEffect } from "react";

type NotificationProps = {
  title: string;
  text: string;
  show: boolean;
  onClose: () => void;
};

function Notification({ title, text, show, onClose }: NotificationProps) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (show) {
      setIsShown(true);
    }
  }, [show]);

  const toggleNotification = () => {
    setIsShown(false);
    onClose();
  };

  useEffect(() => {
    if (isShown) {
      document.body.classList.add("notif-open");
    } else {
      document.body.classList.remove("notif-open");
    }
  }, [isShown]);

  if (!isShown) {
    return null;
  }
  return (
    <div className="fixed top-0 right-0 p-4 m-4 bg-gray-200 w-[90%] md:w-[70%] lg:w-[40%] z-50 rounded-lg">
      <button className="fixed top-5 right-5" onClick={toggleNotification}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

export default Notification;
