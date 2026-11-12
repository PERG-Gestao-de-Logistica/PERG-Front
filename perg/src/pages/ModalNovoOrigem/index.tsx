
import ModalNovaOrigem from "@/components/ModalNovaOrigem";
import { useState } from "react";


export default function ModalNovoOrigemPage() {
  const [modalAberto, setModalAberto] = useState(true);

  return (
    <main>
      <ModalNovaOrigem
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />

      {!modalAberto && (
        <button onClick={() => setModalAberto(true)}>
          Abrir modal
        </button>
      )}
    </main>
  );
}
