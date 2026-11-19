<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Kredensial MySQL InfinityFree
$host = "sql206.infinityfree.com";
$user = "if0_43470205";
$pass = "A0A5jaHyVJ2";
// Di InfinityFree, nama database otomatis memakai awalan username hosting
$db   = "if0_43470205_db_tugas"; 

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Koneksi database gagal: " . $conn->connect_error]);
    exit();
}
$conn->set_charset("utf8mb4");

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'create';
$id     = isset($_GET['id']) ? intval($_GET['id']) : null;
$input  = json_decode(file_get_contents("php://input"), true);

// 1. AMBIL SEMUA TUGAS (GET)
if ($method === 'GET') {
    $result = $conn->query("SELECT * FROM tasks ORDER BY id DESC");
    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => $conn->error]);
        exit();
    }
    $tasks = [];
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
    echo json_encode($tasks);

// 2. TAMBAH, UBAH, STATUS, & HAPUS (POST)
} elseif ($method === 'POST') {
    
    // A. Hapus Tugas
    if ($action === 'delete' && $id) {
        $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(["message" => "Tugas berhasil dihapus"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $stmt->error]);
        }
        $stmt->close();

    // B. Ubah Status Selesai / Belum Selesai
    } elseif ($action === 'status' && $id) {
        $status = $input['status'] ?? 'Belum Selesai';
        $stmt = $conn->prepare("UPDATE tasks SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $status, $id);
        if ($stmt->execute()) {
            echo json_encode(["message" => "Status berhasil diperbarui"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $stmt->error]);
        }
        $stmt->close();

    // C. Edit Data Tugas
    } elseif ($action === 'update' && $id) {
        $title       = $input['title'] ?? '';
        $description = $input['description'] ?? '';
        $task_date   = !empty($input['task_date']) ? explode('T', (string)$input['task_date'])[0] : null;
        $due_date    = !empty($input['due_date']) ? explode('T', (string)$input['due_date'])[0] : null;
        $status      = $input['status'] ?? 'Belum Selesai';
        $file_name   = !empty($input['file_name']) ? $input['file_name'] : null;
        $file_data   = !empty($input['file_data']) ? $input['file_data'] : null;

        $stmt = $conn->prepare("UPDATE tasks SET title=?, description=?, task_date=?, due_date=?, status=?, file_name=?, file_data=? WHERE id=?");
        $stmt->bind_param("sssssssi", $title, $description, $task_date, $due_date, $status, $file_name, $file_data, $id);
        if ($stmt->execute()) {
            echo json_encode(["message" => "Tugas berhasil diperbarui"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $stmt->error]);
        }
        $stmt->close();

    // D. Tambah Tugas Baru (Default)
    } else {
        $title       = $input['title'] ?? '';
        $description = $input['description'] ?? '';
        $task_date   = !empty($input['task_date']) ? explode('T', (string)$input['task_date'])[0] : null;
        $due_date    = !empty($input['due_date']) ? explode('T', (string)$input['due_date'])[0] : null;
        $status      = $input['status'] ?? 'Belum Selesai';
        $file_name   = !empty($input['file_name']) ? $input['file_name'] : null;
        $file_data   = !empty($input['file_data']) ? $input['file_data'] : null;

        $stmt = $conn->prepare("INSERT INTO tasks (title, description, task_date, due_date, status, file_name, file_data) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssss", $title, $description, $task_date, $due_date, $status, $file_name, $file_data);
        if ($stmt->execute()) {
            $input['id'] = $stmt->insert_id;
            echo json_encode($input);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $stmt->error]);
        }
        $stmt->close();
    }
}

$conn->close();
?>
