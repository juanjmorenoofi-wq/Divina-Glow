import "./App.css";
import { Head } from "./components/head";
import { Contents } from "./components/contents";
import { Footer } from "./components/footer";

export default function App() {
  return (
    <>
      <Head />
      <main id="inicio">
        <Contents />
      </main>
      <Footer />
    </>
  );
}
