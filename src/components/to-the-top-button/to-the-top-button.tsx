import { useState, useEffect, FC } from "react";
import { IoIosArrowUp } from "react-icons/io";

import s from "./to-the-top-button.module.css";

export const ToTheTopButton: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 600) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTheTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => toggleVisible();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${s.toTheTop} ${visible ? `${s.visible}` : `${s.hidden}`}`}
      onClick={scrollToTheTop}
    >
      <IoIosArrowUp />
    </div>
  );
};
