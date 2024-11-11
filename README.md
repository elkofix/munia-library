# Proyecto de Librería con FastAPI y React

Este proyecto es una **prueba técnica para un puesto de desarrollador fullstack en Munia**. Combina un backend hecho con **FastAPI** y un frontend con **React**. Ambos servicios están configurados para ejecutarse en contenedores Docker y están desplegados en **Render**.

## Requisitos

Para ejecutar este proyecto, asegúrate de tener instalados los siguientes programas:

- [Docker](https://www.docker.com/get-started)

## Estructura del Proyecto

### 1. Backend (FastAPI)
- **FastAPI**: Framework para el backend
- **Uvicorn**: Servidor ASGI para ejecutar FastAPI
- **Pydantic**: Validación de datos en el backend

### 2. Frontend (React)
- **React**: Librería para construir la interfaz de usuario
- **TypeScript**: Para tipado estático en el frontend
- **Bootstrap**: Para el diseño y maquetación

## Instalación y Ejecución

### Paso 1: Clonar el repositorio

Si aún no has clonado el proyecto, hazlo con el siguiente comando:

```bash
git clone https://github.com/elkofix/munia-library
cd munia-library
```

### Paso 1.1: Agregar variable de entorno

En la carpeta library crear un archivo ```.env``` y escribir dentro de el

```
REACT_APP_API_URL=http://localhost:8000
```

Guardar archivo

### Paso 2: Crear las imágenes Docker y ejecutar los contenedores

```
docker-compose up --build
```
Este comando construye las imágenes de Docker y levanta los contenedores definidos en ```docker-compose.yml```.

### Paso 3: Acceder a la aplicación localmente

Una vez que Docker haya construido las imágenes y levantado los contenedores, podrás acceder a la aplicación en los siguientes puertos:

Backend: [http://localhost:8000](http://localhost:8000)

Frontend: [http://localhost:3000](http://localhost:3000)

## Despliegue en Producción

#### Backend
El backend está desplegado en Render y disponible en la siguiente URL:
[https://backend-service.onrender.com](https://library-backend-y45c.onrender.com/api/v1/books)

#### Frontend
El frontend está desplegado en Render y disponible en la siguiente URL:
[https://frontend-service.onrender.com](https://library-fronted.onrender.com/)
