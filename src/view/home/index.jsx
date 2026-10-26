import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Search,
  Heart,
  ShoppingBag,
  Sparkles,
  Truck,
  ShieldCheck,
  Gift,
  X,
  Star,
  Flame,
  Tag,
  MapPin,
  PlayCircle,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

const productos = [
  {
    id: 1,
    nombre: "Tinta de Benetint",
    precio: 140000,
    precioOferta: null,
    categoria: "Labios",
    imagen:
      "https://maquillajeimportadocolombia.com/wp-content/uploads/2025/11/s108779-main-zoom-324x324.webp",
    etiqueta: "Favorito",
    masVendido: true,
    descripcion: "Un toque de color para realzar tu look.",
  },
  {
    id: 2,
    nombre: "Gloss de Aura",
    precio: 18000,
    precioOferta: 15000,
    categoria: "Labios",
    imagen:
      "https://bibiboom.co/cdn/shop/files/BRILLOAURATONO3.png?v=1771805609&width=3840",
    etiqueta: "Oferta",
    masVendido: true,
    descripcion: "Brillo para complementar tu maquillaje.",
  },
  {
    id: 3,
    nombre: "Pestañina de MaxFactor",
    precio: 30000,
    precioOferta: null,
    categoria: "Ojos",
    imagen:
      "https://locatelcolombia.vtexassets.com/arquivos/ids/187405/7702044159661.png?v=636035990395270000",
    etiqueta: "Esencial",
    masVendido: true,
    descripcion: "Un esencial para destacar tu mirada.",
  },
  {
    id: 4,
    nombre: "Polvos de Raquel",
    precio: 25000,
    precioOferta: 22000,
    categoria: "Rostro",
    imagen:
      "https://yalumakeup.co/cdn/shop/files/polvo-suelto-raquel-1024x1024.webp?v=1751562523",
    etiqueta: "Oferta",
    masVendido: false,
    descripcion: "Un complemento para tu rutina diaria.",
  },
];

const moneda = (precio) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(precio);
const precioFinal = (producto) =>
  producto.precioOferta && producto.precioOferta < producto.precio
    ? producto.precioOferta
    : producto.precio;
const descuento = (producto) =>
  Math.round((1 - producto.precioOferta / producto.precio) * 100);

function TarjetaProducto({
  producto,
  agregar,
  favoritos,
  alternarFavorito,
  abrirDetalle,
}) {
  const enOferta = Boolean(
    producto.precioOferta && producto.precioOferta < producto.precio,
  );
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <span className={`product-tag ${enOferta ? "tag-sale" : ""}`}>
          {enOferta ? `-${descuento(producto)}%` : producto.etiqueta}
        </span>
        <button
          className={`favorite-btn ${favoritos.includes(producto.id) ? "is-favorite" : ""}`}
          onClick={() => alternarFavorito(producto.id)}
          aria-label="Agregar a favoritos"
        >
          <Heart
            size={19}
            fill={favoritos.includes(producto.id) ? "currentColor" : "none"}
          />
        </button>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.opacity = "0.25";
          }}
        />
        <button className="quick-view" onClick={() => abrirDetalle(producto)}>
          Ver detalles <ArrowRight size={16} />
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">{producto.categoria}</span>
        <h3>{producto.nombre}</h3>
        <div className="price-line">
          <strong className="product-price">
            {moneda(precioFinal(producto))}
          </strong>
          {enOferta && <del>{moneda(producto.precio)}</del>}
        </div>
        <button className="add-button" onClick={() => agregar(producto)}>
          <ShoppingBag size={16} />
          Agregar a la bolsa
        </button>
      </div>
    </article>
  );
}

