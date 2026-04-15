=== Cotizador Metal Aluminio Farco ===
Contributors: Metal Aluminio Farco
Tags: cotizador, aluminio, ventanas, puertas, whatsapp
Requires at least: 5.0
Tested up to: 6.4
Stable tag: 2.3
License: GPLv2 or later

Un cotizador interactivo para ventanas y puertas de aluminio con ajustes personalizables y envío a WhatsApp.

== Description ==

Este plugin permite a los usuarios calcular un presupuesto referencial para trabajos de aluminio (ventanas, puertas, etc.) basado en el área (m2) y la calidad seleccionada. Los resultados pueden enviarse directamente a WhatsApp para una atención personalizada.

== Installation ==

1. Sube la carpeta `metal-aluminio-farco-quoter` al directorio `/wp-content/plugins/`.
2. Activa el plugin a través del menú 'Plugins' en WordPress.
3. Ve a 'Ajustes > Cotizador MAF' para configurar tu número de WhatsApp, colores y precios.
4. Usa el shortcode `[cotizador_aluminio]` en cualquier página o entrada.

== Changelog ==

= 2.3 =
* **Corrección de Conflictos de Estilo:** Se aplicó `!important` a las reglas críticas de CSS para evitar que el tema de WordPress sobrescriba los colores y el diseño.
* **Forzado de Caché:** Actualización a la v2.3 para asegurar que los navegadores carguen los nuevos estilos.

= 2.2 =
* **Ajuste Visual Exacto:** Se refinaron los estilos para coincidir exactamente con el diseño proporcionado (botones activos con borde azul y fondo blanco, bordes redondeados, sombras suaves).
* **Versión Final:** Preparado para descarga y uso en producción.

= 2.1 =
* **Forzado de Recarga de Assets:** Se incrementó la versión a 2.1 para forzar la recarga de CSS y JS en el navegador y evitar problemas de caché.
* **Ajustes Visuales:** Textos del panel izquierdo ahora son blancos para mejor contraste.
* **Hover de Botón:** Se cambió el color de hover del botón de WhatsApp a verde (#21c45d).
* **Nuevo Icono:** Se actualizó el icono del botón de WhatsApp por uno de tipo mensaje.

= 2.0 =
* **Panel de Ajustes Completo:** Ahora puedes cambiar el número de WhatsApp, los precios por m2 y el color de los botones directamente desde el escritorio de WordPress (Ajustes > Cotizador MAF).
* **Precios Dinámicos:** Los cálculos del cotizador ahora usan los valores que tú definas en los ajustes.
* **Personalización Visual:** Opción para cambiar el color primario y el tamaño de los textos.
* **Soporte Técnico:** Nueva sección independiente para agendar visitas técnicas.
* **Limpieza de Footer:** Se eliminaron elementos innecesarios y se organizaron los enlaces de soporte y garantías.
* **Optimización:** Código refactorizado para mayor velocidad y compatibilidad.

= 1.1 =
* Versión inicial del plugin convertido desde la aplicación web.
* Funcionalidad básica de cálculo y envío a WhatsApp.

== Settings ==

Puedes encontrar los ajustes en el menú lateral de WordPress: **Ajustes > Cotizador MAF**.

Ajustes disponibles:
* **WhatsApp:** Número al que llegarán las cotizaciones.
* **Color Primario:** Color principal de los botones y acentos.
* **Tamaño de Texto:** Ajusta la escala visual del cotizador.
* **Precios:** Define el valor por metro cuadrado para cada línea de calidad.
