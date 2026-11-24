export const INITIAL_RESERVATIONS = [
    // HOY - 2026-11-13 - ALMUERZO 13:00 hs
    {
        id: 'res-101',
        code: 'RES-1301',
        tableId: 't-1',
        tableNumber: 1,
        area: 'interior',
        partySize: 2,
        date: '2026-11-13',
        time: '13:00',
        customer: {
            nombre: 'Martín',
            apellido: 'Sosa',
            dni: '37.192.831',
            telefono: '+54 11 5566-1234',
            email: 'martin.sosa@email.com'
        },
        status: 'confirmed',
        notes: 'Almuerzo de trabajo.',
        createdAt: '2026-11-13T08:00:00.000Z'
    },
    {
        id: 'res-102',
        code: 'RES-1302',
        tableId: 't-3',
        tableNumber: 3,
        area: 'interior',
        partySize: 5,
        date: '2026-11-13',
        time: '13:00',
        customer: {
            nombre: 'Valeria',
            apellido: 'Rios',
            dni: '34.901.222',
            telefono: '+54 11 4433-8899',
            email: 'valeria.rios@email.com'
        },
        status: 'seated',
        notes: 'Mesa familiar.',
        createdAt: '2026-11-13T08:30:00.000Z'
    },
    {
        id: 'res-103',
        code: 'RES-1303',
        tableId: 't-9',
        tableNumber: 9,
        area: 'patio',
        partySize: 2,
        date: '2026-11-13',
        time: '13:00',
        customer: {
            nombre: 'Tomás',
            apellido: 'Castro',
            dni: '39.445.667',
            telefono: '+54 11 6789-0011',
            email: 'tomas.castro@email.com'
        },
        status: 'confirmed',
        notes: 'Al aire libre.',
        createdAt: '2026-11-13T09:00:00.000Z'
    },
    // HOY - 2026-11-13 - ALMUERZO 14:00 hs
    {
        id: 'res-104',
        code: 'RES-1401',
        tableId: 't-2',
        tableNumber: 2,
        area: 'interior',
        partySize: 4,
        date: '2026-11-13',
        time: '14:00',
        customer: {
            nombre: 'Gonzalo',
            apellido: 'Paz',
            dni: '36.882.119',
            telefono: '+54 11 3322-7788',
            email: 'gonzalo.paz@email.com'
        },
        status: 'confirmed',
        notes: 'Cumpleaños.',
        createdAt: '2026-11-13T09:30:00.000Z'
    },
    {
        id: 'res-105',
        code: 'RES-1402',
        tableId: 't-6',
        tableNumber: 6,
        area: 'interior',
        partySize: 5,
        date: '2026-11-13',
        time: '14:00',
        customer: {
            nombre: 'Romina',
            apellido: 'Duarte',
            dni: '38.123.009',
            telefono: '+54 11 2299-4455',
            email: 'romina.duarte@email.com'
        },
        status: 'seated',
        notes: 'Reunión ejecutiva.',
        createdAt: '2026-11-13T09:45:00.000Z'
    },
    {
        id: 'res-106',
        code: 'RES-1403',
        tableId: 't-11',
        tableNumber: 11,
        area: 'patio',
        partySize: 5,
        date: '2026-11-13',
        time: '14:00',
        customer: {
            nombre: 'Facundo',
            apellido: 'Herrera',
            dni: '41.220.980',
            telefono: '+54 11 7788-9900',
            email: 'facundo.herrera@email.com'
        },
        status: 'confirmed',
        notes: 'Terraza jardín.',
        createdAt: '2026-11-13T10:00:00.000Z'
    },
    // HOY - 2026-11-13 - CENA 20:30 hs
    {
        id: 'res-107',
        code: 'RES-2031',
        tableId: 't-4',
        tableNumber: 4,
        area: 'interior',
        partySize: 2,
        date: '2026-11-13',
        time: '20:30',
        customer: {
            nombre: 'Mateo',
            apellido: 'Gómez',
            dni: '40.123.789',
            telefono: '+54 11 5566-7788',
            email: 'mateo.gomez@gmail.com'
        },
        status: 'seated',
        notes: 'Cena de aniversario.',
        createdAt: '2026-11-13T08:30:00.000Z'
    },
    {
        id: 'res-108',
        code: 'RES-2032',
        tableId: 't-14',
        tableNumber: 14,
        area: 'patio',
        partySize: 5,
        date: '2026-11-13',
        time: '20:30',
        customer: {
            nombre: 'Nicolás',
            apellido: 'Álvarez',
            dni: '35.441.229',
            telefono: '+54 11 3344-9900',
            email: 'nicolas.alvarez@yahoo.com'
        },
        status: 'seated',
        notes: 'Amigos de la universidad.',
        createdAt: '2026-11-13T07:45:00.000Z'
    },
    // HOY - 2026-11-13 - CENA 21:00 hs
    {
        id: 'res-109',
        code: 'RES-2101',
        tableId: 't-3',
        tableNumber: 3,
        area: 'interior',
        partySize: 5,
        date: '2026-11-13',
        time: '21:00',
        customer: {
            nombre: 'Luciana',
            apellido: 'Rodríguez',
            dni: '36.892.410',
            telefono: '+54 11 4455-8899',
            email: 'luciana.rodriguez@email.com'
        },
        status: 'confirmed',
        notes: 'Cumpleaños familiar. Sillita alta.',
        createdAt: '2026-11-13T09:15:00.000Z'
    },
    {
        id: 'res-110',
        code: 'RES-2102',
        tableId: 't-8',
        tableNumber: 8,
        area: 'interior',
        partySize: 2,
        date: '2026-11-13',
        time: '21:00',
        customer: {
            nombre: 'Esteban',
            apellido: 'Quito',
            dni: '39.001.298',
            telefono: '+54 11 8899-2233',
            email: 'esteban.quito@email.com'
        },
        status: 'confirmed',
        notes: 'Mesa tranquila.',
        createdAt: '2026-11-13T09:20:00.000Z'
    },
    // HOY - 2026-11-13 - CENA 21:30 hs
    {
        id: 'res-111',
        code: 'RES-2131',
        tableId: 't-10',
        tableNumber: 10,
        area: 'patio',
        partySize: 4,
        date: '2026-11-13',
        time: '21:30',
        customer: {
            nombre: 'Camila',
            apellido: 'Fernández',
            dni: '38.562.901',
            telefono: '+54 11 6789-1234',
            email: 'camila.fernandez@outlook.com'
        },
        status: 'confirmed',
        notes: 'Deck exterior.',
        createdAt: '2026-11-13T09:00:00.000Z'
    },
    {
        id: 'res-112',
        code: 'RES-2132',
        tableId: 't-2',
        tableNumber: 2,
        area: 'interior',
        partySize: 4,
        date: '2026-11-13',
        time: '21:30',
        customer: {
            nombre: 'Santiago',
            apellido: 'Méndez',
            dni: '37.409.812',
            telefono: '+54 11 5544-3322',
            email: 'santiago.mendez@email.com'
        },
        status: 'confirmed',
        notes: 'Cena con clientes.',
        createdAt: '2026-11-13T09:25:00.000Z'
    },
    // HOY - 2026-11-13 - CENA 22:00 hs
    {
        id: 'res-113',
        code: 'RES-2201',
        tableId: 't-5',
        tableNumber: 5,
        area: 'interior',
        partySize: 4,
        date: '2026-11-13',
        time: '22:00',
        customer: {
            nombre: 'Diego',
            apellido: 'Torres',
            dni: '33.910.455',
            telefono: '+54 11 9900-1122',
            email: 'diego.torres@email.com'
        },
        status: 'confirmed',
        notes: 'Cena tardía.',
        createdAt: '2026-11-13T10:10:00.000Z'
    },
    {
        id: 'res-114',
        code: 'RES-2202',
        tableId: 't-12',
        tableNumber: 12,
        area: 'patio',
        partySize: 2,
        date: '2026-11-13',
        time: '22:00',
        customer: {
            nombre: 'Florencia',
            apellido: 'López',
            dni: '42.091.882',
            telefono: '+54 11 4411-2233',
            email: 'flor.lopez@email.com'
        },
        status: 'confirmed',
        notes: 'Patio botánico.',
        createdAt: '2026-11-13T10:15:00.000Z'
    },
    // AYER - 2026-11-12
    {
        id: 'res-201',
        code: 'RES-1201',
        tableId: 't-2',
        tableNumber: 2,
        area: 'interior',
        partySize: 4,
        date: '2026-11-12',
        time: '21:00',
        customer: { nombre: 'Agustín', apellido: 'Paz', dni: '35.120.999', telefono: '+54 11 4455-0011', email: 'agustin@paz.com' },
        status: 'completed',
        notes: 'Excelente atención.',
        createdAt: '2026-11-12T09:00:00.000Z'
    },
    {
        id: 'res-202',
        code: 'RES-1202',
        tableId: 't-6',
        tableNumber: 6,
        area: 'interior',
        partySize: 5,
        date: '2026-11-12',
        time: '21:30',
        customer: { nombre: 'Clara', apellido: 'Morán', dni: '36.882.331', telefono: '+54 11 5566-9922', email: 'clara@moran.com' },
        status: 'completed',
        notes: 'Cena amigos.',
        createdAt: '2026-11-12T09:30:00.000Z'
    },
    {
        id: 'res-203',
        code: 'RES-1203',
        tableId: 't-10',
        tableNumber: 10,
        area: 'patio',
        partySize: 4,
        date: '2026-11-12',
        time: '20:30',
        customer: { nombre: 'Javier', apellido: 'Roca', dni: '34.221.009', telefono: '+54 11 7788-3344', email: 'javier@roca.com' },
        status: 'completed',
        notes: 'Patio deck.',
        createdAt: '2026-11-12T10:00:00.000Z'
    },
    // HACE 2 DÍAS - 2026-11-11
    {
        id: 'res-301',
        code: 'RES-1101',
        tableId: 't-3',
        tableNumber: 3,
        area: 'interior',
        partySize: 5,
        date: '2026-11-11',
        time: '21:00',
        customer: { nombre: 'Marina', apellido: 'Bustos', dni: '37.892.110', telefono: '+54 11 9988-1122', email: 'marina@bustos.com' },
        status: 'completed',
        notes: 'Cena familiar.',
        createdAt: '2026-11-11T09:00:00.000Z'
    },
    {
        id: 'res-302',
        code: 'RES-1102',
        tableId: 't-7',
        tableNumber: 7,
        area: 'interior',
        partySize: 4,
        date: '2026-11-11',
        time: '21:30',
        customer: { nombre: 'Leandro', apellido: 'Vargas', dni: '39.441.229', telefono: '+54 11 2233-7788', email: 'leandro@vargas.com' },
        status: 'completed',
        notes: 'Reunión amigos.',
        createdAt: '2026-11-11T10:00:00.000Z'
    },
    // MAÑANA - 2026-11-14 (SÁBADO)
    {
        id: 'res-401',
        code: 'RES-1411',
        tableId: 't-2',
        tableNumber: 2,
        area: 'interior',
        partySize: 4,
        date: '2026-11-14',
        time: '21:00',
        customer: { nombre: 'Bruno', apellido: 'Rossi', dni: '38.001.992', telefono: '+54 11 3344-5566', email: 'bruno@rossi.com' },
        status: 'confirmed',
        notes: 'Sábado noche.',
        createdAt: '2026-11-13T09:00:00.000Z'
    },
    {
        id: 'res-402',
        code: 'RES-1412',
        tableId: 't-6',
        tableNumber: 6,
        area: 'interior',
        partySize: 5,
        date: '2026-11-14',
        time: '21:30',
        customer: { nombre: 'Carolina', apellido: 'Gil', dni: '36.990.112', telefono: '+54 11 4455-6677', email: 'caro@gil.com' },
        status: 'confirmed',
        notes: 'Festejo de aniversario.',
        createdAt: '2026-11-13T09:10:00.000Z'
    },
    {
        id: 'res-403',
        code: 'RES-1413',
        tableId: 't-11',
        tableNumber: 11,
        area: 'patio',
        partySize: 5,
        date: '2026-11-14',
        time: '21:00',
        customer: { nombre: 'Ignacio', apellido: 'Luna', dni: '40.119.228', telefono: '+54 11 6677-8899', email: 'ignacio@luna.com' },
        status: 'confirmed',
        notes: 'Patio amigos.',
        createdAt: '2026-11-13T09:15:00.000Z'
    },
    // PRÓXIMOS DÍAS - 2026-11-15 AL 2026-11-20
    {
        id: 'res-501',
        code: 'RES-1501',
        tableId: 't-3',
        tableNumber: 3,
        area: 'interior',
        partySize: 5,
        date: '2026-11-15',
        time: '13:00',
        customer: { nombre: 'Paula', apellido: 'Navarro', dni: '35.882.110', telefono: '+54 11 8899-0011', email: 'paula@navarro.com' },
        status: 'confirmed',
        notes: 'Almuerzo domingo.',
        createdAt: '2026-11-13T09:20:00.000Z'
    },
    {
        id: 'res-502',
        code: 'RES-1801',
        tableId: 't-10',
        tableNumber: 10,
        area: 'patio',
        partySize: 4,
        date: '2026-11-18',
        time: '21:00',
        customer: { nombre: 'Matías', apellido: 'Freyre', dni: '37.990.221', telefono: '+54 11 1122-3344', email: 'matias@freyre.com' },
        status: 'confirmed',
        notes: 'Reserva anticipada.',
        createdAt: '2026-11-13T09:30:00.000Z'
    }
];
