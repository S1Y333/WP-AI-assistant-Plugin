<?php
/*
Plugin Name: AI Chatbot MVP
*/
require_once __DIR__ . '/includes/class-chat-api.php';
(new Chat_API())->register_routes();

// Include the Knowledge API for managing knowledge base
require_once __DIR__ . '/includes/class-knowledge-api.php';
(new Knowledge_API())->register_routes();

function enqueue_chatbot() {

     wp_enqueue_script('wp-element'); 

    wp_enqueue_script(
        'ai-chatbot-frontend',
        plugins_url('/frontend/build/index.js', __FILE__),
        array('wp-element'), // Only wp-element is needed for React
        filemtime(__DIR__ . '/frontend/build/index.js'),
        true
    );
    wp_localize_script('ai-chatbot-frontend', 'wpApiSettings', [
        'root' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest')
    ]);
}
     // Enqueue CSS if you have it
//   if (file_exists(__DIR__ . '/build/index.css')) {
//     wp_enqueue_style(
//       'ai-chatbot-styles',
//       plugins_url('/build/index.css', __FILE__),
//       [],
//       filemtime(__DIR__ . '/build/index.css')
//     );
//   }
// }

add_action('wp_enqueue_scripts', 'enqueue_chatbot');

// Enqueue admin scripts and styles
add_action('admin_enqueue_scripts', function($hook) {
    // Only load on your plugin's admin page
    if ($hook !== 'toplevel_page_ai-chatbot-admin') return;
    wp_enqueue_script('wp-element'); 
    wp_enqueue_script(
        'ai-chatbot-admin',
        plugins_url('/admin/build/index.js', __FILE__),
        ['wp-element'],
        filemtime(__DIR__ . '/admin/build/index.js'),
        true
    );
    // without this, React won't work
     wp_localize_script('ai-chatbot-admin', 'wpApiSettings', [
        'root' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest')
    ]);
});

// Register the admin menu
add_action('admin_menu', 'register_ai_chatbot_admin_page');

function register_ai_chatbot_admin_page() {
    add_menu_page(
        'AI Chatbot Settings',    // Page title (browser tab)
        'AI Chatbot',            // Menu title (sidebar)
        'manage_options',        // Capability (admin-only)
        'ai-chatbot-admin',      // Menu slug (URL identifier)
        'render_admin_page',     // Callback function to render the page
        'dashicons-robot',       // Icon (WordPress Dashicons)
        6                        // Position (optional, 6 = below Posts)
    );
}

// Callback to render the root div for React
function render_admin_page() {
    echo '<div id="ai-chatbot-admin-root"></div>';
}

// Add shortcode to display chatbot
function chatbot_shortcode() {
  return '<div id="ai-chatbot-container"></div>'; // Must match your React root
}
add_shortcode('ai_chatbot', 'chatbot_shortcode');