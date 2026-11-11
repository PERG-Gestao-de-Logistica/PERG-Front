

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return null;
}