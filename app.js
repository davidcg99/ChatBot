const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { delay } = require('@whiskeysockets/baileys')




const flowGenerico = addKeyword(['2', '3','4', '5']).addAnswer(
    [
        '🙌 Pendiente de configurar',
        //'https://bot-whatsapp.netlify.app/docs/example/',
        '\n *Flujo terminado*',
    ]
)

const flowSecundario_InfoGeneral_Si = addKeyword(['1', 'Si','Sí','1.']).addAnswer(['🎉 Gracias por elegir esta opción, en breve nos comunicaremos contigo, para brindarte mas información personalizada.'])
const flowSecundario_InfoGeneral_NO = addKeyword(['2', 'No','No.']).addAnswer(
    [
    'Fue un placer atenderle.',  
    ],
    null,
    null,
    [flowGenerico]
)




const flowInfoGeneral = addKeyword(['1', '1.', 'uno','Información general.','Informacion general']).addAnswer(
    [
        '*MACS 2024* presenta las últimas tendencias deportivas, reúne a oradores inspiradores; busca reunir desde innovadores emprendedores hasta empresas globales en un espacio que promueve la educación deportiva, y un lugar para encontrar oportunidades de negocio que no se puede perder. Nuestro lema "El poder fitness empieza con la salud", refleja nuestra determinación para impulsar un estilo de vida activo, ejercicio, nutrición sana y consciencia mientras combate la inactividad. ¡Sea parte de nuestra Expo!',
        '¿Te gustaría conocer más?',
        '*1.* Sí',
        '*2.* No'
        // 'https://bot-whatsapp.netlify.app/',
        //'\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario_InfoGeneral_Si,flowSecundario_InfoGeneral_NO]
)


const flowPrincipal = addKeyword(['Hola', 'Hello','Hola, necesito solicitar información.'])
    .addAnswer('🏃🏻 Bienvenido a *MACS Expo* 24 la Expo de Deportes, Wellness, Fitness y Nutrición.')
    .addAnswer(
        [
            'Selecciona una opción:',
            ' ',
            '✅ *1.* Información general.',
            '✅ *2.* FactSheet.',
            '✅ *3.* Sales Brochure.',
            '✅ *4.* Floorplan',
            '✅ *5.* Hablar con un asesor'                    
        ],
       { 
        delay: 500
       },
        null,
        [flowInfoGeneral, flowGenerico]
    )


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
