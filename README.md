# Warehouse Software

Este proyecto contempla la obtención de un listado de depósitos con la posibilidad de ubicarlos en un mapa de Google

## Instrucciones

Para correr el proyecto tenés que usar

### `npm start`

Antes de levantar el proyecto tenés que obtener las APIs correspondientes para que el proyecto funcione correctamente, las mismas son:

- **Api key de Google Maps** -> (Inicializar proyecto en GCP, dar de alta el SDK de Maps, obtener credencial)
- **Geocode API** -> (Regístrate en [Location IQ](https://es.locationiq.com/))
- **Open Route Token** -> (Regístrate en [Open Route Service](https://openrouteservice.org/) y crea un token)

También vas a necesitar los siguientes servicios de **Firebase**

- **Auth**
- **Firestore**
- **Storage**

Y listo el proyecto debería estar corriendo, no te preocupes, si no tenés datos cargados en Firestore el proyecto cuenta con un ABM para que cargues los que consideres necesarios.

## Tecnologías

- **HTML/CSS**
- **JavaScript**
- **Axios**
- **Firebase (Auth, Firestore, Storage)**
- **React**
- **React Router DOM**
- **React Bootstrap**
- **React Google maps**
- **Open Route Service**
- **Dotenv**
- **Sweet Alert**
- **Bootswatch**

### Funcionalidades

- ABM de depósitos
- Grilla de depósitos
- Subida y descarga de CSV
- Redirección y confirmación a la Homepage
- Login / Logout / Signup
- Perfiles de sesión (si el usuario no es admin, no puede acceder a la funcionalidad del mapa)
- Pantallas de carga para hacer más ameno el tiempo de espera al obtener la información
- Manejo de errores en caso de falla de los servicios
- Funcionalidad de mapa
- Validación usuario logueado

La funcionalidad del mapa abarca

- Ubica la dirección solicitada en el mapa
- Ubicación de los 3 depósitos más cercanos marcados con un número con base en su cercanía
- Ruta marcada en el mapa al más cercano (Si haces clic sobre la línea, te abre un modal con el detalle de las calles)
