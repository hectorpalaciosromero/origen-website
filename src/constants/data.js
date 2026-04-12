
/* Navegación */
export const NAV_LINKS = [
  { label: 'Inicio', to: '/', icon: 'bi-house-door' },
  { label: 'Filosofía', to: '/quienes-somos', icon: 'bi-people' },
  {
    label: 'La Experiencia',
    to: '/productos',
    icon: 'bi-basket',
    children: [{ label: 'Nuestros Orígenes', to: '/proveedores', icon: 'bi-truck' }],
  },
  { label: 'Reservas', to: '/contacto', icon: 'bi-envelope' },
];

export const QUICK_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Nuestra Filosofía', to: '/quienes-somos' },
  { label: 'La Experiencia', to: '/productos' },
  { label: 'Productores', to: '/proveedores' },
  { label: 'Reservas', to: '/contacto' },
];

/* Hero Carousel */
export const HERO_SLIDES = [
  {
    src: `${process.env.PUBLIC_URL}/hero-main.png`,
    alt: 'Una travesía sensorial.',
    interval: 8000,
  },
  {
    src: `${process.env.PUBLIC_URL}/hero-ceviche.jpg`,
    alt: 'Un homenaje al terruño peruano.',
    interval: 5000,
  },
  {
    src: `${process.env.PUBLIC_URL}/hero-lomo.jpg`,
    alt: 'Técnica ancestral. Visión contemporánea.',
    interval: 5000,
  },
];

/* Stats  Contadores */
export const STATS = [
  { value: 15, suffix: '+', label: 'Años de Excelencia', icon: 'bi-calendar-heart' },
  { value: 100, suffix: '%', label: 'Trazabilidad Local', icon: 'bi-egg-fried' },
  { value: 3, suffix: '', label: 'Santuarios Gastronómicos', icon: 'bi-geo-alt-fill' },
  { value: 25, suffix: 'k', label: 'Comensales Cautivados', icon: 'bi-heart-fill' },
];

/* Testimonios */
export const TESTIMONIALS = [
  {
    name: 'J. Valderrama',
    role: 'Crítico, Guía Élite Culinaria',
    avatar: '🍷',
    text: 'ORIGEN no es un restaurante, es un viaje antropológico por el Perú a través del paladar. Su manejo de las texturas andinas y la acidez de la costa es, simplemente, de otro planeta.',
    rating: 5,
  },
  {
    name: 'Eleanor Sterling',
    role: 'Editora de Lifestyle',
    avatar: '✒️',
    text: 'Impecable curaduría de ingredientes. El respeto por el productor local se siente en cada bocado. La carta de autor logra un equilibrio perfecto entre la nostalgia y la vanguardia.',
    rating: 5,
  },
  {
    name: 'S. Watanabe',
    role: 'Chef Internacional',
    avatar: '🔪',
    text: 'Me quito el sombrero frente a su técnica. Logran extraer la esencia más pura del ají limo y combinarla con una delicadeza técnica que rivaliza con las cocinas más premiadas del mundo.',
    rating: 5,
  },
  {
    name: 'Isabella R.',
    role: 'Miembro Exclusivo',
    avatar: '🥂',
    text: 'La atmósfera, el nivel de detalle en la vajilla tallada a mano, y el maridaje profundo de cada plato hacen de ORIGEN la experiencia más sofisticada de Lima actual.',
    rating: 5,
  },
];

