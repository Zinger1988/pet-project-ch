import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { IconId } from "../../types/enums";
import { Icon } from "..";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
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
    base: "rounded-full inline-flex items-center justify-center font-heading font-semibold transition-all text-black no-underline",
    size: {
      sm: "py-2.5 px-5 min-w-[6rem] gap-2 text-body-sm",
      md: "py-4 px-6 min-w-[8rem] gap-3 text-body",
      lg: "py-5 px-8 min-w-[10rem] gap-3 text-body",
    },
    variant: {
      primary: `dark:hover:shadow-[inset_0_0_0_2px_theme(colors.primary.400),0_0_0_6px_theme(colors.black),0_0_0_8px_theme(colors.primary.400)] hover:shadow-[inset_0_0_0_2px_theme(colors.primary.400),0_0_0_6px_theme(colors.white),0_0_0_8px_theme(colors.primary.400)] ${
        isSolid
          ? "bg-primary-400"
          : "bg-transparent shadow-[inset_0_0_0_2px_theme(colors.primary.400)]"
      }`,
      secondary: `dark:hover:shadow-[inset_0_0_0_2px_theme(colors.white),0_0_0_6px_theme(colors.black),0_0_0_8px_theme(colors.white)] hover:shadow-[inset_0_0_0_2px_theme(colors.gray.900),0_0_0_6px_theme(colors.white),0_0_0_8px_theme(colors.gray.900)] ${
        isSolid
          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:text-white dark:hover:text-gray-900 dark:bg-gray-700"
          : "bg-transparent shadow-[inset_0_0_0_2px_theme(colors.gray.900)] dark:shadow-[inset_0_0_0_2px_theme(colors.gray.700)]"
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
      primary: "fill-black",
      secondary: "fill-white dark:fill-gray-900",
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
