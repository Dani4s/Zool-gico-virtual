// Clase abstracta Animal (simulada) 
class Animal {
    constructor(nombre, edad, vitalidad, umbralDeHambre, probabilidadEnfermar) {
        if (this.constructor === Animal) {
            throw new Error("No se puede instanciar una clase abstracta.");
        }
        this.nombre = nombre;
        this.edad = edad;
        this.vitalidad = vitalidad || 100; 
        this.estadoSalud = true;
        this.diasSinComer = 0;
        this.umbralDeHambre = umbralDeHambre;
        this.estaMuerto = false;
    }
    hacerSonido() {
        throw new Error("Método 'hacerSonido' debe ser implementado por las subclases.");
    }
    comer() {
        this.diasSinComer = 0;
        const anterior = this.vitalidad;
        this.vitalidad = Math.min(100, this.vitalidad + 20);
        const ganancia = this.vitalidad - anterior;
        log(`🍽️${this.getEmoji()} ${this.nombre} comió y recuperó ${ganancia} de vitalidad. Vitalidad actual: ${this.vitalidad}/100`);
    }
    darMedicamento() {
        this.estadoSalud = true;
        const anterior = this.vitalidad;
        this.vitalidad = Math.min(100, this.vitalidad + 30);
        const ganancia = this.vitalidad - anterior;
        log(`💉${this.getEmoji()} ${this.nombre} fue medicado y recuperó ${ganancia} de vitalidad. Vitalidad actual: ${this.vitalidad}/100`);
    }
    revisarEstado() {
        if (this.estaMuerto) return;
        if (this.diasSinComer >= this.umbralDeHambre) {
            this.hacerSonido();
            const hambreExtra = this.diasSinComer - this.umbralDeHambre + 1;
            const dañoPorHambre = hambreExtra * 5;
            this.vitalidad = Math.max(0, this.vitalidad - dañoPorHambre);
            log(`🧡${this.getEmoji()} pierde ${dañoPorHambre} de vitalidad por hambre. Vitalidad actual: ${this.vitalidad}/100`);
        }
        if (!this.estadoSalud) {
            const dañoPorEnfermedad = 10 + this.diasSinComer;
            this.vitalidad = Math.max(0, this.vitalidad - dañoPorEnfermedad);
            log(`🤢${this.getEmoji()} ${this.nombre} pierde ${dañoPorEnfermedad} de vitalidad por enfermedad. Vitalidad actual: ${this.vitalidad}/100`);
        }
        if (this.vitalidad <= 0) {
            this.estaMuerto = true;
            log(`💀${this.getEmoji()} ${this.nombre} ha muerto y será retirado del zoológico.`);
            return;
        }
        this.diasSinComer++;
        const excesoDeHambre = this.diasSinComer - this.umbralDeHambre;
        if (excesoDeHambre > 0) {
            const probabilidad = Math.min(1, excesoDeHambre * 0.15);
            if (Math.random() < probabilidad) {
                this.estadoSalud = false;
                log(`🤒${this.getEmoji()} ${this.nombre} se ha enfermado por pasar hambre (${this.diasSinComer} días sin comer).`);
            }
        }
    }
}
// Interfaces de comportamiento
const ITerrestre = (Base) => class extends Base {
    correr() {
        log(`${this.nombre} está corriendo.`);
    }
};
const IAereo = (Base) => class extends Base {
    volar() {
        log(`${this.nombre} está volando.`);
    }
};
const IMaritimo = (Base) => class extends Base {
    nadar() {
        log(`${this.nombre} está nadando.`);
    }
};
const ICuidable = (Base) => class extends Base {
    constructor(...args) {
        super(...args);
        this.probabilidadDeCuidado = 0.1;
    }
    getEmoji() {
        if (this instanceof Leon) return "🦁";
        if (this instanceof Cebra) return "🦓";
        if (this instanceof Elefante) return "🐘";
        if (this instanceof Aguila) return "🦅";
        if (this instanceof Buho) return "🦉";
        if (this instanceof Tiburon) return "🦈";
        if (this instanceof Delfin) return "🐬";
        if (this instanceof Rana) return "🐸";
        if (this instanceof Salamandra) return "🦎";
        if (this instanceof Loro) return "🦜";
        return "🐾";
    }
    revisarEstado() {
        super.revisarEstado();
        if (this.estaMuerto) return;
        if (this.diasSinComer >= this.umbralDeHambre) {
            log(`⚠️${this.getEmoji()} ${this.nombre} tiene hambre (días sin comer: ${this.diasSinComer}).`);
        } else {
            log(`✅${this.getEmoji()} ${this.nombre} no tiene hambre (días sin comer: ${this.diasSinComer}).`);
        }
        if (!this.estadoSalud) {
            log(`❌${this.getEmoji()} ${this.nombre} está enfermo.`);
        } else {
            log(`💚${this.getEmoji()} ${this.nombre} está sano.`);
        }
        this.probabilidadDeCuidado = Math.min(1, this.probabilidadDeCuidado + 0.1);
    }
    alimentar() {
        if (this.diasSinComer >= this.umbralDeHambre) {
            if (Math.random() < this.probabilidadDeCuidado) {
                this.comer();
                this.probabilidadDeCuidado = 0.1;
            } else {
                log(`🕒${this.getEmoji()} ${this.nombre} no fue alimentado hoy.`);
            }
        }
    }
    medicar() {
        if (!this.estadoSalud) {
            if (Math.random() < this.probabilidadDeCuidado) {
                this.darMedicamento();
                log(`💊${this.getEmoji()} ${this.nombre} fue medicado.`);
                this.probabilidadDeCuidado = 0.1;
            } else {
                log(`🕒${this.getEmoji()} ${this.nombre} no fue medicado hoy.`);
            }
        }
    }
};
// Subclases de especies
class Mamifero extends Animal {
    constructor(nombre, edad, vitalidad, umbralDeHambre) {
        super(nombre, edad, vitalidad, umbralDeHambre);
        this.tipoSangre = "caliente";
    }
    accionesEspeciales() {
        const acciones = [
            () => log(`👶🦴${this.getEmoji()} ${this.nombre} cuida a sus crías.`),
            () => log(`🌞${this.getEmoji()} ${this.nombre} se calienta al sol.`),
            () => log(`🌳${this.getEmoji()} ${this.nombre} marca su territorio.`),
            () => log(`🛌${this.getEmoji()} ${this.nombre} duerme profundamente.`),
            () => log(`🐾${this.getEmoji()} ${this.nombre} juega con otros mamíferos.`),
        ];
        if (Math.random() < 0.02) acciones[Math.floor(Math.random() * acciones.length)]();
    }
}
class Ave extends Animal {
    constructor(nombre, edad, vitalidad, umbralDeHambre) {
        super(nombre, edad, vitalidad, umbralDeHambre);
        this.tipoSangre = "caliente";
    }
    accionesEspeciales() {
        const acciones = [
            () => log(`🏡${this.getEmoji()} ${this.nombre} construye un nido.`),
            () => log(`🎶${this.getEmoji()} ${this.nombre} canta una melodía.`),
            () => log(`🌬️${this.getEmoji()} ${this.nombre} planea con el viento.`),
            () => log(`🪺${this.getEmoji()} ${this.nombre} incuba huevos.`),
            () => log(`🐦${this.getEmoji()} ${this.nombre} hace una danza aérea.`),
        ];
        if (Math.random() < 0.02) acciones[Math.floor(Math.random() * acciones.length)]();
    }
}
class Pez extends Animal {
    constructor(nombre, edad, vitalidad, umbralDeHambre) {
        super(nombre, edad, vitalidad, umbralDeHambre);
        this.tipoSangre = "fría";
    }
    accionesEspeciales() {
        const acciones = [
            () => log(`🐟${this.getEmoji()} ${this.nombre} nada en un banco de peces.`),
            () => log(`🌊${this.getEmoji()} ${this.nombre} salta fuera del agua brevemente.`),
            () => log(`💨${this.getEmoji()} ${this.nombre} se esconde en las algas.`),
            () => log(`🫧${this.getEmoji()} ${this.nombre} hace burbujas.`),
            () => log(`🍴${this.getEmoji()} ${this.nombre} caza peces pequeños.`),
        ];
        if (Math.random() < 0.02) acciones[Math.floor(Math.random() * acciones.length)]();
    }
}
class Anfibio extends Animal {
    constructor(nombre, edad, vitalidad, umbralDeHambre) {
        super(nombre, edad, vitalidad, umbralDeHambre);
        this.tipoSangre = "fría";
    }
    accionesEspeciales() {
        const acciones = [
            () => log(`🦎${this.getEmoji()} ${this.nombre} muda su piel.`),
            () => log(`💦${this.getEmoji()} ${this.nombre} salta en un charco.`),
            () => log(`🐛${this.getEmoji()} ${this.nombre} caza insectos.`),
            () => log(`🌫️${this.getEmoji()} ${this.nombre} se camufla con su entorno.`),
            () => log(`🎶${this.getEmoji()} ${this.nombre} croa fuerte.`),
        ];
        if (Math.random() < 0.02) acciones[Math.floor(Math.random() * acciones.length)]();
    }
}
class Especial extends IMaritimo(IAereo(ITerrestre(Animal))) {
    constructor(nombre, edad, vitalidad, umbralDeHambre) {
        super(nombre, edad, vitalidad, umbralDeHambre);
        this.tipoSangre = "variable";
    }
    accionesEspeciales() {
        const acciones = [
            () => log(`🎩${this.getEmoji()} ${this.nombre} hace un truco para los visitantes.`),
            () => log(`✨${this.getEmoji()} ${this.nombre} cambia de color.`),
            () => log(`🌀${this.getEmoji()} ${this.nombre} gira sobre sí mismo.`),
            () => log(`💫${this.getEmoji()} ${this.nombre} hace una acrobacia.`),
            () => log(`🔮${this.getEmoji()} ${this.nombre} imita un sonido humano.`),
            () => {
                this.correr();
                log(`🏃‍♂️${this.getEmoji()} ${this.nombre} corre velozmente.`);
            },
            () => {
                this.volar();
                log(`✈️${this.getEmoji()} ${this.nombre} vuela por el cielo.`);
            },
            () => {
                this.nadar();
                log(`🏊‍♂️${this.getEmoji()} ${this.nombre} nada en el agua.`);
            },
        ];
        if (Math.random() < 0.02) acciones[Math.floor(Math.random() * acciones.length)]();
    }
}
// Ejemplos de animales
class Leon extends Mamifero {
    constructor(nombre, edad) {
        super(nombre, edad, 120, 4);
    }
    hacerSonido() {
        log(`🚨${this.getEmoji()} ¡${this.nombre} ruge porque tiene hambre!`);
    }
}
class Cebra extends Mamifero {
    constructor(nombre, edad) {
        super(nombre, edad, 110, 3);
    }
    hacerSonido() {
        log(`🚨${this.getEmoji()} ¡${this.nombre} relincha porque tiene hambre!`);
    }
}
class Elefante extends Mamifero {
    constructor(nombre, edad) {
        super(nombre, edad, 60, 4);
    }
    hacerSonido() {
        log(`🚨${this.getEmoji()} ¡${this.nombre} barrita porque tiene hambre!`);
    }
}
class Aguila extends Ave {
    constructor(nombre, edad) {
        super(nombre, edad, 200, 3);
    }
    hacerSonido() {
        log(`🚨${this.getEmoji()} ¡${this.nombre} grazna porque tiene hambre!`);
    }
}
class Buho extends Ave {
    constructor(nombre, edad) {
        super(nombre, edad, 180, 2);
    }
    hacerSonido() {
        log(`🚨${this.getEmoji()} ¡${this.nombre} ulula porque tiene hambre!`);
    }
}
class Tiburon extends Pez {
    constructor(nombre, edad) {
        super(nombre, edad, 300, 3);
    }
    hacerSonido() {
        log(`🚨${this.getEmoji()} ¡${this.nombre} hace burbujas porque tiene hambre!`);
    }
}
class Delfin extends Pez {
    constructor(nombre, edad) {
        super(nombre, edad, 250, 3);
    }
    hacerSonido() {
        log(`🚨${this.getEmoji()} ¡${this.nombre} chilla porque tiene hambre!`);
    }
}
class Rana extends Anfibio {
    constructor(nombre, edad) {
        super(nombre, edad, 180, 2);
    }
    hacerSonido() {
        log(`🚨${this.getEmoji()} ¡${this.nombre} croa porque tiene hambre!`);
    }
}
class Salamandra extends Anfibio {
    constructor(nombre, edad) {
        super(nombre, edad, 120, 3);
    }
    hacerSonido() {
        log(`🚨${this.getEmoji()} ¡${this.nombre} silba porque tiene hambre!`);
    }
}
class Loro extends Especial {
    constructor(nombre, edad) {
        super(nombre, edad, 150, 2);
    }
    hacerSonido() {
        log(`🚨${this.getEmoji()} ¡${this.nombre} imita sonidos porque tiene hambre!`);
    }
}
// Versiones con cuidado automático
class LeonCuidable extends ICuidable(ITerrestre(Leon)) { }
class CebraCuidable extends ICuidable(ITerrestre(Cebra)) { }
class ElefanteCuidable extends ICuidable(ITerrestre(Elefante)) { }
class AguilaCuidable extends ICuidable(IAereo(Aguila)) { }
class BuhoCuidable extends ICuidable(IAereo(Buho)) { }
class TiburonCuidable extends ICuidable(IMaritimo(Tiburon)) { }
class DelfinCuidable extends ICuidable(IMaritimo(Delfin)) { }
class RanaCuidable extends ICuidable(IMaritimo(ITerrestre(Rana))) { }
class SalamandraCuidable extends ICuidable(IMaritimo(ITerrestre(Salamandra))) { }
class LoroCuidable extends ICuidable(ITerrestre(IAereo(IMaritimo(Loro)))) { }
// Utilidades
const esperar = ms => new Promise(resolve => setTimeout(resolve, ms));
// Zoológico
const zoo = [
    new LeonCuidable("León Simba", 5),
    new CebraCuidable("Cebra Zoe", 4),
    new ElefanteCuidable("Elefante Ellie", 10),
    new AguilaCuidable("Águila Real", 3),
    new BuhoCuidable("Búho Nocturno", 2),
    new TiburonCuidable("Tiburón Blanco", 8),
    new DelfinCuidable("Delfín Playa", 6),
    new RanaCuidable("Rana Saltarina", 1),
    new SalamandraCuidable("Salamandra Fuego", 2),
    new LoroCuidable("Loro Paco", 3)
];
let diasTotalesSimulados = 0;
let simulacionEnCurso = false;
async function simularZoo(diasAdicionales) {
    if (simulacionEnCurso) return;
    simulacionEnCurso = true;
    const inicioDia = diasTotalesSimulados + 1;
    const finDia = diasTotalesSimulados + diasAdicionales;
    for (let dia = inicioDia; dia <= finDia; dia++) {
        log(`--- Día ${dia} ---`);
        for (let i = zoo.length - 1; i >= 0; i--) {
            const animal = zoo[i];
            animal.revisarEstado();
            if (animal.estaMuerto) {
                zoo.splice(i, 1);
                continue;
            }
            animal.accionesEspeciales?.();
            if (animal.diasSinComer >= animal.umbralDeHambre) animal.alimentar();
            if (!animal.estadoSalud) animal.medicar();
        }
        // 🔁 Verificar si todos murieron después del procesamiento del día
        if (zoo.length === 0) {
            log("☠️ Todos los animales han muerto. La simulación ha terminado.");
            log("🔁 Puedes reiniciar la simulación haciendo clic en el botón.");
            botonSimulacion.textContent = "Reiniciar simulación";
            botonSimulacion.onclick = async function () {
                reiniciarSimulacion();
                botonSimulacion.textContent = "Simulando...";
                botonSimulacion.disabled = true;
                await simularZoo(100);
                botonSimulacion.disabled = false;
                botonSimulacion.textContent = "Simular 100 días más";
            };
            return;
        }
        simulacionEnCurso = false;
        await esperar(50);
    }
    diasTotalesSimulados = finDia;
}
// Registro en interfaz
function log(message) {
    const logElement = document.getElementById("log");
    logElement.textContent += message + "\n";
    logElement.scrollTop = logElement.scrollHeight;
}
// Botón de simulación
const botonSimulacion = document.getElementById("startSimulation");
botonSimulacion.onclick = async function () {
    if (zoo.length === 0) {
        // Si no hay animales, reiniciar la simulación
        reiniciarSimulacion();
        botonSimulacion.textContent = "Simulando...";
        botonSimulacion.disabled = true;
        await simularZoo(100);
        botonSimulacion.disabled = false;
        botonSimulacion.textContent = "Simular 100 días más";
    } else {
        // Si hay animales, simular 100 días adicionales
        botonSimulacion.textContent = "Simulando...";
        botonSimulacion.disabled = true;
        log(`📅 Simulando días ${diasTotalesSimulados + 1} a ${diasTotalesSimulados + 100}...`);
        await simularZoo(100);
        botonSimulacion.disabled = false;
        if (zoo.length === 0) {
            botonSimulacion.textContent = "Reiniciar simulación";
        } else {
            botonSimulacion.textContent = "Simular 100 días más";
        }
    }
};
function reiniciarSimulacion() {
    zoo.length = 0;
    zoo.push(
        new LeonCuidable("León Simba", 5),
        new CebraCuidable("Cebra Zoe", 4),
        new ElefanteCuidable("Elefante Ellie", 10),
        new AguilaCuidable("Águila Real", 3),
        new BuhoCuidable("Búho Nocturno", 2),
        new TiburonCuidable("Tiburón Blanco", 8),
        new DelfinCuidable("Delfín Playa", 6),
        new RanaCuidable("Rana Saltarina", 1),
        new SalamandraCuidable("Salamandra Fuego", 2),
        new LoroCuidable("Loro Paco", 3)
    );
    diasTotalesSimulados = 0;
    document.getElementById("log").textContent = "";
    log("🔄 Se ha reiniciado la simulación desde el día 1.");
}