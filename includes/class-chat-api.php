<?php
class Chat_API {
//   this is the backend of connecting agent
// private $knowledge = [
//     "hello" => "Hi there! How can I help?",
//     "bye" => "Goodbye! Come back soon."
//   ];
 private $knowledge = [];

    // Load knowledge base from the Knowledge API
    private function load_knowledge() {
       // Example: get knowledge from the database (option)
        $knowledge = get_option('ai_chatbot_knowledge', []);
        // Convert to associative array for quick lookup
        foreach ($knowledge as $item) {
        $this->knowledge[strtolower($item['question'])] = $item['answer'];
        }
    }

   
//   revise the knowledge base from the knowledge API
    public function __construct() {
        // Load knowledge base from the Knowledge API
        $this->load_knowledge();
    }

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
    // Reload knowledge each time in case it was updated
    $this->load_knowledge();
    return $this->knowledge[$question] ?? "I don't know the answer yet.";
  }
}