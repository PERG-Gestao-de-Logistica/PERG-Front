

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/empresa-configuracao",
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return null;
}