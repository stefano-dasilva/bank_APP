# Descrizione del Progetto
Questo progetto è un'applicazione web che consente la gestione di trasferimenti di denaro online da un conto a un altro. L'applicazione è stata implementata utilizzando i principi dello stack MERN (Mongo, Express, React, Node), con utilizzo di routing per gli endpoint sul server.
# Funzionalità Principali
## Registrazione e Login
Gli utenti possono registrarsi e accedere al sistema attraverso una pagina pubblica con form di registrazione e login. La registrazione verifica la validità sintattica dell'indirizzo email e l'uguaglianza tra i campi "password" e "ripeti password". I controlli di validità sono effettuati anche lato client. Per l'autenticazione ho utilizzato JWT unito al session storage e cookies. Lato client ho fatto uso di react-router per creare delle routes private<br>

<img src="client/src/assets/login.PNG" alt="Login" width="400px" height="200px">
<img src="client/src/assets/register.PNG" alt="Register" width="400px" height="200px">

## Gestione dei Conti 
I conti correnti hanno un codice, un saldo e tengono traccia dei trasferimenti in entrata e in uscita.Gli utenti possono effettuare trasferimenti di denaro tra i propri conti. L'applicazione verifica che il conto di destinazione appartenga all'utente specificato e che il conto di origine abbia un saldo sufficiente per coprire l'importo del trasferimento. In caso di mancanza di una di queste condizioni, l'applicazione mostra un avviso di fallimento. L'intera applicazione è realizzata con un'unica pagina, e ogni interazione dell'utente è gestita senza ricaricare completamente la pagina. I controlli di validità dei dati di input, come l'importo non nullo e maggiore di zero, sono realizzati anche lato client.L'applicazione chiede all'utente se vuole inserire nella propria rubrica i dati del destinatario di un trasferimento andato a buon fine, ma non ancora presente nella rubrica. Questi dati sono memorizzati nella base di dati e utilizzati per semplificare l'inserimento in futuro. L'applicazione garantisce l'atomicità del trasferimento, cioè ogni volta che il conto di destinazione viene addebitato, il conto di origine viene accreditato.<br>

![Home](/client/src/assets/home.PNG)
## Conferma dei Trasferimenti
 Dopo un trasferimento riuscito, l'applicazione mostra una pagina di conferma con i dettagli dell'importo trasferito e i dati dei conti di origine e destinazione, compresi i saldi prima e dopo il trasferimento.<br>

 ![Confirm](/client/src/assets/confirm.PNG)
## Logout
L'applicazione consente il logout dell'utente.<br>

### Strumenti e linguaggi utilizzati 

- `Client` : React, Javascript, Html , Tailwind CSS
- `Server` : Mongoose, Mongodb (DATABASE) 






