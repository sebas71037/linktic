# Linktic Frotend Prueba (TODO APP)
Esta aplicación es un administrador de tareas, basado un poco en la linea gráfica de **Asana**.



## Páginas
La aplicación tiene consigo 2 vistas:
 
### 1. Dashboard de tareas: 
Lista la tareas existentes, cuenta con filtro.

![listado-tareas](https://github.com/user-attachments/assets/e3bc9795-f992-46e4-9d40-35c24ac31187)

### 2. Creación/Edición de tarea

![crear-tarea](https://github.com/user-attachments/assets/aaf0c490-d05b-4625-b9da-432b2825df36)

## Servicios
La aplicación fue estructurada para administrar las tareas en tiempo real, por lo que se conecta con un **Socket Server**.

Listado de eventos (servicios) de suscripción del **Socket** :

 1. Listado de tareas
 2. Listado de integrantes del equipo
 3. Nueva tarea

Listado de eventos a consumir:

 1. Crear tarea
 2. Editar tarea
 3. Eliminar tarea

### Aclaración
Como la prueba es para el cargo de Frontend developer, se creo una simulación de como conectarse y comunicarse con el **Socket** basandose en como funciona **Socket.IO**.

## Correr proyecto
Para correr el proyecto solo necesitamos usar la version **20** de NodeJS, el proyecto incluye su configuracion, por lo debemos correr:

```bash
nvm use
```
> Debes tener instalado **nvm**

Despues debemos instalar dependencias y correr el proyecto:

```bash
npm i
npm run start
```
