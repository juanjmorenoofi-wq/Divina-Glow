import * as iconos from "lucide-react";
export function Head() {
  return (
    <header className="header">
      <div className="conten-logo">
        <img className="img-logo" src="divina.webp" alt="" />

        <h1 className="logo">Divina Glow</h1>
      </div>
      <nav className="flex">
        <a href="" className="flex">
          <iconos.House />
          Inicio
        </a>
        <a href="">
          <iconos.Package />
          Productos
        </a>
        <a href="">
          <iconos.Tag />
          Ofertas
        </a>

        <a href="">
          <iconos.UserRoundCog />
          Nosotros
        </a>
        <a href="">
          <iconos.CircleQuestionMark />
          Preguntas
        </a>
        <a href="">
          <iconos.Phone />
          Contacto
        </a>
      </nav>
    </header>
  );
}
