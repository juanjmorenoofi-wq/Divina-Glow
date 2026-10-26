import { useState } from "react";
import {
  House,
  Package,
  Tag,
  Star,
  MapPin,
  UserRound,
  Menu,
  X,
  ShoppingBag,
  Search,
} from "lucide-react";

const enlaces = [
  { href: "#inicio", texto: "Inicio", Icon: House },
  { href: "#mas-vendidos", texto: "Más vendidos", Icon: Star },
  { href: "#productos", texto: "Productos", Icon: Package },
  { href: "#ofertas", texto: "Ofertas", Icon: Tag },
  { href: "#ubicacion", texto: "Ubicación", Icon: MapPin },
  { href: "#nosotros", texto: "Nosotros", Icon: UserRound },
];

export function Head() {
  const [abierto, setAbierto] = useState(false);

  const abrirCarrito = () => {
    window.dispatchEvent(new Event("divina:abrir-carrito"));
  };

  return (
    <>
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="Divina Glow inicio">
          <img
            src="/divina.webp"
            className="brand-logo"
            alt="Logo Divina Glow"
          />

          <span className="brand-name">
            Divina <b>Glow</b>
            <small>BEAUTY STORE</small>
          </span>
        </a>

        <nav className={`main-nav ${abierto ? "is-open" : ""}`}>
          {enlaces.map(({ href, texto, Icon }) => (
            <a href={href} key={href} onClick={() => setAbierto(false)}>
              <Icon size={16} />
              {texto}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            href="#productos"
            className="icon-action"
            aria-label="Buscar productos"
          >
            <Search size={19} />
          </a>

          <button
            type="button"
            className="bag-action"
            onClick={abrirCarrito}
            aria-label="Abrir carrito de compras"
          >
            <ShoppingBag size={17} />
            <span>Mi carrito</span>
          </button>

          <button
            type="button"
            className="mobile-menu"
            onClick={() => setAbierto(!abierto)}
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          >
            {abierto ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
