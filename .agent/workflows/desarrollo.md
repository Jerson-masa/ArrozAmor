---
description: Flujo de trabajo para desarrollar y desplegar cambios de forma segura
---

# 🚀 Flujo de Trabajo de Desarrollo - ArrozAmor

Este workflow te permite hacer cambios de forma segura sin afectar a los usuarios actuales.

## 📋 Estructura de Ramas

- **`main`** → Producción (lo que ven los usuarios en Netlify)
- **`develop`** → Desarrollo y pruebas (genera un Deploy Preview en Netlify)

---

## 🔄 Para hacer cambios de forma segura:

### 1. Asegúrate de estar en la rama `develop`
// turbo
```bash
git checkout develop
```

### 2. Haz tus cambios y prueba localmente
// turbo
```bash
npm run dev
```
Abre `http://localhost:3000` y verifica que todo funcione.

### 3. Guarda los cambios en `develop`
```bash
git add .
git commit -m "Descripción de los cambios"
git push origin develop
```

### 4. Revisa el Deploy Preview en Netlify
- Netlify automáticamente creará una URL de prueba
- La URL será algo como: `deploy-preview-X--arrozamor.netlify.app`
- Los usuarios siguen viendo la versión de `main`

### 5. Si todo está bien, fusiona a producción
```bash
git checkout main
git merge develop
git push origin main
```

### 6. (Opcional) Vuelve a `develop` para seguir trabajando
// turbo
```bash
git checkout develop
```

---

## 🔥 Comandos Rápidos

| Acción | Comando |
|--------|---------|
| Ver rama actual | `git branch` |
| Cambiar a develop | `git checkout develop` |
| Cambiar a main | `git checkout main` |
| Ver estado | `git status` |
| Subir cambios | `git push` |

---

## ⚠️ Importante

- **NUNCA** hagas push directo a `main` sin probar primero
- Siempre trabaja en `develop` y fusiona cuando estés seguro
- Cada push a `develop` genera un Deploy Preview automático en Netlify