/* Menú  Carta */
export const MENU_CATEGORIES = [
  {
    id: 'entradas',
    label: 'Preludios',
    icon: 'bi-egg-fried',
    items: [
      {
        name: 'Causa de Autor',
        price: 'S/ 35',
        img: `${process.env.PUBLIC_URL}/menu-causa.png`,
        desc: 'Emulsión de papa amarilla sagrada y toques cítricos.',
        longDesc: 'Una reinterpretación de nuestro patrimonio. Fina textura de papa amarilla cultivada a 3000 m.s.n.m, emulsionada con ají amarillo fresco, coronada con tartar de pollo de corral y ceniza de aceituna botija.',
      },
      {
        name: 'Tequeños Andinos',
        price: 'S/ 32',
        img: `${process.env.PUBLIC_URL}/menu-tequenos.jpeg`,
        desc: 'Texturas invertidas con queso artesanal de altura.',
        longDesc: 'Fina masa filo envuelta a mano, rellena de tiernos quesos madurados en los Andes cajamarquinos. Se sirve acompañado de una emulsión de huacatay silvestre y un coral de guacamole criollo.',
      },
      {
        name: 'Elixir de Tigre',
        price: 'S/ 48',
        img: `${process.env.PUBLIC_URL}/menu-leche-tigre.png`,
        desc: 'Nuestra firma concentrada de acidez y frescura del Pacífico.',
        longDesc: 'Un shot de vitalidad pura. Extracto lento de pesca fresca del día, limón sutil peruano, ají limo glacé y un toque de culantro orgánico. Servido en hielo esculpido para conservar su temperatura perfecta.',
      },
      {
        name: 'Ocopa Ancestral',
        price: 'S/ 38',
        img: `${process.env.PUBLIC_URL}/menu-ocopa.png`,
        desc: 'Tributo arequipeño sobre papas nativas.',
        longDesc: 'Un retorno a los orígenes. Colección de papas nativas de colores bañadas en una crema tibia y aterciopelada de huacatay, ají mirasol ahumado y nueces andinas tostadas al vacío.',
      },
    ],
  },
  {
    id: 'principales',
    label: 'El Viaje Principal',
    icon: 'bi-star-fill',
    items: [
      {
        name: 'Ceviche ORIGEN',
        price: 'S/ 65',
        img: `${process.env.PUBLIC_URL}/menu-ceviche-origen.png`,
        desc: 'Tributo al Océano. Pesca del día curada al instante.',
        longDesc: 'Nuestra obra cumbre. Finas láminas de pesca blanca obtenida mediante pesca artesanal sostenible, curadas por escasos segundos en limón chulucanas. Terminado con glaseado de camote y crocante de chullpi andino.',
      },
      {
        name: 'Ceviche Caliente a la Piedra',
        price: 'S/ 72',
        img: `${process.env.PUBLIC_URL}/menu-ceviche.png`,
        desc: 'Contraste térmico de frutos del mar.',
        longDesc: 'Una experiencia sensorial. Selección de mariscos de aguas profundas sellados fugazmente sobre piedra volcánica andina, sumergidos en una leche de tigre cremosa de ají amarillo asado.',
      },
      {
        name: 'Gallina en Texturas',
        price: 'S/ 58',
        img: `${process.env.PUBLIC_URL}/menu-gallina.png`,
        desc: 'Nuestra visión contemporánea del clásico Ají de Gallina.',
        longDesc: 'Pechuga confitada a baja temperatura por 12 horas, cubierta por una untuosa salsa de ají amarillo orgánico, pecanas amazónicas y parmesano madurado. Servida con polvos de aceituna negra.',
      },
      {
        name: 'Lomo Saltar Al Fuego',
        price: 'S/ 75',
        img: `${process.env.PUBLIC_URL}/menu-lomo.png`,
        desc: 'Lomo fino flameado frente a sus ojos.',
        longDesc: 'Centro de lomo premium (Angus) sellado al wok con técnica de ahumado rápido, reduciendo un fondo de res de 48 horas, pisco puro y vinagre de manzana artesanal. Acompañado de papas amarillas trufadas.',
      },
      {
        name: 'Arroz Verde del Norte',
        price: 'S/ 60',
        img: `${process.env.PUBLIC_URL}/menu-arroz.png`,
        desc: 'Joya chiclayana perfumada con cilantro silvestre.',
        longDesc: 'Arroz meloso cultivado en el norte patrio, hidratado en chicha de jora añeja, cerveza negra artesanal pura y un extracto profundo de culantro. Servido con magret de pato tierno sellado en su propia grasa.',
      },
    ],
  },
  {
    id: 'postres',
    label: 'Cierre Dulce',
    icon: 'bi-cake2-fill',
    items: [
      {
        name: 'Brisa Limeña (Suspiro)',
        price: 'S/ 35',
        img: `${process.env.PUBLIC_URL}/menu-suspiro.png`,
        desc: 'Nubosidad de oporto sobre manjar de olla.',
        longDesc: 'La elegancia colonial rediseñada. Un manjar blanco cocido lentamente al baño maría por 6 horas, interrumpido por una nube etérea de merengue italiano al vino Oporto oscuro y polvo de canela orgánica.',
      },
      {
        name: 'Cacao Amazónico 70%',
        price: 'S/ 38',
        img: `${process.env.PUBLIC_URL}/menu-leche-asada.png`,
        desc: 'Cúpula de chocolate de origen Tarapoto.',
        longDesc: 'Homenaje al cacao peruano galarndondo a nivel mundial. Esfera de chocolate bitter amazónico rellena con un corazón líquido de maracuyá fresco y cristales de sal de Maras.',
      },
      {
        name: 'Picarones de Autor',
        price: 'S/ 28',
        img: `${process.env.PUBLIC_URL}/menu-picarones.png`,
        desc: 'Aros dorados de camote y macambo bañado en miel exótica.',
        longDesc: 'Esponjosos aros fritos a temperatura exacta, elaborados con una masa fermentada de zapallo loche y semilla de macambo de la selva. Bañados en una sedosa miel de chancaca infusionada con hojas de higo.',
      },
    ],
  },
  {
    id: 'bebidas',
    label: 'Botánica & Vaso',
    icon: 'bi-cup-straw',
    items: [
      {
        name: 'Tributo de Maíz Morado',
        price: 'S/ 18',
        img: `${process.env.PUBLIC_URL}/menu-chicha.png`,
        desc: 'Infusión en frío de nuestras mazorcas sagradas.',
        longDesc: 'Chicha botánica elaborada mediante un prensado en frío de maíz morado canteño, piña golden, membrillo, especias aromáticas y un hielo cristalino con esencia cítrica.',
      },
      {
        name: 'Pisco Sour Patrimonio',
        price: 'S/ 45',
        img: `${process.env.PUBLIC_URL}/menu-pisco.png`,
        desc: 'La coctelería bandera en su expresión más purista.',
        longDesc: 'Magia líquida. Pisco Quebranta de bodega boutique del valle de Ica, almíbar artesanal de caña, limón sutil de Piura y clara batida al punto nieve, finalizado con gotas de nuestro amargo aromático de la casa.',
      },
    ],
  },
];

