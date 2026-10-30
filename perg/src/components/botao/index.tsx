type ButtonProps = {
  children: React.ReactNode;
  variant?: "principal" | "texto";
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "principal",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`botao botao-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}