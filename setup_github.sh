#!/bin/bash

# Configuración básica (usando el correo proporcionado)
git config --global user.email "mazaabor22@gmail.com"
git config --global user.name "Arroz Amor Admin"

# Inicializar repositorio
git init
git branch -M main

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "🚀 Primer commit: Proyecto Arroz Amor listo para Netlify"

echo ""
echo "✅ Git configurado e inicializado correctamente."
echo "==============================================="
echo "PASOS FINALES:"
echo "1. Ve a https://github.com/new y crea un repositorio."
echo "2. Copia el comando que dice 'git remote add origin...'"
echo "3. Pégalo aquí y presiona Enter."
echo "4. Luego ejecuta: git push -u origin main"
