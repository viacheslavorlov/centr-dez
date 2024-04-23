<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

$mail = new PHPMailer(true);

try {
	//Server settings
	$mail->isSMTP();                                            // Send using SMTP
	$mail->Host = 'smtp.yandex.ru';                     // Set the SMTP server to send through
	$mail->SMTPAuth = true;                                   // Enable SMTP authentication
	$mail->Username = 'centr.dezen@yandex.ru';                            // SMTP username
	$mail->Password = 'lywosrhhsyxggeep';                        // SMTP password
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
	$mail->Port = 465;                                // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

	$mail->CharSet = 'UTF-8'; // явно устанавливаем кодировку для письма


	//Recipients
	$mail->setFrom('centr.dezen@yandex.ru', 'Центр дезинфекции, новый лендинг');
	$mail->addAddress('zakaz@centr-dez.ru', 'Центр дезинфекции, новый лендинг');     // Add a recipient
	$mail->addBCC('kv_nastya32@mail.ru', 'Центр дезинфекции, новый лендинг'); // копия для насти
	$mail->isHTML(true);  // Set email format to HTML
	$mail->Subject = 'Вам поступил заказ с нового сайта Центр дезинфекции';
	$pestType = isset($_POST["pest"]) ? $_POST["pest"] : 'Не указано';
	$premisesType = isset($_POST["place"]) ? $_POST["place"] : 'Не указано';
	$premisesArea = isset($_POST["s"]) ? $_POST["s"] : 'Не указано';
	$phoneNumber = isset($_POST["phone"]) ? $_POST["phone"] : 'Не указано';

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
