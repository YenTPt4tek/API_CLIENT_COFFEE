<?php

require __DIR__ . '/vendor/autoload.php';  // Đảm bảo rằng autoload Composer được bao gồm
use Dotenv\Dotenv;

class Config
{
    // Hàm khởi tạo để load tệp .env
    public static function init()
    {
        // Đảm bảo rằng thư mục env chứa file .env
        $dotenv = Dotenv::createImmutable(__DIR__ . '/env');
        $dotenv->load();
    }

    public static function getDbHost()
    {
        return getenv('MYSQL_HOST') ?: 'localhost';  // Trả về 'localhost' nếu không tìm thấy giá trị
    }

    public static function getDbName()
    {
        return getenv('MYSQL_DATABASE') ?: 'coffee_blend';  // Giá trị mặc định nếu không tìm thấy
    }

    public static function getDbUser()
    {
        return getenv('MYSQL_USER') ?: 'root';  // Giá trị mặc định nếu không tìm thấy
    }

    public static function getDbPass()
    {
        return getenv('MYSQL_PASSWORD') ?: '';  // Giá trị mặc định nếu không tìm thấy
    }

    public static function getJwtSecret()
    {
        return getenv('JWT_SECRET') ?: '';  // Giá trị mặc định nếu không tìm thấy
    }
}