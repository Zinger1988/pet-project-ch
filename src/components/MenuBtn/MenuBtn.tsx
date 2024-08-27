import React from "react";

interface MenuBtnProps {
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

const MenuBtn: React.FC<MenuBtnProps> = ({
  onClick,
  className = "",
  isActive = "false",
}) => {
  const btnInnerBaseStyles = `w-7 h-0.5 bg-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg transition-all ${
    isActive
      ? "ease-[cubic-bezier(.215,.61,.355,1)] delay-[120ms] rotate-[225deg]"
      : "ease-[cubic-bezier(.55,.055,.675,.19)] duration-[220ms]"
  }`;
  const btnInnerBeforeStyles = `before:absolute before:w-full before:h-full before:bg-black before:left-0 before:-bottom-2 before:rounded-lg before:origin-center ${
    isActive
      ? "before:opacity-0 before:bottom-0 before:[transition:bottom_.1s_ease-out,opacity_.1s_ease-out_.12s]"
      : "before:[transition:bottom_.1s_ease-in_.25s,opacity_.1s_ease-in]"
  }`;
  const btnInnerAfterStyles = `after:absolute after:w-full after:h-full after:bg-black after:left-0 after:-top-2 after:rounded-lg after:origin-center ${
    isActive
      ? "after:rotate-90 after:top-0 after:[transition:top_.1s_ease-out,transform_.22s_cubic-bezier(.215,.61,.355,1)_.12s;]"
      : "after:[transition:top_.1s_ease-in_.25s,transform_.22s_cubic-bezier(.55,.055,.675,.19);]"
  }`;
  const btnInnerStyles = `${btnInnerBaseStyles} ${btnInnerBeforeStyles} ${btnInnerAfterStyles}`;
  const btnStyles =
    "relative w-16 h-16 bg-yellow-400 transtion-colors duration-300 hover:bg-yellow-300";

  return (
    <button
      className={`${btnStyles} ${className}`}
      onClick={onClick}
      aria-label={isActive ? "Close menu" : "Open menu"}
    >
      <span className={`${btnInnerStyles}`}></span>
    </button>
  );
};

export default MenuBtn;
