<?php
class Knowledge_API {
  public function register_routes() {
    add_action('rest_api_init', function() {
    register_rest_route('ai-chatbot/v1', '/knowledge', [
      'methods'  => 'GET',
      'callback' => [$this, 'get_knowledge'],
      'permission_callback' => [$this, 'check_admin_permissions']
    ]);

    register_rest_route('ai-chatbot/v1', '/knowledge', [
      'methods'  => 'POST',
      'callback' => [$this, 'save_knowledge'],
      'permission_callback' => [$this, 'check_admin_permissions']
    ]);
});
  }

  public function get_knowledge() {
    return get_option('ai_chatbot_knowledge', []);
  }

  public function save_knowledge($request) {
    $knowledge = $request->get_json_params();
    update_option('ai_chatbot_knowledge', $knowledge);
    return ['success' => true];
  }

  public function check_admin_permissions() {
    return current_user_can('manage_options');
  }
}