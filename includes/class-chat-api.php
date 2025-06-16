<?php
class Chat_API {
  private $knowledge = [
    "hello" => "Hi there! How can I help?",
    "bye" => "Goodbye! Come back soon."
  ];

  public function register_routes() {
    // If you're calling rest_url() or anything that needs routing
    // needs to be wrapped in this action, otherwise 
    // this error:PHP Fatal error:  Uncaught Error: Call to a member function using_index_permalinks() on null in .../wp-includes/rest-api.php:477
    add_action('rest_api_init', function() {
      register_rest_route('ai-chatbot/v1', '/ask', [
        'methods' => 'POST',
        'callback' => [$this, 'handle_question'],
        'permission_callback' => '__return_true'
      ]);
    });
  }

  public function handle_question($request) {
    $question = strtolower($request['question']);
    return $this->knowledge[$question] ?? "I don't know the answer yet.";
  }
}