|  Method  | URL | Description  | 
|  ----------  | ---------- | ------------  | 
|  GET  | /Index  |  Muestra la pagina de inicio  | 
|  GET  | /Register  |  Para regitrar un usuario  | 
|  POST  | /  Register  |  Para regitrar un usuario  | 
|  GET  | /  Login  |  Para loguear un usuario  | 
|  POST  | / | Login  |  Para loguear un usuario  | 
|  POST  | / | LogOUT  |  Para cerrar sesion  | 
|  GET  | / | collecticions  |  Muestra todas las colecciones  | 
|  GET  | / | collections/:collectionID  |  Muestra una coleccion  | 
|  GET  | / | collections/create  |  Muestra el formulario de creacion de coleccion  | 
|  POST  | / | collections/create  |  Crea una colección  | 
|  GET  | / | art/:artID  |  Muestra un arte  | 
|  GET  | / | users  |  Muestra todos los usuarios registrados. Solo admin y moderadores.  | 
|  GET  | / | users/:userID  |  Muestra los detalles de un usuario, el admin puede cambiar su rol  | 
|  POST  | / | users/:userID/edit |  Edita un usuario  | 
|  POST  | / | users/:userID/delete |  Borra un usuario  | 
|  POST  | / | users/:userID/setRole/:role  |  Cambia el rol de un usuario  | 