/* Quiénes Somos  Pilares */
export const PILLARS = [
  {
    icon: 'bi-star',
    title: 'Respeto Absoluto',
    text: 'Entendemos el ingrediente no como un recurso, sino como un regalo de la tierra que merece ser tratado con majestuosidad.',
  },
  {
    icon: 'bi-gem',
    title: 'Trazabilidad',
    text: 'Conocemos el nombre y la historia de cada agricultor, pescador y artesano que colabora en nuestra cocina.',
  },
  {
    icon: 'bi-compass',
    title: 'Vanguardia Inherente',
    text: 'Honramos el recetario milenario del Perú cruzando audazmente la frontera hacia la alta gastronomía moderna.',
  },
  {
    icon: 'bi-wind',
    title: 'Efimeridad',
    text: 'Nuestra propuesta cambia según los caprichos del clima y el mar, garantizando una experiencia irrepetible.',
  },
];

/* Productos por Región */
export const REGION_PRODUCTS = [
  {
    id: 'costa',
    img: `${process.env.PUBLIC_URL}/region-costa.jpg`,
    title: 'El Pacífico',
    badge: 'Profundidad & Brisa',
    badgeIcon: 'bi-water',
    excerpt:
      'Las frías aguas de la corriente de Humboldt proveen un crisol de biodiversidad. Es aquí donde la acidez, la salinidad perfecta y la frescura marina dictan el ritmo de nuestras manos.',
    highlights: ['Pesca sostenible', 'Selección de ajíes costeros', 'Limón de valles desérticos'],
  },
  {
    id: 'sierra',
    img: `${process.env.PUBLIC_URL}/region-sierra.jpg`,
    title: 'Los Andes',
    badge: 'Altura & Herencia',
    badgeIcon: 'bi-triangle-fill',
    excerpt:
      'En la cordillera, la comida es un ritual. Rescatamos tubérculos olvidados, hierbas de extrema altitud y técnicas de cocción bajo tierra (Pachamanca) que infunden un sabor inigualable.',
    highlights: ['Tubérculos nativos', 'Hierbas de altura (Huacatay)', 'Cereales andinos milenarios'],
  },
  {
    id: 'selva',
    img: `${process.env.PUBLIC_URL}/region-selva.jpg`,
    title: 'La Amazonía',
    badge: 'Follaje & Misterio',
    badgeIcon: 'bi-tree-fill',
    excerpt:
      'El pulmón del mundo esconde ingredientes que desafían la imaginación. Frutos exóticos, pescados de río y cacaos salvajes añaden dimensiones inexploradas a nuestra propuesta de autor.',
    highlights: ['Cacao silvestre', 'Pescados de río', 'Frutos endémicos (Copoazú)'],
  },
];

