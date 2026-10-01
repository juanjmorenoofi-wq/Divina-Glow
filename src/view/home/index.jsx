import { Contents } from "./contents";
export default function Home() {
  return (
    <div>
      <div className="hero">
        <div className="one">
          <h1>Bienvenidos</h1>
        </div>

        <div className="buscar">
          <div className="online flex">
            <div className="img-buscar  flex w-100">
              <img src="maqui.png" alt="" />
            </div>
            <div className="shop   w-100">
              <p>Tienda online</p>
              <p>de maquillaje</p>
              <div className="btn-buscar flex">
                <button className="btn">Buscar</button>
              </div>
            </div>
            <div className="img-shop  flex w-100">
              <img src="dibujo.png" alt="" />
            </div>
          </div>
        </div>
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
