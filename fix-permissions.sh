#!/bin/bash

# Script para corregir permisos y atributos extendidos
# Ejecutar con: bash fix-permissions.sh

echo "🔧 Corrigiendo permisos del proyecto..."

# Eliminar atributos extendidos
echo "Eliminando atributos extendidos..."
xattr -rc node_modules 2>/dev/null || true
xattr -rc .next 2>/dev/null || true

# Ajustar permisos de archivos
echo "Ajustando permisos de archivos..."
find node_modules -type f -exec chmod 644 {} \; 2>/dev/null || true

# Ajustar permisos de directorios
echo "Ajustando permisos de directorios..."
find node_modules -type d -exec chmod 755 {} \; 2>/dev/null || true

# Permisos específicos para Next.js
echo "Ajustando permisos de Next.js..."
chmod -R u+w node_modules/next 2>/dev/null || true

echo "✅ Permisos corregidos. Intenta ejecutar 'npm run dev' nuevamente."

