FROM node:21-alpine3.19

# Crea el directorio de trabajo en el contenedor
WORKDIR .

# Copia los archivos necesarios al contenedor
COPY package.json ./
COPY pnpm-lock.yaml ./

# Instala las dependencias de la aplicaci�n
RUN npm install -g pnpm
RUN pnpm install

# Copia el resto de los archivos al contenedor
COPY . .

# Expone el puerto en el que la aplicaci�n se ejecutar�
EXPOSE 3001