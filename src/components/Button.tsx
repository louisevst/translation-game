type ButtonProps = {
  name: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

function Button({
  name,
  className = "rounded bg-slate-500",
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {name}
    </button>
  );
}

export default Button;
