import * as iconos from "lucide-react";
export function Head() {
  return (
    <header className="header">
      <div className="conten-logo">
        <img className="img-logo" src="divina.webp" alt="" />

        <h1 className="logo">Divina Glow</h1>
      </div>
      <nav>
        <a href="">
          <iconos.House />
          Inicio
        </a>
        <a href="">
          <iconos.Package />
          Productos
        </a>
        <a href="">
          <iconos.UserRoundCog />
          Servicio
        </a>
        <a href="">
          <iconos.Phone />
          Contacto
        </a>
      </nav>
    </header>
  );
}
