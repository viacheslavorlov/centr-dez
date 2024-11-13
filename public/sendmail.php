<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'envLoader.php';

loadEnv(__DIR__ . '/.env');
$mail = new PHPMailer(true);


try {
	//Server settings
	$mail->isSMTP();                                            // Send using SMTP
	$mail->Host = getenv('SMTP_HOST');                     // Set the SMTP server to send through
    $mail->SMTPAuth = true;                                   // Enable SMTP authentication
    $mail->Username = getenv('SMTP_USERNAME');                            // SMTP username
    $mail->Password = getenv('SMTP_PASSWORD');                        // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port = 465;                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above                                   // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
    $from = getenv('SMTP_FROM');
    $toAddr = getenv('SMTP_ADDRESS');
    $copy = getenv('SMTP_COPY');
	$mail->CharSet = 'UTF-8'; // явно устанавливаем кодировку для письма


	//Recipients
	$mail->setFrom(getenv('SMTP_FROM'), 'Центр дезинфекции, новый лендинг');
	$mail->addAddress(getenv('SMTP_ADDRESS'), 'Центр дезинфекции, новый лендинг');     // Add a recipient
	$mail->addBCC(getenv('SMTP_COPY'), 'Центр дезинфекции, новый лендинг'); // копия для насти
	$mail->isHTML(true);  // Set email format to HTML
	$mail->Subject = 'Вам поступил заказ с нового сайта Центр дезинфекции';
	$pestType = isset($_POST["pest"]) ? htmlspecialchars(trim($_POST["pest"])) : 'Не указано';
	$premisesType = isset($_POST["place"]) ? htmlspecialchars(trim($_POST["place"])) : 'Не указано';
	$premisesArea = isset($_POST["s"]) ? htmlspecialchars(trim($_POST["s"])) : 'Не указано';
	$phoneNumber = isset($_POST["phone"]) ? htmlspecialchars(trim($_POST["phone"])) : 'Не указано';

	$mail->Body = "Вид вредителя: " . $pestType
		. "<br><br>Вид помещения: " . $premisesType
		. "<br><br>Площадь помещения: " . $premisesArea
		. "<br><br>Телефон заказчика: " . $phoneNumber;

	$mail->AltBody = "Вид вредителя: " . $pestType
		. "Вид помещения: " . $premisesType
		. "Вид помещения: " . $premisesType
		. "Телефон заказчика: " . $phoneNumber;



	$mail->send();
	echo implode(', ', $_POST);
} catch (Exception $e) {
	echo "Сообщение не было отправлено. Mailer Error: {$mail->ErrorInfo}";
}
