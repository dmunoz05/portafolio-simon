import './Infografy.css'

export default function Infografy() {
    return (
        <section id="infografy">
            <img src="/image_left.png" alt="Cinematic side shot left" className="infografy-side-img infografy-side-img--left" />
            <div className="infografy-container">
                <h2 className="infografy-title">Yo soy Simón</h2>
                <div className="infografy-text">
                    <span>
                        Fotógrafo y diseñador audiovisual colombiano con una visión forjada entre la calle y el estudio. Creo en la fotografía como lenguaje: cada encuadre es una decisión, cada luz una intención.

                        Estudié diseño audiovisual y ese conocimiento vive en cada trabajo: la composición, el color y el movimiento no son accidentes, son elecciones.

                        Trabajo con personas, marcas y proyectos que quieren dejar una huella visual auténtica. Si tienes una historia, yo tengo la imagen para contarla.
                    </span>
                </div>
            </div>
            <img src="/image_right.png" alt="Cinematic side shot right" className="infografy-side-img infografy-side-img--right" />
        </section>
    )
}