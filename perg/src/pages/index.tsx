

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/ModalNovoOrigem",
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return null;
}