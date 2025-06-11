<?php
/*
Plugin Name: AI Chatbot MVP
*/
require_once __DIR__ . '/includes/class-chat-api.php';
(new Chat_API())->register_routes();

function enqueue_chatbot() {
    // load React and ReactDOM from WordPress
  wp_enqueue_script('wp-element');

  wp_enqueue_script(
    'ai-chatbot-frontend',
    plugins_url('/build/index.js', __FILE__),
    ['wp-element', 'wp-react'], // wordpress's react 18 Dependencies
    filemtime(__DIR__ . '/build/index.js')
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

// Add shortcode to display chatbot
function chatbot_shortcode() {
  return '<div id="ai-chatbot-container"></div>'; // Must match your React root
}
add_shortcode('ai_chatbot', 'chatbot_shortcode');