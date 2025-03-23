<?php
// require_once '../config/db.php';

// // Lấy kết nối từ Database
// $pdo = Database::getConnection();

// // Thực hiện các truy vấn
// $query = $pdo->query("SELECT * FROM users");

// while ($row = $query->fetch()) {
//     echo $row['first_name'] . "<br>";
// }


// Thông tin kết nối
$host = 'host.docker.internal';  // Kết nối tới MySQL trên máy chủ host (XAMPP)
$port = 3306;  // Cổng MySQL trong XAMPP (3306 là mặc định)
$dbname = 'coffee_blend';  // Tên cơ sở dữ liệu của bạn
$username = 'root';  // Tên người dùng MySQL trong XAMPP (mặc định là root)
$password = '';  // Mật khẩu MySQL trong XAMPP (mặc định là rỗng)

try {
    // Tạo kết nối PDO
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname";
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  // Bật chế độ lỗi

    // Nếu kết nối thành công
    echo "Kết nối MySQL thành công!";
} catch (PDOException $e) {
    // Nếu có lỗi, in ra thông báo lỗi
    echo "Lỗi kết nối: " . $e->getMessage();
}