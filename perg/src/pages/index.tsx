

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/rastreio",
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return null;
}