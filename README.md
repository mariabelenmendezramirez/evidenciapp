# EvidenciApp

Aplicación para organizar evidencias entregadas por estudiantes durante una unidad o proyecto.

## Estructura del proyecto

```
evidenciapp/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── src/
    ├── main.jsx
    ├── Home.jsx
    ├── index.css
    └── components/
        ├── Header.jsx
        ├── EvidenceForm.jsx
        ├── EvidenceCard.jsx
        ├── EvidenceList.jsx
        ├── EvaluationBadge.jsx
        └── Modal.jsx
```

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

---

## 📦 Tutorial: Cómo subir este proyecto a GitHub

### Paso 1 — Crear repositorio en GitHub
1. Ve a https://github.com y entra a tu cuenta.
2. Clic en **"New"** (botón verde arriba a la izquierda).
3. Ponle nombre al repo, ej: `evidenciapp`.
4. Déjalo en **Public** o **Private** según prefieras.
5. NO actives "Add README" ni nada extra.
6. Clic en **"Create repository"**.

### Paso 2 — Inicializar Git en tu proyecto (una sola vez)
Abre la terminal dentro de la carpeta del proyecto y ejecuta:

```bash
git init
git add .
git commit -m "primer commit"
```

### Paso 3 — Conectar con GitHub
Copia la URL de tu repo (la que GitHub te muestra al crearlo) y ejecuta:

```bash
git remote add origin https://github.com/TU_USUARIO/evidenciapp.git
git branch -M main
git push -u origin main
```

¡Listo! El proyecto ya está en GitHub.

---

### Para subir cambios futuros

Cada vez que modifiques archivos:

```bash
git add .
git commit -m "descripción de lo que cambiaste"
git push
```

---

### Comandos útiles de Git

| Comando | Qué hace |
|---------|----------|
| `git status` | Ver qué archivos cambiaron |
| `git log` | Ver historial de commits |
| `git pull` | Bajar cambios del repo remoto |
| `git clone URL` | Descargar un repo a tu computadora |
