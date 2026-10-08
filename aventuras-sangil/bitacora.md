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

P6 - req.params.id

- **Código de estado en Postman:** `200 OK`
- **Body en Postman:** Recibiré una respuesta vacía (sin el objeto de la actividad).
- **En la terminal de VS Code:** El `1` aparece con comillas (`'1'`), indicando que Express recibe el parámetro como un texto.

### Explicación:
Express siempre lee los parámetros que van en la URL como cadenas de texto. En nuestra lista de actividades, la propiedad `id` está guardada como un número entero (el `1` sin comillas).

Al realizar la búsqueda en el código con el operador de igualdad estricta (`===`), JavaScript compara el número 1 contra el texto '1'. Como el triple igual exige que coincidan tanto el valor como el tipo de dato, la comparación da falso y no encuentra nada en el arreglo. Por esta razón, Postman responde con éxito pero no muestra ninguna información.

P7 - Omitir el 'return' en las respuestas de error

- **¿Qué recibe el cliente en Postman?:** Recibe un código de estado `404 Not Found` con el mensaje en JSON: `"No existe la actividad con id 99"`.
- **¿Qué aparece en la terminal de VS Code?:** Aparece un error rojo de Node.js diciendo `ERR_HTTP_HEADERS_SENT: Cannot set headers after they are sent to the client`.

### Explicación:
Las funciones que envían respuestas como `res.json()` o `res.status()` solo envían la información al cliente, pero **no detienen la ejecución de la función JavaScript**. 

Al quitar la palabra `return`, el código entra al `if (!actividad)`, envía la respuesta del error 404 al cliente y luego continúa ejecutando la línea de abajo (`res.json(actividad)`). Al intentar responder por segunda vez a una misma petición que ya había sido contestada, Express falla en la terminal lanzando un error de cabeceras duplicadas.

Por esta razón es obligatorio usar `return` cuando retornamos respuestas de error.


P8 - Filtros con req.query

### Predicción de las tres peticiones en Postman:
1. **`?tipo=agua`**: Retorna un código de estado `200 OK` con la lista de las dos actividades que son de tipo agua (*Rafting* y *Torrentismo*).
2. **`?tipo=AGUA`**: Retorna un código de estado `200 OK`, pero con una lista vacía `[]` (sin corregir el código aún), porque JavaScript diferencia entre mayúsculas y minúsculas y no encuentra coincidencia exacta entre `"agua"` y `"AGUA"`.
3. **`?tipo=fuego`**: Retorna un código de estado `200 OK` con una lista vacía `[]`.

### ¿Por qué `?tipo=fuego` responde 200 y no 404?
Debe responder `200 OK` con la lista vacía porque la ruta de la API y la lista de actividades sí existen en el servidor. El filtro por tipo es solo un criterio de búsqueda: responder con un arreglo vacío le confirma al cliente que la consulta fue exitosa, pero que en la base de datos no hay ningún elemento que cumpla con esa condición. 

El código `404 Not Found` se reserva exclusivamente para cuando la ruta o la URL en sí no existen en el servidor.

---

### Solución para `?tipo=AGUA`
Para solucionar el problema de las mayúsculas, se modificó la comparación del filtro convirtiendo tanto el tipo de la actividad en la lista como el tipo recibido en la URL a minúsculas mediante el método de texto `.toLowerCase()`. De este modo, la búsqueda siempre compara los valores en minúsculas sin importar cómo los escriba el usuario.
