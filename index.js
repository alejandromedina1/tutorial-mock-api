// POST METHOD
//Así se hace un método POST para enviar información a la API
//En este ejemplo utilizaremos Async - Await para crear la función de POST
async function addUser(user) {
  const content = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  };

  const API = "https://65d40d3e522627d50109cbf8.mockapi.io/test1/users";
  await fetch(API, content);
  console.log("usuario agregado");
}

//// Recoger la información que pone el usuario en el cuestionario para guardarla
//Capturo el botón de agregar
const button = document.getElementById("btn-agregar");
console.log(button);

//Capturo los inputs
const inputs = document.getElementsByClassName("login-input");
console.log(inputs);

// Creo un objeto donde voy a almacenar la información del usuario que se loguea.
let user = {
  name: "",
  password: "",
};

//Creo un evento para que cuando le haga click al botón, envié la info a la API
button.addEventListener("click", () => {
  //Capturo la información de los inputs
  user = {
    name: inputs[0].value,
    password: inputs[1].value,
  };
  console.log(user);

  //Añado el usuario a la API
  addUser(user);
});

/////////////////// Enviar mensaje

//Este objeto es el mensaje que quiero enviar
const message = {
  from: user.name,
  to: "Sol",
  message: "Hola, cómo estás?",
};

//Creo la función para postear el mensaje en la API
async function sendMessage(message) {
  const content = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(message),
  };

  const API = "https://65d40d3e522627d50109cbf8.mockapi.io/test1/messages";
  await fetch(API, content);
  console.log("mensaje enviado");
}

//Capturo el botón credo con HTML
const btnMensaje = document.getElementById("btn-mensaje");
console.log(btnMensaje);

//Creo un arreglo donde se van a guardar los mensaje que va a recibir Sol
//Nota: en este ejemplo, Sol es nuestra usuaria logueada
let mensajesDeSol = [];

//Añadimos el evento de que cuando le damos click al botón, nos va a trar la info de la API
btnMensaje.addEventListener("click", () => {
  console.log("click");
  //Vamos a usar then() en este ejemplo
  const API = "https://65d40d3e522627d50109cbf8.mockapi.io/test1/messages";
  const content = fetch(API)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      json.forEach((element) => {
        //Vamos a validar en cada elemento de la API, que el destinatario sea Sol. Si Sol es la destinataria, entonces vamos a guardar el mensaje en un arreglo para mostrarle todos los mensajes pendientes a Sol
        if (element.to === "Sol") {
          mensajesDeSol.push(element);
        }
      });
    })
    .then(() => console.log(mensajesDeSol));
  //Imprimimos en consola todos los mensajes de Sol
});
