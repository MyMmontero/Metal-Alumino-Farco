<?php
/**
 * Plugin Name: Cotizador Metal Aluminio Farco
 * Description: Un cotizador interactivo para ventanas y puertas de aluminio con ajustes personalizables.
 * Version: 2.3
 * Author: Metal Aluminio Farco
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Configuración de Ajustes
function maf_quoter_register_settings() {
    register_setting( 'maf_quoter_settings_group', 'maf_quoter_whatsapp' );
    register_setting( 'maf_quoter_settings_group', 'maf_quoter_primary_color' );
    register_setting( 'maf_quoter_settings_group', 'maf_quoter_text_size' );
    register_setting( 'maf_quoter_settings_group', 'maf_quoter_price_estandar' );
    register_setting( 'maf_quoter_settings_group', 'maf_quoter_price_premium' );
}
add_action( 'admin_init', 'maf_quoter_register_settings' );

function maf_quoter_add_admin_menu() {
    add_options_page(
        'Ajustes del Cotizador',
        'Cotizador MAF',
        'manage_options',
        'maf-quoter-settings',
        'maf_quoter_settings_page'
    );
}
add_action( 'admin_menu', 'maf_quoter_add_admin_menu' );

function maf_quoter_settings_page() {
    ?>
    <div class="wrap">
        <h1>Ajustes del Cotizador Metal Aluminio Farco (v2.3)</h1>
        <p>Desde aquí puedes configurar los valores globales del cotizador que se muestra con el shortcode <code>[cotizador_aluminio]</code>.</p>
        <form method="post" action="options.php">
            <?php settings_fields( 'maf_quoter_settings_group' ); ?>
            <?php do_settings_sections( 'maf_quoter_settings_group' ); ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Número de WhatsApp</th>
                    <td>
                        <input type="text" name="maf_quoter_whatsapp" value="<?php echo esc_attr( get_option('maf_quoter_whatsapp', '573000000000') ); ?>" class="regular-text" />
                        <p class="description">Incluye el código de país sin el signo +. Ejemplo: 573000000000</p>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Color de Botones y Acentos</th>
                    <td>
                        <input type="color" name="maf_quoter_primary_color" value="<?php echo esc_attr( get_option('maf_quoter_primary_color', '#2563eb') ); ?>" />
                        <p class="description">Este color se aplicará a los botones y elementos destacados del cotizador.</p>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Tamaño de Fuente General</th>
                    <td>
                        <select name="maf_quoter_text_size">
                            <option value="small" <?php selected( get_option('maf_quoter_text_size'), 'small' ); ?>>Pequeño</option>
                            <option value="medium" <?php selected( get_option('maf_quoter_text_size', 'medium'), 'medium' ); ?>>Mediano</option>
                            <option value="large" <?php selected( get_option('maf_quoter_text_size'), 'large' ); ?>>Grande</option>
                        </select>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Precio por m² (Línea Estándar)</th>
                    <td>
                        <input type="number" name="maf_quoter_price_estandar" value="<?php echo esc_attr( get_option('maf_quoter_price_estandar', '150000') ); ?>" />
                        <p class="description">Valor base para cálculos con calidad estándar.</p>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Precio por m² (Línea Premium)</th>
                    <td>
                        <input type="number" name="maf_quoter_price_premium" value="<?php echo esc_attr( get_option('maf_quoter_price_premium', '250000') ); ?>" />
                        <p class="description">Valor base para cálculos con calidad premium.</p>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

function maf_quoter_enqueue_scripts() {
    wp_enqueue_style( 'maf-quoter-style', plugins_url( 'assets/css/style.css', __FILE__ ), array(), '2.3' );
    wp_enqueue_script( 'maf-quoter-script', plugins_url( 'assets/js/script.js', __FILE__ ), array(), '2.3', true );

    // Pasar ajustes al JS
    wp_localize_script( 'maf-quoter-script', 'mafSettings', array(
        'whatsapp' => get_option('maf_quoter_whatsapp', '573000000000'),
        'priceEstandar' => get_option('maf_quoter_price_estandar', '150000'),
        'pricePremium' => get_option('maf_quoter_price_premium', '250000'),
        'primaryColor' => get_option('maf_quoter_primary_color', '#2563eb'),
        'textSize' => get_option('maf_quoter_text_size', 'medium'),
    ));
}
add_action( 'wp_enqueue_scripts', 'maf_quoter_enqueue_scripts' );

function maf_quoter_shortcode() {
    $primary_color = get_option('maf_quoter_primary_color', '#2563eb');
    $text_size = get_option('maf_quoter_text_size', 'medium');
    
    $size_class = 'maf-size-' . $text_size;

    ob_start();
    ?>
    <style>
        :root {
            --maf-primary: <?php echo esc_attr($primary_color); ?>;
        }
    </style>
    <div id="maf-quoter-app" class="maf-quoter-container <?php echo esc_attr($size_class); ?>">
        <div class="maf-quoter-card">
            <!-- Panel Izquierdo (Resumen) -->
            <div class="maf-quoter-summary">
                <div class="maf-quoter-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="8" x2="16" y1="10" y2="10"/><line x1="8" x2="16" y1="14" y2="14"/><line x1="8" x2="16" y1="18" y2="18"/></svg>
                </div>
                <h2 class="maf-quoter-title">Cotizador Rápido</h2>
                <p class="maf-quoter-desc">Completa los datos para obtener un estimado. Te enviaremos una respuesta detallada por WhatsApp en menos de 4 horas.</p>
                
                <div class="maf-quoter-result-box">
                    <div class="maf-quoter-result-item">
                        <span class="maf-quoter-label">ÁREA ESTIMADA</span>
                        <span id="maf-area-display" class="maf-quoter-value">1.00 m²</span>
                    </div>
                    <div class="maf-quoter-result-item">
                        <span class="maf-quoter-label">VALOR REFERENCIAL</span>
                        <span id="maf-price-display" class="maf-quoter-value maf-price">$ 150.000</span>
                    </div>
                </div>

                <div class="maf-quoter-footer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    Respuesta en < 4 horas
                </div>
            </div>

            <!-- Panel Derecho (Formulario) -->
            <div class="maf-quoter-form">
                <div class="maf-form-group">
                    <label class="maf-form-label">¿QUÉ NECESITAS?</label>
                    <div class="maf-grid-2">
                        <button type="button" class="maf-type-btn active" data-type="ventana">Ventana</button>
                        <button type="button" class="maf-type-btn" data-type="puerta">Puerta</button>
                        <button type="button" class="maf-type-btn" data-type="baño">Baño</button>
                        <button type="button" class="maf-type-btn" data-type="otro">Otro</button>
                    </div>
                </div>

                <div class="maf-form-group">
                    <label class="maf-form-label">LÍNEA / CALIDAD</label>
                    <div class="maf-grid-2">
                        <button type="button" class="maf-material-btn active" data-material="estandar">Estándar</button>
                        <button type="button" class="maf-material-btn" data-material="premium">Premium</button>
                    </div>
                </div>

                <div class="maf-range-box">
                    <div class="maf-range-group">
                        <div class="maf-range-header">
                            <label class="maf-form-label">ANCHO APROX. (M)</label>
                            <span id="maf-width-val" class="maf-badge">1m</span>
                        </div>
                        <input type="range" id="maf-width-input" min="0.5" max="10" step="0.1" value="1">
                    </div>
                    <div class="maf-range-group">
                        <div class="maf-range-header">
                            <label class="maf-form-label">ALTO APROX. (M)</label>
                            <span id="maf-height-val" class="maf-badge">1m</span>
                        </div>
                        <input type="range" id="maf-height-input" min="0.5" max="10" step="0.1" value="1">
                    </div>
                </div>

                <button type="button" id="maf-whatsapp-btn" class="maf-submit-btn">
                    Enviar a WhatsApp
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L21 7.5z"/></svg>
                </button>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'cotizador_aluminio', 'maf_quoter_shortcode' );
