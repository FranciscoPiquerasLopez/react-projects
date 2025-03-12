1. Encabezados ✅

Markdown:
# Encabezado de nivel 1
## Encabezado de nivel 2
### Encabezado de nivel 3

HTML:
<h1>Encabezado de nivel 1</h1>
<h2>Encabezado de nivel 2</h2>
<h3>Encabezado de nivel 3</h3>

2. Énfasis (Negrita o Itálica) ✅

Markdown:
Itálica: *texto en itálica* o _texto en itálica_
Negrita: **texto en negrita** o __texto en negrita__

HTML:
<em>texto en itálica</em>
<strong>texto en negrita</strong>

3. Listas desordenadas con el -, * o +

Markdown:
- Item 1
- Item 2

HTML:
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

4. Listas ordenadas:

Markdown:
1. Primer ítem
2. Segundo ítem

HTML:
<ol>
  <li>Primer ítem</li>
  <li>Segundo ítem</li>
</ol>

4. Enlaces:

Markdown:
[Texto del enlace](https://www.example.com)
[Enlace con título](https://www.example.com "Título opcional")

HTML:
<a href="https://www.example.com">Texto del enlace</a>
<a href="https://www.example.com" title="Título opcional">Enlace con título</a>

5. Imágenes:

Markdown:
![Texto alternativo](https://www.example.com/imagen.jpg)

HTML:
<img src="https://www.example.com/imagen.jpg" alt="Texto alternativo" />

6. Citas (Blockquotes):

Markdown:
> Esto es una cita

HTML:
<blockquote>
  <p>Esto es una cita</p>
</blockquote>

7. Código (Code): ✅

Markdown:
Esto es un `código en línea`.

HTML:
Esto es un <code>código en línea</code>.

8. Bloques de código:

Markdown:
```
Código en bloque
Código en bloque
Código en bloque
```

HTML:
<pre>
  <code>
    Código en bloque
    Código en bloque
    Código en bloque
  </code>
</pre>

9. Tablas:

HTML:
| Encabezado 1 | Encabezado 2 |
|--------------|--------------|
| Fila 1 Col 1 | Fila 1 Col 2 |
| Fila 2 Col 1 | Fila 2 Col 2 |

HTML:
<table>
  <tr>
    <th>Encabezado 1</th>
    <th>Encabezado 2</th>
  </tr>
  <tr>
    <td>Fila 1 Col 1</td>
    <td>Fila 1 Col 2</td>
  </tr>
  <tr>
    <td>Fila 2 Col 1</td>
    <td>Fila 2 Col 2</td>
  </tr>
</table>

10. Saltos de línea: ✅

Markdown:
Primera línea
Segunda línea

HTML:
Primera línea<br>Segunda línea

11. Listas de tareas (Task Lists):

Markdown:
- [ ] Tarea 1
- [x] Tarea 2

HTML:
<ul>
  <li><input type="checkbox" disabled> Tarea 1</li>
  <li><input type="checkbox" disabled checked> Tarea 2</li>
</ul>