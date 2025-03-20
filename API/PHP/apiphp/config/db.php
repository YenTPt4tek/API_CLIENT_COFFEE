<?php
require_once 'config.php'; // Bao gồm file config.php

class Database
{
    private static $instance = null;
    private $connection;

    private function __construct()
    {
        try {
            // Tạo kết nối PDO
            $dsn = "mysql:host=" . HOST . ";dbname=" . DATABASE . ";charset=utf8";  // DSN cho MySQL
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,  // Thiết lập chế độ báo lỗi
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,  // Mặc định lấy dữ liệu dưới dạng mảng kết hợp
                PDO::ATTR_EMULATE_PREPARES => false,  // Tắt chế độ mô phỏng chuẩn bị câu lệnh SQL
            ];

            // Tạo đối tượng PDO và gán vào $connection
            $this->connection = new PDO($dsn, USERNAME, PASSWORD, $options);
        } catch (PDOException $e) {
            // Xử lý lỗi nếu có
            echo "Connection failed: " . $e->getMessage();
            die(); // Dừng chương trình nếu không thể kết nối
        }
    }

    public static function getConnection()
    {
        // Nếu chưa có instance, tạo một instance mới
        if (self::$instance == null) {
            self::$instance = new Database();
        }
        return self::$instance->connection; // Trả về đối tượng kết nối PDO
    }
}