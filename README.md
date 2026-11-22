# Domotel Aysén — sitio web

Sitio de [Domotel Aysén](https://domotel-aysen.netlify.app), domos en la Ruta 240, km 14, Puerto Aysén.

Es un sitio estático de HTML, CSS y JavaScript, sin dependencias ni paso de compilación.

## Estructura

```
index.html              Página completa (todas las secciones)
assets/css/styles.css   Estilos
assets/js/main.js       Galería, filtros, lightbox, tour 360°, contadores, animaciones de scroll
assets/js/ambiente.js   Scroll suave (Lenis), luciérnagas, efectos de mouse, frases rotativas
assets/img/fotos/       Fotos de la galería en WebP (cada una con versión -sm de 720 px)
assets/img/             Portada, bandas, foto de dron, imagen para redes (og) y SVG decorativos
```

## Verlo en local

Desde esta carpeta:

```
python -m http.server 8765
```

y abrir http://localhost:8765

## Editar contenido

- **Textos:** directamente en `index.html`.
- **Fotos de la galería:** lista `PHOTOS` al inicio de `assets/js/main.js` (`[archivo, categoría, texto alternativo]`). Categorías: `exterior`, `interior`, `tinaja`, `noche`. Cada foto necesita `nombre.webp` (1800 px) y `nombre-sm.webp` (720 px) en `assets/img/fotos/`.
- **Tour virtual:** Kuula, colección `7dDZ6` (se carga al hacer clic, en `main.js`).
- **WhatsApp:** +56 9 8363 0133, enlaces `wa.me/56983630133` en `index.html`.

## Publicación

Está en Netlify (sitio `domotel-aysen`). Se publica subiendo esta carpeta tal cual; no requiere build.
