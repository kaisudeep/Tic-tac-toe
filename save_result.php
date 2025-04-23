<?php
$conn = new mysqli("localhost", "root", "", "tic_tac_toe");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['result'])) {
    $result = $conn->real_escape_string($_POST['result']);
    $sql = "INSERT INTO game_results (result) VALUES ('$result')";
    if ($conn->query($sql)) {
        echo "Result saved";
    } else {
        echo "Error: " . $conn->error;
    }
} else {
    echo "No result received.";
}

$conn->close();
?>
