# GAMEWISE — landing page

Landing pública de GAMEWISE para jugadores, en español, inglés y portugués. HTML, CSS y JavaScript sin dependencias: un script de Node arma una página por idioma y Vercel publica el resultado.

- Producción: https://gamewise.vierek.com.ar (y gamewise-landing.vercel.app)
- Idiomas: `/es/`, `/en/`, `/pt/`

## Cómo está armado

| Archivo | Qué es |
| --- | --- |
| `src/template.html` | La página, con los textos como `{{clave}}` |
| `src/i18n/es.json`, `en.json`, `pt.json` | Los textos de cada idioma (todos tienen que tener las mismas claves) |
| `build.mjs` | Arma `dist/es/`, `dist/en/` y `dist/pt/`, copia `public/` y genera la raíz de respaldo |
| `middleware.js` | En la raíz `/`, elige el idioma y redirige |
| `public/` | Estilos, JS, fuentes Barlow, emblema, imágenes para redes (`og-<idioma>.png`) |
| `vercel.json` | Comando de build, carpeta de salida y encabezados de seguridad |

## Cómo se elige el idioma

Al entrar a `gamewise.vierek.com.ar/`, `middleware.js` decide en este orden:

1. Si la persona ya eligió un idioma en el selector, se respeta (cookie `gw_lang`, dura un año).
2. Si no, se usa el país de su IP: países de habla hispana → español; Brasil, Portugal y otros de habla portuguesa → portugués; el resto → inglés.
3. Si Vercel no informa el país, se usa el idioma del navegador. Si nada coincide, español.

El selector ES / EN / PT de la barra superior siempre está visible.

## Cambios frecuentes

- **Un texto:** cambialo en los tres `src/i18n/*.json`. El build falla si un idioma tiene claves que otro no tiene.
- **Un idioma nuevo:** agregá `src/i18n/<código>.json`, sumalo a `LANGS` en `build.mjs` y en `middleware.js`, y generá su `public/assets/og-<código>.png`.
- **Dirección de la app:** está en `APP_URL`, al principio de `public/main.js`. Los `href` de `src/template.html` quedan como respaldo si el JS no carga.
- **Ejemplos del producto:** el marcador, las estadísticas y los paneles están hechos en HTML (no son capturas) y llevan la etiqueta "Ejemplo".

## Verlo en local

```
node build.mjs
npx serve dist
```

En local no corre el middleware: la raíz usa `public/lang.js`, que elige por el idioma del navegador.

## Diseño

Sigue el sistema de la app ("Scoreboard táctico", `DESIGN.md` del frontend, y el manual de marca v1.1): fondo carbón, bordes de 1 px en lugar de sombras, cian solo para acción y progreso, azul solo para datos, verde y rojo solo para resultados, ámbar solo para la etiqueta "Ejemplo". Sin etiquetas en mayúscula arriba de los títulos, sin degradados y con una sola animación (el marcador del inicio marcando el patrón partida por partida), que se apaga con "reducir movimiento".

## Medición

La página carga Vercel Web Analytics. Para que cuente visitas hay que activar **Analytics** en el proyecto de Vercel. Los clics en los botones se envían como evento `cta_click` con el lugar del botón y el idioma (los eventos personalizados requieren un plan pago de Vercel; las visitas se cuentan igual en el plan gratis).
