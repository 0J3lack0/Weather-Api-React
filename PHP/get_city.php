<?php

header("Access-Control-Allow-Origin: *"); //all domain
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "khadas";  
$password = "root";  
$dbname = "citiesdb";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die(json_encode(["error" => "Bağlantı hatası: " . $conn->connect_error]));
}


// POST req. den gelen veriyi burada alıyoruz. 
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') { //post olup olmadığını kontrol ediyoruz
    $input = file_get_contents("php://input");
    $data = json_decode($input, true); 
    
    if (isset($data['city_name'])) {
        $city_name = $data['city_name'] . "%";
        
        // SQL sorgusu like ile yapıldı çünkü tüm veriyi gönderdiğimizde verimsiz oluyor.
        $sql = "SELECT * FROM cities WHERE name LIKE ? ORDER BY name ASC"; 
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $city_name); 
        $stmt->execute();
        $result = $stmt->get_result();

        // sql sorgu sonucu 
        if ($result->num_rows > 0) {
            $cities = [];
            while ($row = $result->fetch_assoc()) {
                $cities[] = $row; // her datayı bir arraye ekle
            }
            echo json_encode(['cities' => $cities]);
        } else {
            echo json_encode(['message' => "No city found with name"]);
        }

        $stmt->close();
    } else {
        echo json_encode(['error' => 'City name not provided']);
    }
} else {
    echo json_encode(["message" => "Invalid request"]);
}

// Bağlantıyı kapat
$conn->close();
?>
