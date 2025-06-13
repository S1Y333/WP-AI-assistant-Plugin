class ChatApiTest extends WP_UnitTestCase {
  public function test_hello_response() {
    $api = new Chat_API();
    $response = $api->handle_question(['question' => 'hello']);
    $this->assertEquals('Hi there!', $response);
  }
}