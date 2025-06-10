<?php
/*
Plugin Name: AI Chatbot MVP
*/
require_once __DIR__ . '/includes/class-chat-api.php';
(new Chat_API())->register_routes();

function enqueue_chatbot() {
  wp_enqueue_script(
    'ai-chatbot-frontend',
    plugins_url('/dist/frontend.js', __FILE__),
    [], // No dependencies
    filemtime(__DIR__ . '/dist/frontend.js')
  );
  wp_localize_script('ai-chatbot-frontend', 'wpApiSettings', [
    'root' => esc_url_raw(rest_url()),
    'nonce' => wp_create_nonce('wp_rest')
  ]);
}
add_action('wp_enqueue_scripts', 'enqueue_chatbot');