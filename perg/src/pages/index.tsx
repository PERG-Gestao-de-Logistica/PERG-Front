

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/alertas-incidentes",
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return null;
}