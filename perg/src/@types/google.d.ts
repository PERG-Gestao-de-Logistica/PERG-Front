// Tipos mínimos do Google Identity Services (https://accounts.google.com/gsi/client)
interface GoogleCredencial {
  credential: string;
}

interface Window {
  google?: {
    accounts: {
      id: {
        initialize: (config: { client_id: string; callback: (r: GoogleCredencial) => void }) => void;
        renderButton: (elemento: HTMLElement, opcoes: Record<string, unknown>) => void;
      };
    };
  };
}
