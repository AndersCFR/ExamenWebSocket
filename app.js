const Express = require('express')();
const Http = require('http').Server(Express);
const io = require('socket.io')(Http,{
    cors: {
        origin: '*',
    }
})

const opciones = [
    {
        'imagen': '../assets/barco.png',
        'a': 'barco',
        'b': 'carro',
        'c': 'tren',
        'respuesta': 'barco'
    },
    {
        'imagen': '../assets/avion.png',
        'a': 'barco',
        'b': 'avion',
        'c': 'pelota',
        'respuesta': 'avion'
    },
    {
        'imagen': '../assets/hamburguesa.png',
        'a': 'hot dog',
        'b': 'carne',
        'c': 'hamburguesa',
        'respuesta': 'hamburguesa'
    },
    {
        'imagen': '../assets/marciano.png',
        'a': 'marciano',
        'b': 'futbol',
        'c': 'iphone',
        'respuesta': 'marciano'
    },
]

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

io.on('connection', (socket) => {
    
    let respuesta = ''

    console.log('Usuario Conectado!!!');

    socket.on('message', (message) => {
    let resultado = 'Perdedor :('
      console.log(`${socket.id.substr(0, 3)} seleccionó ${message}`);
      if (message === respuesta){
          resultado = 'Ganador :)'
      }
        
      io.emit('message', 'El otro usuario ya seleccionó');  
      socket.emit('message',resultado);          
    });

    socket.on('reiniciar', () => {
        let aletorio = random(0,3)
        console.log(aletorio)
        data = opciones[aletorio]
        console.log(`${socket.id.substr(0, 3)} reinció el juego`);
        console.log(` Data: ${data}`)
        io.emit('data', data);
        /*socket.emit('data',data);*/
        respuesta = opciones[aletorio].respuesta
        console.log('Repuesta correcta:', respuesta)
    });

    socket.on('disconnect', () => {
      console.log('Usuario Desconectado!');
    });
    });


Http.listen(3000, ()=> {
    console.log('Listening')
})