<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';
$language = $input['language'] ?? 'en';

// Validate input
if (empty($username) || empty($password)) {
    $messages = [
        'en' => 'Username and password are required',
        'es' => 'Se requieren nombre de usuario y contraseña'
    ];
    echo json_encode([
        'success' => false,
        'message' => $messages[$language] ?? $messages['en']
    ]);
    exit;
}

$conn = getDBConnection();

// Prepare statement to prevent SQL injection
$stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    $messages = [
        'en' => 'Invalid username or password',
        'es' => 'Nombre de usuario o contraseña inválidos'
    ];
    echo json_encode([
        'success' => false,
        'message' => $messages[$language] ?? $messages['en']
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user['password'])) {
    $messages = [
        'en' => 'Invalid username or password',
        'es' => 'Nombre de usuario o contraseña inválidos'
    ];
    echo json_encode([
        'success' => false,
        'message' => $messages[$language] ?? $messages['en']
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

// Login successful
$messages = [
    'en' => 'Login successful! Welcome back.',
    'es' => '¡Inicio de sesión exitoso! Bienvenido de nuevo.'
];

echo json_encode([
    'success' => true,
    'message' => $messages[$language] ?? $messages['en'],
    'user' => [
        'id' => $user['id'],
        'username' => $user['username']
    ]
]);

$stmt->close();
$conn->close();
?>