export default function Home() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [productoActivo, setProductoActivo] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const abrirCarritoDesdeMenu = () => setCarritoAbierto(true);
    const cerrarConEscape = (event) => {
      if (event.key === "Escape") setCarritoAbierto(false);
    };
    window.addEventListener("divina:abrir-carrito", abrirCarritoDesdeMenu);
    window.addEventListener("keydown", cerrarConEscape);
    return () => {
      window.removeEventListener("divina:abrir-carrito", abrirCarritoDesdeMenu);
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, []);

  const visibles = useMemo(
    () =>
      productos.filter(
        (p) =>
          (categoria === "Todos" || p.categoria === categoria) &&
          p.nombre.toLowerCase().includes(busqueda.toLowerCase().trim()),
      ),
    [busqueda, categoria],
  );
  const masVendidos = productos.filter((p) => p.masVendido);
  const ofertas = productos.filter(
    (p) => p.precioOferta && p.precioOferta < p.precio,
  );
  const cantidadTotal = carrito.reduce((s, p) => s + p.cantidad, 0);
  const total = carrito.reduce((s, p) => s + precioFinal(p) * p.cantidad, 0);

  function agregar(producto) {
    setCarrito((actual) => {
      const encontrado = actual.find((p) => p.id === producto.id);
      return encontrado
        ? actual.map((p) =>
            p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p,
          )
        : [...actual, { ...producto, cantidad: 1 }];
    });
    setMensaje(`${producto.nombre} agregado a tu carrito`);
    window.setTimeout(() => setMensaje(""), 2500);
  }
  function cambiarCantidad(id, cambio) {
    setCarrito((actual) =>
      actual
        .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + cambio } : p))
        .filter((p) => p.cantidad > 0),
    );
  }
  function alternarFavorito(id) {
    setFavoritos((actual) =>
      actual.includes(id) ? actual.filter((f) => f !== id) : [...actual, id],
    );
  }
  function pedirWhatsApp() {
    if (!carrito.length) return;
    const detalle = carrito
      .map(
        (p) =>
          `• ${p.nombre} x${p.cantidad}: ${moneda(precioFinal(p) * p.cantidad)}${p.precioOferta && p.precioOferta < p.precio ? ` (precio regular ${moneda(p.precio)})` : ""}`,
      )
      .join("\n");
    const texto = `Hola Divina Glow 💗 Quiero realizar este pedido:\n\n${detalle}\n\nTotal: ${moneda(total)}\n¿Me confirman la disponibilidad y el envío?`;
    window.open(
      `https://wa.me/57?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <h1>
            La belleza está en los <em>pequeños detalles.</em>
          </h1>
          <p>
            Descubre tus nuevos favoritos de maquillaje. Productos que resaltan
            tu esencia y te ayudan a brillar a tu manera.
          </p>
          <div className="hero-buttons">
            <a className="btn-primary" href="#productos">
              Explorar productos <ArrowRight size={18} />
            </a>
            <a className="btn-text" href="#nosotros">
              Conoce nuestra tienda
            </a>
          </div>
          <div className="hero-note">
            <span className="note-stars">★★★★★</span> Belleza que inspira,
            detalles que enamoran.
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-orbit" />
          <div className="hero-image-card">
            <img
              src="/maqui.png"
              alt="Maquillaje Divina Glow"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="hero-fallback">DG</span>
          </div>
          <div className="floating-note">
            <Heart size={20} />
            <span>
              <b>Un glow especial</b>
              <small>Solo para ti.</small>
            </span>
          </div>
        </div>
      </section>

      <section className="benefit-strip">
        <div>
          <Truck />
          <span>
            <b>Atención cercana</b>
            <small>Te acompañamos en tu compra</small>
          </span>
        </div>
        <div>
          <ShieldCheck />
          <span>
            <b>Compra con confianza</b>
            <small>Resolvemos tus dudas</small>
          </span>
        </div>
        <div>
          <Gift />
          <span>
            <b>Detalles para ti</b>
            <small>Encuentra tus favoritos</small>
          </span>
        </div>
      </section>

      <section className="section-wrap featured-section" id="mas-vendidos">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <Flame size={14} /> FAVORITOS DE LA COMUNIDAD
            </span>
            <h2>
              Los más <em>vendidos.</em>
            </h2>
            <p>Descubre los productos destacados de Divina Glow.</p>
          </div>
          <a className="text-link" href="#productos">
            Ver catálogo completo <ArrowRight size={17} />
          </a>
        </div>
        <div className="product-grid">
          {masVendidos.map((p) => (
            <TarjetaProducto
              key={p.id}
              producto={p}
              agregar={agregar}
              favoritos={favoritos}
              alternarFavorito={alternarFavorito}
              abrirDetalle={setProductoActivo}
            />
          ))}
        </div>
        <p className="section-footnote">
          Selección destacada manualmente. Actualiza la marca “masVendido” en el
          catálogo según tus ventas reales.
        </p>
      </section>

      <section className="offers-section section-wrap" id="ofertas">
        <div className="offer-banner">
          <div>
            <span className="eyebrow">
              <Tag size={14} /> MOMENTOS PARA CONSENTIRTE
            </span>
            <h2>
              Ofertas que te harán <em>brillar.</em>
            </h2>
            <p>
              Encuentra tus favoritos a un precio especial por tiempo limitado.
            </p>
          </div>
          <div className="offer-sticker">
            <span>BEAUTY</span>
            <b>DEALS</b>
            <small>DIVINA GLOW</small>
          </div>
        </div>
        <div className="product-grid offer-grid">
          {ofertas.length ? (
            ofertas.map((p) => (
              <TarjetaProducto
                key={p.id}
                producto={p}
                agregar={agregar}
                favoritos={favoritos}
                alternarFavorito={alternarFavorito}
                abrirDetalle={setProductoActivo}
              />
            ))
          ) : (
            <div className="empty-state">
              <Tag size={30} />
              <h3>Pronto tendremos ofertas</h3>
              <p>Estamos preparando promociones especiales para ti.</p>
            </div>
          )}
        </div>
        <p className="section-footnote">
          Confirma y actualiza los precios promocionales antes de publicar la
          tienda.
        </p>
      </section>

      <section className="products-section section-wrap" id="productos">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SELECCIÓN DIVINA</span>
            <h2>
              Pequeños tesoros, <em>gran belleza.</em>
            </h2>
            <p>Encuentra el complemento perfecto para tu estilo.</p>
          </div>
        </div>
        <div className="shop-toolbar">
          <div className="category-tabs">
            {["Todos", "Labios", "Ojos", "Rostro"].map((item) => (
              <button
                key={item}
                className={
                  categoria === item ? "category-tab active" : "category-tab"
                }
                onClick={() => setCategoria(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="search-box">
            <Search size={18} />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda("")}
                aria-label="Limpiar búsqueda"
              >
                <X size={15} />
              </button>
            )}
          </label>
        </div>
        {visibles.length ? (
          <div className="product-grid">
            {visibles.map((p) => (
              <TarjetaProducto
                key={p.id}
                producto={p}
                agregar={agregar}
                favoritos={favoritos}
                alternarFavorito={alternarFavorito}
                abrirDetalle={setProductoActivo}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={30} />
            <h3>No encontramos ese producto</h3>
            <p>Intenta con otro nombre o categoría.</p>
            <button
              className="btn-primary"
              onClick={() => {
                setBusqueda("");
                setCategoria("Todos");
              }}
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </section>

      <section className="promo-section">
        <div className="promo-copy">
          <span className="eyebrow">TU RITUAL, TU ESTILO</span>
          <h2>
            Un detalle puede cambiarlo <em>todo.</em>
          </h2>
          <p>
            Arma tu colección con productos que te hagan sentir increíble cada
            día.
          </p>
          <a href="#productos" className="btn-light">
            Encuentra tu favorito <ArrowRight size={18} />
          </a>
        </div>
        <div className="promo-illustration">
          <img
            src="/dibujo.png"
            alt="Ilustración de Divina Glow"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </section>

      <section className="about-section section-wrap" id="nosotros">
        <div className="about-mark">
          <img src="/divina.webp" alt="Logo Divina Glow" />
        </div>
        <div className="about-copy">
          <span className="eyebrow">UN POQUITO DE NOSOTROS</span>
          <h2>
            Tu belleza, <em>tu manera.</em>
          </h2>
          <p>
            En Divina Glow creemos que el maquillaje es una forma de expresión.
            Queremos ayudarte a encontrar productos que conecten con tu
            personalidad y te acompañen en cada versión de ti.
          </p>
          <a href="#contacto" className="btn-outline">
            Hablemos <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <section className="location-section section-wrap" id="ubicacion">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <MapPin size={14} /> ENCUÉNTRANOS
            </span>
            <h2>
              Ven a visitarnos, <em>te esperamos.</em>
            </h2>
            <p>
              Consulta el mapa y encuentra la ruta para llegar a nuestra tienda.
            </p>
          </div>
        </div>
        <div className="location-card">
          <div className="map-frame">
            <iframe
              title="Mapa de ubicación de Divina Glow"
              src="https://maps.google.com/maps?q=Acevedo%2C%20Huila%2C%20Colombia&t=&z=14&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="location-info">
            <MapPin size={28} />
            <h3>Divina Glow</h3>
            <p>
              Actualiza este mapa con la dirección exacta de tu local para que
              tus clientes puedan encontrarte fácilmente.
            </p>
            <a
              className="btn-primary"
              href="https://www.google.com/maps/search/?api=1&query=Acevedo,+Huila+Colombia"
              target="_blank"
              rel="noreferrer"
            >
              Cómo llegar <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="video-section" id="preguntas">
        <div className="video-inner">
          <span className="eyebrow">
            <PlayCircle size={15} /> INSPÍRATE CON DIVINA GLOW
          </span>
          <h2>
            Tu siguiente look <em>empieza aquí.</em>
          </h2>
          <p>Descubre nuestros productos y crea una rutina que hable de ti.</p>
          <div className="video-frame">
            <video controls preload="metadata" poster="/divina.webp">
              <source src="/video.mp4" type="video/mp4" />
              Tu navegador no puede reproducir este video. Comprueba que exista
              public/video.mp4.
            </video>
          </div>
          <a href="#productos" className="btn-primary">
            Ver productos <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="cart-dock" id="carrito">
        <button
          className="cart-summary cart-open-button"
          onClick={() => setCarritoAbierto(true)}
        >
          <span className="cart-icon">
            <ShoppingBag size={20} />
            <i>{cantidadTotal}</i>
          </span>
          <span>
            <b>Mi carrito</b>
            <small>
              {cantidadTotal} {cantidadTotal === 1 ? "artículo" : "artículos"}
            </small>
          </span>
        </button>
        <strong>{moneda(total)}</strong>
        <button
          className="dock-view-button"
          onClick={() => setCarritoAbierto(true)}
        >
          Ver carrito <ArrowRight size={17} />
        </button>
      </section>

      {carritoAbierto && (
        <div className="cart-overlay" onClick={() => setCarritoAbierto(false)}>
          <aside
            className="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mi carrito de compras"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-panel-header">
              <div>
                <span className="eyebrow">DIVINA GLOW</span>
                <h2>Mi carrito</h2>
              </div>
              <button
                className="cart-close"
                onClick={() => setCarritoAbierto(false)}
                aria-label="Cerrar carrito"
              >
                <X />
              </button>
            </div>
            {!carrito.length ? (
              <div className="cart-empty">
                <ShoppingBag size={42} />
                <h3>Tu carrito está vacío</h3>
                <p>Descubre tus productos favoritos.</p>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setCarritoAbierto(false);
                    document
                      .getElementById("productos")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explorar productos
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {carrito.map((p) => (
                    <article className="cart-item" key={p.id}>
                      <img src={p.imagen} alt={p.nombre} />
                      <div className="cart-item-info">
                        <h3>{p.nombre}</h3>
                        <strong>{moneda(precioFinal(p))}</strong>
                        <div className="quantity-controls">
                          <button
                            onClick={() => cambiarCantidad(p.id, -1)}
                            aria-label={`Disminuir ${p.nombre}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{p.cantidad}</span>
                          <button
                            onClick={() => cambiarCantidad(p.id, 1)}
                            aria-label={`Aumentar ${p.nombre}`}
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            className="remove-item"
                            onClick={() =>
                              setCarrito((actual) =>
                                actual.filter((item) => item.id !== p.id),
                              )
                            }
                            aria-label={`Eliminar ${p.nombre}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                      <b className="cart-item-subtotal">
                        {moneda(precioFinal(p) * p.cantidad)}
                      </b>
                    </article>
                  ))}
                </div>
                <div className="cart-panel-footer">
                  <div className="cart-total-row">
                    <span>Total del pedido</span>
                    <strong>{moneda(total)}</strong>
                  </div>
                  <p>
                    El costo y la disponibilidad del envío se confirman por
                    WhatsApp.
                  </p>
                  <button className="checkout-button" onClick={pedirWhatsApp}>
                    Confirmar pedido por WhatsApp <ArrowRight size={18} />
                  </button>
                  <button
                    className="continue-shopping"
                    onClick={() => setCarritoAbierto(false)}
                  >
                    Seguir comprando
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {mensaje && (
        <div className="toast" role="status">
          {mensaje}
        </div>
      )}
      {productoActivo && (
        <div className="modal-backdrop" onClick={() => setProductoActivo(null)}>
          <div
            className="quick-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setProductoActivo(null)}
              aria-label="Cerrar"
            >
              <X />
            </button>
            <div className="modal-image">
              <img src={productoActivo.imagen} alt={productoActivo.nombre} />
            </div>
            <div className="modal-copy">
              <span className="eyebrow">{productoActivo.categoria}</span>
              <h2>{productoActivo.nombre}</h2>
              <strong>{moneda(precioFinal(productoActivo))}</strong>
              {productoActivo.precioOferta &&
                productoActivo.precioOferta < productoActivo.precio && (
                  <del>{moneda(productoActivo.precio)}</del>
                )}
              <p>{productoActivo.descripcion}</p>
              <button
                className="btn-primary"
                onClick={() => {
                  agregar(productoActivo);
                  setProductoActivo(null);
                }}
              >
                <ShoppingBag size={17} />
                Agregar a la bolsa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
