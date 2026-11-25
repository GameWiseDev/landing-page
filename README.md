# GAMEWISE — landing page

Landing pública de GAMEWISE para jugadores. Es HTML, CSS y JavaScript sin dependencias ni paso de build: Vercel publica los archivos tal cual.

## Archivos

| Archivo | Qué es |
| --- | --- |
| `index.html` | La página completa |
| `styles.css` | Estilos, con los colores y tipografías del manual de marca v1.1 |
| `main.js` | Dirección de la app, animaciones al hacer scroll y conteo de clics |
| `vercel.json` | Encabezados de seguridad y caché |
| `assets/` | Emblema, favicon, imagen para redes, badge de Leetify y las fuentes Barlow (alojadas acá, sin Google Fonts) |

## Cambios frecuentes

- **Dirección de la app:** está en `APP_URL`, al principio de `main.js`. Los botones con `data-app` la toman de ahí. Los `href` de `index.html` quedan como respaldo si el JS no carga, así que conviene cambiarlos también.
- **Textos:** todo está en `index.html`, ordenado por secciones con comentarios.
- **Ejemplos del producto:** las tarjetas que muestran la app están hechas en HTML (no son capturas) y llevan la etiqueta "Ejemplo".

## Verlo en local

```
npx serve .
```

## Medición

La página carga Vercel Web Analytics. Para que cuente visitas hay que activar **Analytics** en el proyecto de Vercel. Los clics en los botones se envían como evento `cta_click` con el lugar del botón (los eventos personalizados requieren un plan pago de Vercel; las visitas se cuentan igual en el plan gratis).

## Seguridad

`vercel.json` define una política de contenido (CSP) que solo permite recursos del propio sitio. El script en línea de `index.html` está autorizado por su hash: si se modifica, hay que actualizar el hash en `vercel.json`.
