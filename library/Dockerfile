# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente del frontend
COPY . .

# Construir el proyecto para producción
RUN npm run build

# Exponer el puerto en el que corre la app (por defecto es 3000)
EXPOSE 3000

# Comando para iniciar el servidor de desarrollo o producción
CMD ["npm", "start"]
# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente del frontend
COPY . .

# Construir el proyecto para producción
RUN npm run build

# Exponer el puerto en el que corre la app (por defecto es 3000)
EXPOSE 3000

# Comando para iniciar el servidor de desarrollo o producción
CMD ["npm", "start"]
