import styles from "./botao.module.css";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "principal" | "texto" | "verde-destaque";
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "principal",
  onClick,
}: ButtonProps) {
  const variantClass = {
    principal: styles.principal,
    texto: styles.texto,
    "verde-destaque": styles.verdeDestaque,
  }[variant];

  return (
    <button
      className={`${styles.button} ${variantClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}