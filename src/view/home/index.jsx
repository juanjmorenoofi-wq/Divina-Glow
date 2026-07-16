import { Contents } from "./contents";
export default function Home() {
  return (
    <div>
      <div className="hero">
        <h2>Bienvenidos</h2>
        <p>Tienda online</p>
        <p>de maquillaje</p>
        <button className="btn">Buscar</button>
      </div>
      <div className="video-seccion">
        <h2>video de muestra!</h2>
        <video controls>
          <source src="public/video.mp4" type="video/mp4" video></source>
        </video>
      </div>
      <Contents />
    </div>
  );
}
