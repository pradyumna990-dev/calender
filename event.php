<?php
// Show errors while developing (you can remove later)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include DB connection
include 'db.php';

// Get the action type
$action = $_GET['action'] ?? '';

// Handle adding event
if ($action === 'add') {
    $title = $_POST['title'] ?? '';
    $date = $_POST['date'] ?? '';

    if ($title && $date) {
        $stmt = $conn->prepare("INSERT INTO events (title, event_date) VALUES (?, ?)");
        $stmt->bind_param("ss", $title, $date);
        $stmt->execute();
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Missing title or date"]);
    }
    exit;
}

// Handle fetching events for a date
if ($action === 'get') {
    header('Content-Type: application/json');
    $date = $_GET['date'] ?? '';
    $events = [];

    if ($date) {
        $stmt = $conn->prepare("SELECT id, title FROM events WHERE event_date = ?");
        $stmt->bind_param("s", $date);
        $stmt->execute();
        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc()) {
            $events[] = $row;
        }
    }

    echo json_encode($events);
    exit;
}

// If action is unknown
echo json_encode(["status" => "invalid_action"]);
?>
