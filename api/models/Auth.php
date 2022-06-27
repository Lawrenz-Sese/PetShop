<?php
header("Access-Control-Allow-Origin: *");
	class Auth {
		protected $gm;


		public function __construct(\PDO $pdo) {
			$this->gm = new GlobalMethods($pdo);
			$this->pdo = $pdo;
		}
		

        ########################################
		# 	USER AUTHENTICATION RELATED METHODS
		########################################
		public function encrypt_password($pword) {
			$hashFormat="$2y$10$";
		    $saltLength=22;
		    $salt=$this->generate_salt($saltLength);
		    return crypt($pword,$hashFormat.$salt);
		}


        protected function generate_salt($len) {
			$urs=md5(uniqid(mt_rand(), true));
	    $b64String=base64_encode($urs);
	    $mb64String=str_replace('+','.', $b64String);
	    return substr($mb64String,0,$len);
		}

        public function pword_check($pword, $existingHash) {
			$hash=crypt($pword, $existingHash);
			if($hash===$existingHash){
				return true;
			}
			return false;
		}

		public function regUser($dt){
			$payload = "";
			$remarks = "";
			$message = "";
            $payload = $dt;
            $encryptedPassword = $this->encrypt_password($dt->user_password);

            $payload = array(
                'user_email'=>$dt->user_email,
                'user_password'=>$this->encrypt_password($dt->user_password)
            );

            $sql = "INSERT INTO tbl_user(user_name, user_address, user_contact, user_email,user_password) 
                           VALUES ('$dt->user_name','$dt->user_address','$dt->user_contact', '$dt->user_email','$encryptedPassword')";
                     

                           $data = array(); $code = 0; $errmsg= ""; $remarks = "";
                           try {
                       
                               if ($res = $this->pdo->query($sql)->fetchAll()) {
                                   foreach ($res as $rec) { array_push($data, $rec);}
                                   $res = null; 
								   $code = 200; $message = "Successfully Registered"; $remarks = "success";
                                   return array("code"=>200, "remarks"=>"success");
                               }
                           } catch (\PDOException $e) {
                               $errmsg = $e->getMessage();
                               $code = 403;
                           }
						   return $this->gm->sendPayload($payload, $remarks, $message, $code);                
        }






		public function loginUser($dt){
			$payload = $dt;
			$user_email = $dt->user_email;
			$user_password = $dt->user_password;
			$payload = "";
			$remarks = "";
			$message = "";
			$code = 0;

			$sql = "SELECT * FROM tbl_user WHERE user_email='$user_email' LIMIT 1";
			$res = $this->gm->generalQuery($sql, "Incorrect username or password");
			if($res['code'] == 200) {
				if($this->pword_check($user_password, $res['data'][0]['user_password'])) {
					
					$user_id = $res['data'][0]['user_id'];
					$user_name = $res['data'][0]['user_name'];
					$user_contact = $res['data'][0]['user_contact'];
					$user_address = $res['data'][0]['user_address'];
					$user_email = $res['data'][0]['user_email'];
					$isAdmin = $res['data'][0]['isAdmin'];
		
				

					$code = 200;
					$remarks = "success";
					$message = "Logged in successfully";
					$payload = array("user_id"=>$user_id,"user_address"=>$user_address, "user_name"=>$user_name, "user_contact"=>$user_contact,  "user_email"=>$user_email, "isAdmin"=>$isAdmin);
				} else {
					$payload = null; 
					$remarks = "failed"; 
					$message = "Incorrect username or password";
				}
			}	else {
				$payload = null; 
				$remarks = "failed"; 
				$message = $res['errmsg'];
			}
			return $this->gm->sendPayload($payload, $remarks, $message, $code);
		}

		public function loginStudent($dt){
			$payload = $dt;
			$student_username = $dt->student_username;
			$student_password = $dt->student_password;
			$payload = "";
			$remarks = "";
			$message = "";
			$code = 0;

			$sql = "SELECT * FROM tbl_studentaccount WHERE student_username='$student_username' LIMIT 1";
			$res = $this->gm->generalQuery($sql, "Incorrect username or password");
			if($res['code'] == 200) {
				if($this->pword_check($student_password, $res['data'][0]['student_password'])) {
					
					$student_fname = $res['data'][0]['student_fname'];
					$student_lname = $res['data'][0]['student_lname'];
					$rec_id = $res['data'][0]['rec_id'];
					$student_ID = $res['data'][0]['student_ID'];
		
				

					$code = 200;
					$remarks = "success";
					$message = "Logged in successfully";
					$payload = array("rec_id"=>$rec_id, "student_fname"=>$student_fname, "student_lname"=>$student_lname, "student_ID"=>$student_ID);
				} else {
					$payload = null; 
					$remarks = "failed"; 
					$message = "Incorrect username or password";
				}
			}	else {
				$payload = null; 
				$remarks = "failed"; 
				$message = $res['errmsg'];
			}
			return $this->gm->sendPayload($payload, $remarks, $message, $code);
		}


    }
    ?>