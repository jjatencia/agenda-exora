# Login mark

La marca del header del login se construyó únicamente con componentes `View` y gradientes, sin usar archivos binarios.

Si en el futuro se desea usar un PNG o SVG, colócalo en `./assets/images/logo-mark.png` y reemplaza el bloque de `View` por:

```jsx
<Image source={require('../../assets/images/logo-mark.png')} style={{ width: 60, height: 60 }} />
```

(No incluir el binario en el repositorio).
