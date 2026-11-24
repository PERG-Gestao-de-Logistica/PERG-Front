import { useEffect } from "react";
import { useRouter } from "next/router";

// Link do e-mail (/rastreio/{token}): abre direto o acompanhamento do pedido
export default function RastreioPorLink() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const token = String(router.query.token ?? "");
    router.replace(`/acompanhamento?token=${encodeURIComponent(token)}`);
  }, [router]);

  return null;
}