/* Proveedores */
export const SUPPLIERS = [
  {
    id: 'lima',
    title: 'Red de Pesca Responsable',
    region: 'El Litoral',
    regionIcon: 'bi-water',
    img: `${process.env.PUBLIC_URL}/supplier-lima.png`,
    text: 'En ORIGEN, la excelencia comienza mucho antes de que el fuego se encienda. Mantenemos una alianza de comercio directo y justo con las cofradías de pescadores artesanales del litoral sur. Cada madrugada, nos reservan las piezas más puras capturadas sin redes de arrastre, garantizando un ecosistema pacífico que perdurará por generaciones.',
    reverse: false,
  },
  {
    id: 'cusco',
    title: 'Comunidades Altas',
    region: 'Valle Sagrado de los Incas',
    regionIcon: 'bi-triangle-fill',
    img: `${process.env.PUBLIC_URL}/supplier-cusco.png`,
    text: 'Hemos cruzado los andes para establecer un círculo de confianza exclusivo con agricultores de comunidades nativas del Cusco. De ellos obtenemos sales rosadas de origen, maíces gigantes seleccionados a mano y tubérculos que maduran bajo soles extremos, logrando notas de sabor que las producciones industriales simplemente no pueden soñar con replicar.',
    reverse: true,
  },
  {
    id: 'cajamarca',
    title: 'Maestros Lecheros',
    region: 'Praderas del Norte',
    regionIcon: 'bi-tree-fill',
    img: `${process.env.PUBLIC_URL}/supplier-cajamarca.png`,
    text: 'La textura fundente de nuestros quesos madurados y la cremosidad etérea de nuestros postres le deben su vida a las haciendas cajamarquinas. Respetamos el ritmo biológico de los rebaños alimentados exclusivamente en pastos naturales de alta montaña, logrando lácteos de un perfil aromático y pureza insuperable.',
    reverse: false,
  },
];

/* Sedes */
export const LOCATIONS = [
  {
    id: 'san-isidro-financiero',
    name: 'ORIGEN — The Sanctuary',
    address: 'Av. Santo Toribio 173, San Isidro 15073',
    phone: '987 789 987',
    hours: 'Solo con Reserva | Lun-Dom: 12:00 - 23:00',
    desc: 'Nuestro buque insignia. Una proeza arquitectónica forjada en maderas nobles y luz tenue en el corazón del Centro Financiero. Un salón donde el frenesí de la ciudad se apaga para ceder el paso exclusivamente a los sentidos.',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.9997103723385!2d-77.03223122409053!3d-12.119033343169055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8163f974797%3A0x6bba3bc7a4990da4!2sParque%20Kennedy!5e0!3m2!1ses!2spe!4v1719948490469!5m2!1ses!2spe',
  },
  {
    id: 'san-isidro-olivar',
    name: 'ORIGEN — The Grove',
    address: 'Av. Los Conquistadores 1200, San Isidro 15073',
    phone: '987 789 987',
    hours: 'Solo con Reserva | Lun-Dom: 12:00 - 23:30',
    desc: 'Rodeado de la serenidad milenaria del Bosque El Olivar. Diseñado con ventanales de cristal ininterrumpidos y un purismo estético que permite que el verdor del entorno sea el complemento perfecto de la alta gastronomía.',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.077673523428!2d-77.0428751!3d-12.1136979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c83d49a42105%3A0x286f9b6cd5dbfcd1!2sMalec%C3%B3n%20Cisneros!5e0!3m2!1ses!2spe!4v1719948490469!5m2!1ses!2spe',
  },
  {
    id: 'san-isidro-dasso',
    name: 'ORIGEN — The Vault',
    address: 'Calle Miguel Dasso 160, San Isidro 15073',
    phone: '987 789 987',
    hours: 'Solo con Reserva | Lun-Dom: 11:30 - 00:00',
    desc: 'Un recinto culinario ultraexclusivo en la avenida más diplomática de Lima. Una galería subterránea de arte y buen gusto donde la bóveda acústica silencia el mundo exterior para que el sabor sea el único protagonista.',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15603.541602737664!2d-77.03713028261718!3d-12.127815299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c819bc8d2ec1%3A0xe9f7addba273b4d8!2sLarcomar!5e0!3m2!1ses!2spe!4v1719948490469!5m2!1ses!2spe',
  },
];

/* Redes sociales */
export const SOCIAL_LINKS = [
  { icon: 'bi-instagram', href: 'https://instagram.com/', label: 'Instagram' },
  { icon: 'bi-facebook', href: 'https://facebook.com/', label: 'Facebook' },
  { icon: 'bi-tiktok', href: 'https://tiktok.com/', label: 'TikTok' },
  { icon: 'bi-youtube', href: 'https://youtube.com/', label: 'YouTube' },
];

/* Marca */
export const BRAND = {
  name: 'ORIGEN',
  tagline: 'Una travesía antropológica a través del paladar.',
  shortTagline: 'Alta cocina peruana. Vanguardia y herencia desde Lima.',
  whatsapp: '51977982557',
  whatsappMessage: 'Es un placer saludarles. Quisiera solicitar disponibilidad para una experiencia culinaria en ORIGEN 🍷.',
  author: 'Hector Palacios',
  year: new Date().getFullYear(),
};
