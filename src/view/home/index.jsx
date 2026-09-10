import { Contents } from "./contents";
export default function Home() {
  return (
    <div>
      <div className="hero">
        <h1>Bienvenidos</h1>
        <p>Tienda online</p>
        <p>de maquillaje</p>
        <button className="btn">Buscar</button>
      </div>
      <div className="video-seccion">
        <h1>video de muestra!</h1>
        <video controls>
          <source src="public/video.mp4" type="video/mp4" video></source>
        </video>
      </div>
      <Contents />
    </div>
  );
}
