# Guía para subir el proyecto a GitHub

## Pasos para crear el repositorio en GitHub

### 1. Crear el repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Completa los siguientes campos:
   - **Repository name**: `cleaning-services-landing` (o el nombre que prefieras)
   - **Description**: "Professional landing page for J & J Cleaning Services"
   - **Visibility**: Elige **Public** o **Private**
   - **NO marques** "Initialize this repository with a README" (ya tenemos uno)
   - **NO agregues** .gitignore ni license (ya están incluidos)
5. Haz clic en **"Create repository"**

### 2. Conectar el repositorio local con GitHub

Después de crear el repositorio, GitHub te mostrará comandos. Ejecuta estos comandos en tu terminal:

```bash
cd "/Users/jocelin/Desktop/Cleaning Services"

# Agregar el repositorio remoto (reemplaza TU_USUARIO con tu nombre de usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/cleaning-services-landing.git

# Cambiar el nombre de la rama a main (si es necesario)
git branch -M main

# Subir el código a GitHub
git push -u origin main
```

### 3. Verificar que todo esté correcto

Después de ejecutar los comandos, ve a tu repositorio en GitHub y deberías ver todos los archivos del proyecto.

## Comandos útiles para el futuro

### Agregar cambios y subirlos:
```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

### Ver el estado del repositorio:
```bash
git status
```

### Ver el historial de commits:
```bash
git log
```

## Notas importantes

- El archivo `.gitignore` ya está configurado para excluir `node_modules`, `.next`, y otros archivos innecesarios
- No subas archivos sensibles como `.env` con contraseñas o API keys
- El proyecto está listo para ser desplegado en Vercel, Netlify u otros servicios

