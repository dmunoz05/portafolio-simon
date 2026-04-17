import './Infografy.css'

export default function Infografy() {
    return (
        <section id="infografy">
            <img src="/image_left.png" alt="" className="infografy-side-img infografy-side-img--left" />
            <div className="infografy-container">
                <h2 className="infografy-title">Yo soy Simon</h2>
                <div className="infografy-text">
                    <span>
                        Con una mirada formada entre el cine europeo de autor y la vitalidad visual latinoamericana, Simon ha desarrollado un lenguaje cinematográfico propio: íntimo, deliberado y emocionalmente preciso.

                        Cada proyecto es un ejercicio de atención. La luz no se coloca, se descubre. La historia no se filma, se escucha y luego se traduce en imágenes que perduran.

                        Especializado en bodas de alta gama, documentales y contenido de marca, Simon colabora con directores, marcas de lujo y artistas que entienden que la forma es parte del fondo.
                    </span>
                </div>
            </div>
            <img src="/image_right.png" alt="" className="infografy-side-img infografy-side-img--right" />
        </section>
    )
}