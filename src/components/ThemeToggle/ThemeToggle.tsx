import { IconId } from "../../types/enums";
import Icon from "../Icon/Icon";
import { useDarkThemeContext } from "../../context/DarkThemeContext";

const ThemeToggle = () => {
  const { handleDarkTheme } = useDarkThemeContext();

  return (
    <button
      className="flex bg-gray-400 dark:bg-gray-700 rounded-full relative"
      onClick={() => handleDarkTheme()}
    >
      <span className="absolute z-20 w-1/2 h-full bg-primary-400 rounded-full left-0 top-0 transition-transform dark:translate-x-full"></span>
      <span className="p-2 relative z-20">
        <Icon
          id={IconId.Sun}
          width="26"
          className="rounded-2xl transition-colors dark:fill-white fill-gray-900"
        />
      </span>
      <span className="p-2 relative z-20">
        <Icon
          id={IconId.Moon}
          width="26"
          className="rounded-2xl transition-colors fill-gray-100 dark:fill-gray-900"
        />
      </span>
    </button>
  );
};

export default ThemeToggle;
