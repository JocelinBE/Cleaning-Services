# Cómo agregar colaboradores al repositorio

## Opción 1: Agregar colaboradores directamente (Recomendado)

1. Ve a tu repositorio en GitHub: https://github.com/JocelinBE/Cleaning-Services
2. Haz clic en **"Settings"** (Configuración) en la parte superior del repositorio
3. En el menú lateral izquierdo, haz clic en **"Collaborators"** (Colaboradores)
4. Haz clic en **"Add people"** (Agregar personas)
5. Escribe el nombre de usuario de GitHub de tu compañero
6. Selecciona el nivel de permiso:
   - **Write**: Puede hacer cambios y push directamente
   - **Admin**: Puede hacer cambios y administrar el repositorio
7. Haz clic en **"Add [usuario] to this repository"**

## Opción 2: Fork y Pull Request (Para contribuidores externos)

Si prefieres revisar los cambios antes de aceptarlos:

1. Tu compañero hace un **Fork** del repositorio
2. Clona su fork en su computadora
3. Hace los cambios que necesita
4. Hace commit y push a su fork
5. Crea un **Pull Request** desde su fork hacia tu repositorio
6. Tú revisas y aceptas o rechazas los cambios

## Niveles de permisos en GitHub

- **Read**: Solo puede ver el código
- **Write**: Puede hacer cambios y push directamente
- **Admin**: Puede hacer cambios y administrar configuraciones

## Comandos para colaboradores

Una vez que tu compañero sea colaborador, debe ejecutar:

```bash
# Clonar el repositorio
git clone https://github.com/JocelinBE/Cleaning-Services.git

# Entrar al directorio
cd Cleaning-Services

# Instalar dependencias
npm install

# Crear una rama para sus cambios
git checkout -b nombre-de-la-rama

# Hacer cambios...

# Agregar y commitear cambios
git add .
git commit -m "Descripción de los cambios"

# Subir cambios
git push origin nombre-de-la-rama

# O si trabaja directamente en main (con permiso Write)
git push origin main
```

## Buenas prácticas

- **Usar ramas separadas** para cada feature o cambio
- **Hacer commits descriptivos** que expliquen qué se cambió
- **Hacer pull antes de push** para asegurarse de tener los últimos cambios:
  ```bash
  git pull origin main
  ```

