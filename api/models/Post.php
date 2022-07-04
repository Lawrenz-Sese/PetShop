<?php

class Post{
    protected $gm, $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }

 //Mass Upload
 public function massUpload($dt){
 
    $genQuery = $dt->genQuery;
    $sql = "";
    //    student_year sa student table

    $sql .= "UPDATE students_table SET ".$genQuery;
        ;
    
   
  
             $res = $this->gm->generalQuery($sql, "Failed");
                    
                         if($res['code']!=200) {
                             
                             $code = 200;
                             $payload = array(
                                 "code" => 200,
                                 "msg" => "Success"
                             );
                             $remarks = "success";
                             $message = "Successfully retrieved data";
                           
                             
                             return $this->gm->sendPayload($payload, $remarks, $message, $code);
     
                     }
}



public function addPet($d) {

    $code = 401;
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";

    $res = $this->gm->insert('tbl_pet', $d);

    if($res['code']==200) {
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully added to the database";

    }
    return $this->gm->sendPayload($payload, $remarks, $message, $code);
}


public function AddCart($d) {

    $code = 401;
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";

    $res = $this->gm->insert('tbl_cart', $d);

    if($res['code']==200) {
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully added to the database";

    }
    return $this->gm->sendPayload($payload, $remarks, $message, $code);
}

public function AddCheckout($d) {

    $code = 401;
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";

    $res = $this->gm->insert('tbl_checkout', $d);

    if($res['code']==200) {
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully added to the database";

    }
    return $this->gm->sendPayload($payload, $remarks, $message, $code);
}

public function AddCheckoutDetails($d) {

    $code = 401;
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";

    $res = $this->gm->insert('tbl_checkitems', $d);

    if($res['code']==200) {
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully added to the database";

    }
    return $this->gm->sendPayload($payload, $remarks, $message, $code);
}

public function deletePet($d)
{
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";
    $sql = "DELETE FROM tbl_pet WHERE pet_id = '$d->pet_id'";

    $res = $this->gm->generalQuery($sql, "Failed");

    if ($res['code'] != 200) {
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully added to the database";
    }
    return $this->gm->sendPayload($payload, $remarks, $message, $code);
}

public function updatePets($d)
{
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";
    $sql = "UPDATE tbl_pet SET pet_breed = '$d->pet_breed',quantity ='$d->quantity', pet_price = '$d->pet_price', pet_category = '$d->pet_category', pet_description = '$d->pet_description', pet_img = '$d->pet_img' WHERE pet_id = '$d->pet_id'";

    $res = $this->gm->generalQuery($sql, "Failed");

    if ($res['code'] != 200) {
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully added to the database";
    }
    return $this->gm->sendPayload($payload, $remarks, $message, $code);
}

public function approveOrder($d)
{
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";
    $sql = "UPDATE tbl_checkout SET isApproved = '$d->isApproved' WHERE code = '$d->code'";

    $res = $this->gm->generalQuery($sql, "Failed");

    if ($res['code'] != 200) {
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully added to the database";
    }
    return $this->gm->sendPayload($payload, $remarks, $message, $code);
}

public function deleteCart($d)
{
    $payload = null;
    $remarks = "failed";
    $message = "Unable to retrieve data";
    $sql = "DELETE FROM tbl_cart WHERE cart_id = '$d->cart_id'";

    $res = $this->gm->generalQuery($sql, "Failed");

    if ($res['code'] != 200) {
        $code = 200;
        $payload = $res;
        $remarks = "success";
        $message = "Successfully added to the database";
    }
    return $this->gm->sendPayload($payload, $remarks, $message, $code);
}


}

?>