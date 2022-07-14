<?php 
	header("Access-Control-Allow-Origin: *");
	require_once("./config/Config.php");

	$db = new Connection();
	$pdo = $db->connect();
	$auth = new Auth($pdo);
	$gm = new GlobalMethods($pdo);
	$post = new Post($pdo);
	$get = new Get($pdo);


	if (isset($_REQUEST['request'])) {
		$req = explode('/', rtrim($_REQUEST['request'], '/'));
	} else {
		$req = array("errorcatcher");
	}

	switch($_SERVER['REQUEST_METHOD']) {
		case 'POST':

			switch($req[0]) {

				
				case 'userEmailVerification':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->userEmailVerification($d), JSON_PRETTY_PRINT);
				break;

				

				case 'verifyUserCode':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->verifyUserCode($d), JSON_PRETTY_PRINT);
				break;

				case 'regUser':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->regUser($d), JSON_PRETTY_PRINT);
				break;

			    case 'login':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->loginUser($d), JSON_PRETTY_PRINT);
				break;

				case 'massUpload':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->massUpload($d), JSON_PRETTY_PRINT);
				break;

				case 'addPet':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->addPet($d), JSON_PRETTY_PRINT);
				break;

				case 'addCart':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->AddCart($d), JSON_PRETTY_PRINT);
				break;

				case 'addCheckout':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->AddCheckout($d), JSON_PRETTY_PRINT);
				break;

				case 'addCheckoutDetails':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->AddCheckoutDetails($d), JSON_PRETTY_PRINT);
				break;

				case 'addFavorite':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->AddFavorite($d), JSON_PRETTY_PRINT);
				break;

				case 'pets':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($get->pullPets($d), JSON_PRETTY_PRINT);
				break;

				case 'checkout':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($get->pullCheckout($d), JSON_PRETTY_PRINT);
				break;

				case 'orders':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($get->pullOrders($d), JSON_PRETTY_PRINT);
				break;

				case 'favorite':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($get->pullFavorites($d), JSON_PRETTY_PRINT);
				break;

				case 'checkoutDetails':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($get->pullCheckoutDetails($d), JSON_PRETTY_PRINT);
				break;

				case 'cart':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($get->pullCart($d), JSON_PRETTY_PRINT);
				break;

				case 'user':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($get->pullUser($d), JSON_PRETTY_PRINT);
				break;

				case 'deletePets':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->deletePet($d), JSON_PRETTY_PRINT);
				break;

				case 'deleteCart':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->deleteCart($d), JSON_PRETTY_PRINT);
				break;

				case 'deleteFavorite':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->deleteFavorite($d), JSON_PRETTY_PRINT);
				break;

				case 'updatePets':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->updatePets($d), JSON_PRETTY_PRINT);
				break;

				case 'approveOrder':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->approveOrder($d), JSON_PRETTY_PRINT);
				break;

				

			}
		break;

		case 'GET':
			switch ($req[0]) {

				default:
				http_response_code(400);
				echo "Bad Request";
				break;
			}
		break;

		default:
			http_response_code(403);
			echo "Please contact the Systems Administrator";
		break;
	}
?>