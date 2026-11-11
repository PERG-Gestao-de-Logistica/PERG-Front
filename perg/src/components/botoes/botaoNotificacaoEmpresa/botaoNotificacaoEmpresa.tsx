
// import { IoNotificationsOutline } from "react-icons/io5";
// import styles from "./botaoNotificacaoEmpresa.module.css";

// // interface BotaoNotificacaoProps {
// //   quantidade?: number;
// //   onClick: () => void;
// // }

// // export default function BotaoNotificacao({
// //   quantidade = 0,
// //   onClick,
// // }: BotaoNotificacaoProps) {

// // // type="button"
// //       className={styles.botao}
// //       onClick={onClick}
// //       aria-label={`Notificações, ${quantidade} não lidas`}

// export default function BotaoNotificacao(){
//   return (
//     <button
//     >
//       <IoNotificationsOutline className={styles.icone} />

//         <span className={styles.indicador}>
//         </span>
//     </button>
//   );
// }
import { IoNotificationsOutline } from "react-icons/io5";
import styles from "./botaoNotificacaoEmpresa.module.css";

export default function BotaoNotificacaoEmpresa() {
  return (
    <button
      type="button"
      className={styles.botao}
      aria-label="Notificações"
    >
      <IoNotificationsOutline size={28} />
    </button>
  );
}