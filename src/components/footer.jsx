import * as iconos from "lucide-react";
export function Footer() {
  return (
    <>
      <div className="footer">
        <h2>Divina Glow</h2>
        <div className="flex">
          <div className="barra">
            <a href="">Inicio</a>
            <a href="">Producto</a>
            <a href="">Servicio</a>
            <a href="">Contacto</a>
          </div>
        </div>
        <div className="flex">
          <div className="info">
            <div className="ubicacion">
              <img className="img-logo" src="divina.webp" alt="" />
              <p>
                Realzamos tu belleza con productos de calidad para cada ocacion
              </p>
            </div>
            <div className="enlace">
              <h3>Enlaces rapidos</h3>
              <a href="">
                <iconos.House className="icons" />
                Inicio
              </a>
              <a href="">
                <iconos.Package className="icons" />
                Productos
              </a>
              <a href="">
                <iconos.Tag className="icons" />
                Ofertas
              </a>

              <a href="">
                <iconos.UserRoundCog className="icons" />
                Nosotros
              </a>
              <a href="">
                <iconos.CircleQuestionMark className="icons" />
                Preguntas
              </a>
              <a href="">
                <iconos.Phone className="icons" />
                Contacto
              </a>
            </div>
            <div className="contacto">
              <h3>Atencio al cliente</h3>
              <a href="" className="imagen">
                WhatsApp <a href="">3160746119</a>
              </a>
            </div>
            <div className="sigue">
              <h3>síguenos</h3>
              <a href="">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Instagram_Glyph_Gradient_RGB_logo.svg/960px-Instagram_Glyph_Gradient_RGB_logo.svg.png"
                  alt="imagen"
                />
                @divinaglow
              </a>
              <br />
              <br />

              <a href="">
                <img
                  src="https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338432_960_720.png"
                  alt="imagen"
                />
                @divinaglow
              </a>
              <br />
              <br />

              <a href="">
                <img
                  src="https://png.pngtree.com/png-clipart/20230401/original/pngtree-facebook-icon-png-image_9015416.png"
                  alt="imagen"
                />
                /divinaglow
              </a>
              <br />
              <br />

              <a href="">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1280px-YouTube_full-color_icon_%282017%29.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail"
                  alt="imagen"
                />
                /divinaglow
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
