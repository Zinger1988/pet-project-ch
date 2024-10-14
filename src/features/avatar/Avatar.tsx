import colors from 'tailwindcss/colors';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xs' | 'xl';
  name: string;
  className?: string;
  randomizeFill?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ name, className = '', size = 'md', randomizeFill = true }) => {
  let abbr = name
    .split(' ')
    .map((chunk) => chunk[0])
    .join('')
    .slice(0, 2);

  const fill = `hsla(${Math.floor(Math.random() * 360) + 91}, 55%, 50%, 1)`;
  const sizeMap = {
    xs: 'w-5 h-5 text-body-xs rounded-md',
    sm: 'w-8 h-8 text-body-xs rounded-xl',
    md: 'w-10 h-10 text-body rounded-2xl',
    lg: 'w-16 h-16 text-h2 rounded-2xl',
    xl: 'w-20 h-20 text-h2 rounded-[28px]',
  };
  const avatarStyles = `bg-gray-600 relative flex flex-col items-center justify-center uppercase font-bold leading-none overflow-hidden text-white ${sizeMap[size]} ${className}`;

  return (
    <div style={{ backgroundColor: randomizeFill ? fill : colors.blue[500] }} className={avatarStyles}>
      {abbr}
    </div>
  );
};

export default Avatar;
