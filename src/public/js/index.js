const socket = io()
wsc.emit("Cliente 1 intentando conectar"); //linea para verificar que funciona
wsc.on("confirm", (data) => {
    console.log(data);
})