document.addEventListener('DOMContentLoaded', function () {
    const resultDiv = document.getElementById('result');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES'; // Configurar el idioma a español

    let nombreCorrecto = 'edgar'; 
    let nipCorrecto = '3187'; 
    let nombreValidado = false;
    let nipValidado = false;
    const usuario = document.getElementById("usuario");
    const nip = document.getElementById("nip");
    const indicaciones = document.getElementById("indicaciones");

    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Transcripción de voz:', transcript);

        if (!nombreValidado) {
            if (transcript.includes(nombreCorrecto)) {
                nombreValidado = true;
                usuario.style.display = "none";
                nip.style.display = "block";
                contra(transcript, nipValidado, nipCorrecto);
                
            } 
            else {
                resultDiv.innerHTML = '<p>Nombre incorrecto.</p>';
            }
        } else {

        };

    }

    recognition.start();
});
function contra(transcript, nipValidado, nipCorrecto){
    const resultDiv = document.getElementById('result');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES'; // Configurar el idioma a español
    
    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Transcripción de voz:', transcript);
    if (!nipValidado) {
        if (transcript.includes(nipCorrecto)) {
           nipValidado = true;
           nip.style.display = "none";
           indicaciones.style.display = "block";
           procesaOrden();
       } else {
           resultDiv.innerHTML = '<p>NIP incorrecto.</p>';
       }
    }
    };
   recognition.start();
}
function procesaOrden(transcript) {


    const resultDiv = document.getElementById('result');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES'; // Configurar el idioma a español

    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Transcripción de voz:', transcript);
    
        // Verificar si se menciona la palabra "Rita"
        if (transcript.includes('rita')) {
            // Eliminar la palabra "Rita" del texto
            transcript = transcript.replace('rita', '');
    
            // Procesar la orden sin la palabra "Rita"
            procesarOrden(transcript.trim());
        } else {
            resultDiv.innerHTML = '<p>No se ha detectado la palabra "Rita". Por favor, inténtalo de nuevo.</p>';
            recognition.start();
        }
    };
    recognition.start();
}


function enviarComandoAPI(comando, fecha) {
    const apiUrl = 'https://65ef77abead08fa78a507acc.mockapi.io/comandosCasa';

    // Objeto con los datos a enviar
    const datos = {
        comando: comando,
        fecha: fecha
    };

    // Configurar la solicitud HTTP
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };

    // Realizar la solicitud a la API
    fetch(apiUrl, options)
        .then(response => {
            if (response.ok) {
                console.log('Comando enviado exitosamente a la API.');
            } else {
                console.error('Error al enviar el comando a la API:', response.status);
            }
        })
        .catch(error => {
            console.error('Error de red al enviar el comando a la API:', error);
        });
}

function procesarOrden(transcript) {
    const resultDiv = document.getElementById('result');
    const fecha = new Date(); // Obtener la fecha actual

    switch (transcript) {
        case 'enciende la luz de la recámara':
            enviarComandoAPI(transcript, fecha);
        break;
        case 'apaga la luz de la recámara':
            enviarComandoAPI(transcript, fecha);
        break;
        case 'enciende la luz de la sala':
            enviarComandoAPI(transcript, fecha);
        break;
        case 'apaga la luz de la sala':
            enviarComandoAPI(transcript, fecha);
        break;
        case 'enciende las luces del jardín':
            enviarComandoAPI(transcript, fecha);
        break;
        case 'apaga las luces del jardín':
            enviarComandoAPI(transcript, fecha);
        break;
        case 'enciende el ventilador':
            enviarComandoAPI(transcript, fecha);
        break;
        case 'apaga el ventilador':
            enviarComandoAPI(transcript, fecha);
        break;
        case 'abre las cortinas':
            enviarComandoAPI(transcript, fecha);
        break;
        case 'cierra las cortinas':
            enviarComandoAPI(transcript, fecha);
        break;
        case 'activa la alarma':
            enviarComandoAPI(transcript, fecha);
        break;
        case 'desactiva la alarma':
            enviarComandoAPI(transcript, fecha);
        break;
        case 'enciende las cámaras':
            enviarComandoAPI(transcript, fecha);
        break;
        case 'apaga las cámaras':
            enviarComandoAPI(transcript, fecha);
        break;
        default:
          resultDiv.innerHTML = '<p>Comando no reconocido.</p>';
      }
      
      

    // Continuar escuchando después de procesar una orden
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES'; // Configurar el idioma a español
    recognition.start();
}
