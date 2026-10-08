p1. En las tres rutas (/, /hola y /lo-que-sea) veré la misma respuesta: "Hola desde el servidor".
¿Por qué? Porque el servidor no evalúa la variable req.url ni tiene condicionales if; para cualquier petición responde lo mismo.

p2. Aparecerán 2 líneas en la terminal por cada página abierta.
¿Por qué? Una línea corresponde a la ruta solicitada y la otra a la petición automática del navegador para obtener el icono de la pestaña (/favicon.ico).

p3. si lo hago con mayuscula o con el slash 
Hacer un servidor a mano es bastante cansón por tres razones: primero, el enrutamiento es muy frágil porque toca escribir puros if/else y cualquier mayúscula, barra extra o parámetro dinámico rompe todo; segundo, mandar respuestas da pereza porque hay que configurar las cabeceras JSON y convertir los datos a texto manualmente cada vez; y tercero, recibir datos en peticiones POST se vuelve muy canzón al tener que escuchar eventos por pedazos (req.on('data')) para ir pegándolos y procesándolos a mano.

P4 (Ruta no existente)
Al intentar ingresar a `/no-existe`, Express responde automáticamente con el mensaje `Cannot GET /no-existe` y un código de estado **404 Not Found**.

Reflexión del Momento 2
Express simplifica enormemente el desarrollo comparado con el módulo `http` nativo de Node.js, ya que gestiona de manera automática las rutas no encontradas (404) y facilita la definición de endpoints mediante métodos como `app.get()`.

p5. En el navegador: La página se quedará cargando indefinidamente ("esperando respuesta de localhost...") hasta que el navegador cancele la conexión por tiempo de espera (timeout). No mostrará la respuesta "API Aventuras San Gil funcionando".
