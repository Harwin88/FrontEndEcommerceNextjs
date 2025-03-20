// pages/protected-page.tsx
import { GetServerSideProps } from "next";
import { initializeStore } from "@/redux/store";
import Cookies from "cookies"; // npm install cookies

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const cookies = new Cookies(req, res);
  const token = cookies.get("token");

  // Llamar a tu backend para validar token y obtener user
  // si tu backend expone un endpoint o query para user actual
  // Por ejemplo:
  // const { data } = await client.query(GetMeDocument, {}, {
  //   fetchOptions: { credentials: 'include', headers: { Cookie: `token=${token}` } }
  // }).toPromise();

  // Con Redux, podrías despachar setUser si todo está OK
  // store.dispatch(setUser(data.me));

  return {
    props: {
      // ...
    },
  };
};

export default function ProtectedPage() {
  return <div>Esta es una página protegida</div>;
}
