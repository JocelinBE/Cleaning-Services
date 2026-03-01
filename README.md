# Cleaning Services - Landing Page

Landing page profesional desarrollada con Next.js 14 (App Router), TypeScript, Tailwind CSS y shadcn/ui.

## 🚀 Características

- ✅ Next.js 14 con App Router
- ✅ TypeScript
- ✅ Tailwind CSS con variables CSS
- ✅ shadcn/ui como sistema de componentes
- ✅ Top Bar con efecto glassmorphism
- ✅ Modo oscuro/claro con toggle funcional
- ✅ Diseño responsive

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔧 Solución de Problemas de Permisos

Si encuentras errores de "Operation not permitted" en macOS:

1. **Ejecuta el script de corrección de permisos:**
   ```bash
   bash fix-permissions.sh
   ```

2. **O manualmente:**
   ```bash
   # Eliminar atributos extendidos
   xattr -rc node_modules
   
   # Ajustar permisos
   find node_modules -type f -exec chmod 644 {} \;
   find node_modules -type d -exec chmod 755 {} \;
   ```

3. **Si el problema persiste, reinstala las dependencias:**
   ```bash
   rm -rf node_modules package-lock.json .next
   npm install
   ```

## 📁 Estructura del Proyecto

```
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal con ThemeProvider
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globales
├── components/
│   ├── ui/                # Componentes shadcn/ui
│   ├── top-bar.tsx        # Navbar con glassmorphism
│   ├── theme-provider.tsx # Provider de temas
│   └── theme-toggle.tsx   # Toggle de tema
└── lib/
    └── utils.ts           # Utilidades
```

## 🎨 Temas

El proyecto soporta tres modos de tema:
- **Light**: Modo claro
- **Dark**: Modo oscuro
- **System**: Sigue la preferencia del sistema

El toggle de tema está disponible en el Top Bar.

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

