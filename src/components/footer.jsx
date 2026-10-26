import {
  House,
  Package,
  Tag,
  UserRound,
  Phone,
  CircleHelp,
  Mail,
  Clock,
  Heart,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer" id="contacto">
      <div className="footer-main">
        <div className="footer-brand-col">
          <a className="brand footer-brand" href="#inicio">
            <img src="/divina.webp" className="brand-logo" alt="Divina Glow" />
            <span className="brand-name">
              Divina <b>Glow</b>
              <small>BEAUTY STORE</small>
            </span>
          </a>

          <p>
            Realzamos tu belleza con productos de calidad para cada ocasión.
            Brilla a tu manera.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.instagram.com/divinaglow"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <img src="/instagram-2016-5.svg" alt="Instagram" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <img src="/facebook-3-2.svg" alt="Facebook" />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <img src="/youtube-icon-5.svg" alt="YouTube" />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Explora</h3>
          <a href="#inicio">
            <House /> Inicio
          </a>
          <a href="#productos">
            <Package /> Productos
          </a>
          <a href="#ofertas">
            <Tag /> Ofertas
          </a>
          <a href="#nosotros">
            <UserRound /> Nosotros
          </a>
        </div>

        <div className="footer-column">
          <h3>¿Necesitas ayuda?</h3>
          <a href="#preguntas">
            <CircleHelp /> Preguntas
          </a>
          <a href="https://wa.me/573160746119">
            <Phone /> WhatsApp
          </a>
          <a href="mailto:divinaglow@gmail.com">
            <Mail /> Correo electrónico
          </a>
        </div>

        <div className="footer-column footer-contact">
          <h3>Atención al cliente</h3>
          <p>
            <Phone /> 316 074 6119
          </p>
          <p>
            <Mail /> divinaglow@gmail.com
          </p>
          <p>
            <Clock />
            <span>
              Lun–vie: 8:00 a. m. – 6:00 p. m.
              <br />
              Sáb: 9:00 a. m. – 2:00 p. m.
            </span>
          </p>
        </div>
      </div>

      <div className="payment-row">
        <span>Métodos de pago</span>
        <div className="payment-logos">
          <img src="/nequi-2.svg" alt="Nequi" />
          <img src="/logo-bre-b.svg" alt="Bancoomeva" />
          <img
            src="https://1000logos.net/wp-content/uploads/2017/06/VISA-Logo-2006.png"
            alt="Visa"
          />
          <img src="/daviplata.svg" alt="Daviplata" />
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Divina Glow. Todos los derechos
          reservados.
        </span>
        <span>
          Hecho con <Heart size={14} fill="currentColor" />
          para tu belleza.
        </span>
      </div>
    </footer>
  );
}
