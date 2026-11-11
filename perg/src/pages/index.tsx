

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/entregue",
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return null;
}