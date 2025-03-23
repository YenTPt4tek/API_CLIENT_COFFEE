<?php
 // In ra giá trị của MYSQL_HOST


// Khởi tạo và tải các biến môi trường từ .env
require_once 'Config.php';
Config::init();

// Kết nối MySQL
$host = Config::getDbHost();
$dbname = Config::getDbName();
$user = Config::getDbUser();
$pass = Config::getDbPass();
$port = 3306;

try {
  
    // Tạo kết nối PDO
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname";
    $pdo = new PDO($dsn, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  // Bật chế độ lỗi

    // Nếu kết nối thành công
    echo "Kết nối MySQL thành công!";
} catch (PDOException $e) {
    // Nếu có lỗi, in ra thông báo lỗi
    echo "Lỗi kết nối: " . $e->getMessage();
}