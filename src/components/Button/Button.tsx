import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { IconId } from "../../types/enums";
import { Icon } from "..";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "info" | "success" | "danger";
  appearance?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: IconId;
  iconPosition?: "left" | "right";
  iconClassName?: string;
};

type ActionProps = BaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
        as?: "button";
      })
    | (LinkProps & {
        as: "link";
      })
  );

const Button = ({
  className = "",
  variant = "primary",
  appearance = "solid",
  size = "md",
  icon,
  iconPosition = "left",
  iconClassName = "",
  ...props
}: ActionProps) => {
  const isSolid = appearance === "solid";

  const buttonStylesMap = {
    base: "rounded-full relative inline-flex items-center justify-center font-heading font-semibold transition-all text-black no-underline before:absolute before:left-0 before:top-0 before:w-full before:h-full before:rounded-full before:border-transparent before:transition-all",
    size: {
      sm: "py-2.5 px-5 min-w-[6rem] gap-2 text-body-sm before:border-[1px] hover:before:left-[-5px] hover:before:top-[-5px] hover:before:w-[calc(100%+10px)] hover:before:h-[calc(100%+10px)] ",
      md: "py-4 px-6 min-w-[8rem] gap-3 text-body before:border-2 hover:before:left-[-7px] hover:before:top-[-7px] hover:before:w-[calc(100%+14px)] hover:before:h-[calc(100%+14px)] ",
      lg: "py-5 px-8 min-w-[10rem] gap-3 text-body before:border-2 hover:before:left-[-8px] hover:before:top-[-8px] hover:before:w-[calc(100%+16px)] hover:before:h-[calc(100%+16px)] ",
    },
    variant: {
      primary: `hover:before:border-primary-400 ${
        isSolid
          ? "bg-primary-400 dark:hover:text-black hover:text-black"
          : "bg-transparent shadow-[inset_0_0_0_2px_theme(colors.primary.400)] dark:text-white"
      }`,
      secondary: `hover:before:border-gray-700 dark:hover:before:border-gray-100 ${
        isSolid
          ? "bg-gray-900 text-white dark:text-gray-900 hover:text-white dark:hover:text-gray-900 dark:bg-gray-100"
          : "bg-transparent shadow-[inset_0_0_0_2px_theme(colors.gray.900)] dark:shadow-[inset_0_0_0_2px_theme(colors.gray.200)] dark:text-white"
      }`,
      info: `hover:before:border-blue-500 text-white ${
        isSolid
          ? "bg-blue-500 hover:text-white"
          : "bg-transparent shadow-[inset_0_0_0_2px_theme(colors.blue.500)] dark:text-white"
      }`,
      success: `hover:before:border-emerald-500 text-white ${
        isSolid
          ? "bg-emerald-500 hover:text-white"
          : "bg-transparent shadow-[inset_0_0_0_2px_theme(colors.emerald.500)] dark:text-white"
      }`,
      danger: `hover:before:border-rose-500 text-white ${
        isSolid
          ? "bg-rose-500 hover:text-white"
          : "bg-transparent shadow-[inset_0_0_0_2px_theme(colors.rose.500)] dark:text-white"
      }`,
    },
  };

  const iconStylesMap = {
    size: {
      sm: "w-5 h-5",
      md: "w-6 h-6",
      lg: "w-7 h-7",
    },
    variant: {
      primary: isSolid ? "fill-black" : "fill-black dark:fill-white",
      info: isSolid ? "fill-white" : "fill-white dark:fill-white",
      success: isSolid ? "fill-white" : "fill-emerald dark:fill-emerald",
      danger: isSolid ? "fill-white" : "fill-rose dark:fill-rose",
      secondary: isSolid
        ? "fill-white dark:fill-gray-900"
        : "fill-gray-900 dark:fill-gray-200",
    },
  };

  if (props.as === "link") {
    const { as, children, ...rest } = props;
    const linkStyles = `${buttonStylesMap.base} ${buttonStylesMap.size[size]} ${buttonStylesMap.variant[variant]} ${className}`;
    return (
      <Link className={linkStyles} {...rest}>
        {icon && (
          <Icon
            id={icon}
            className={`${iconStylesMap.size[size]} ${iconStylesMap.variant[variant]} ${
              iconPosition === "left" ? "order-first" : "order-last"
            } ${iconClassName}`}
          />
        )}
        {children}
      </Link>
    );
  }

  const { as, children, disabled, ...rest } = props;
  const diasbledButtonStyles = `text-gray-400 cursor-default ${
    isSolid ? "bg-gray-200" : "shadow-[inset_0_0_0_2px_theme(colors.gray.200)]"
  }`;
  const buttonStyles = `${buttonStylesMap.base} ${buttonStylesMap.size[size]} ${
    disabled ? diasbledButtonStyles : buttonStylesMap.variant[variant]
  } ${className}`;

  return (
    <button className={buttonStyles} {...rest}>
      {icon && (
        <Icon
          id={icon}
          className={`${iconStylesMap.size[size]} ${iconStylesMap.variant[variant]} ${
            iconPosition === "left" ? "order-first" : "order-last"
          } ${disabled ? "fill-gray-400" : ""} ${iconClassName}`}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
