<?php
class CHAT_CPT {
    public static function register() {
        $labels = [
            'name' => 'AI Chatbot',
            'singular_name' => 'ai_chatbot',
            'add_new_item' => 'Add New knowledge',
            'edit_item' => 'Edit knowledge',
            'all_items' => 'All knowledge',
        ];

        $args = [
            'labels' => $labels,
            'public' => true,
            'show_in_menu' => true,
            'menu_icon' => 'dashicons-editor-help',
            'supports' => ['title', 'editor'],
             'rewrite' => ['slug' => 'aichatbot'],
        ];

        register_post_type('aichatbot', $args);
    }
}