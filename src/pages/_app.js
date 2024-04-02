import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {


  return (
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
  );
}
