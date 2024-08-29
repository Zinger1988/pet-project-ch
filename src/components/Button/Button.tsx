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
  ...props
}: ActionProps) => {
  const isSolid = appearance === "solid";
  const buttonStylesMap = {
    base: "rounded-full inline-flex gap-3 items-center justify-center font-heading font-semibold transition-all text-black no-underline",
    size: {
      sm: "py-2.5 px-4 min-w-[6rem] text-body-xs",
      md: "py-4 px-6 min-w-[8rem] text-body-sm",
      lg: "py-5 px-8 min-w-[10rem] text-body",
    },
    variant: {
      primary: `hover:shadow-[inset_0_0_0_2px_theme(colors.primary.400),0_0_0_6px_theme(colors.white),0_0_0_8px_theme(colors.primary.400)] ${
        isSolid
          ? "bg-primary-400"
          : "bg-white shadow-[inset_0_0_0_2px_theme(colors.primary.400)]"
      }`,
      secondary: `hover:shadow-[inset_0_0_0_2px_theme(colors.gray.900),0_0_0_6px_theme(colors.white),0_0_0_8px_theme(colors.gray.900)] ${
        isSolid
          ? "bg-gray-900 text-white hover:text-white"
          : "bg-white shadow-[inset_0_0_0_2px_theme(colors.gray.900)]"
      }`,
    },
  };

  const iconStylesMap = {
    size: {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    },
    variant: {
      primary: "fill-black",
      secondary: "fill-white",
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
            }`}
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
          }`}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
