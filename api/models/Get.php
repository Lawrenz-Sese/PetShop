
   
<?php


class Get{
    protected $gm, $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }
    

    public function pullPets($d)
    {
    
        $sql = "SELECT * FROM tbl_pet";
    
        
        $res = $this->gm->generalQuery($sql, "No records found");
        if ($res['code'] == 200) {
            $payload = $res['data'];
            $remarks = "success";
            $message = "Successfully retrieved requested data";
        } else {
            $payload = null;
            $remarks = "failed";
            $message = $res['errmsg'];
        }
        return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
    
    }

    public function pullCart($d)
    {
    
        $sql = "SELECT * FROM tbl_cart WHERE user_id = '$d->user_id'";
    
        
        $res = $this->gm->generalQuery($sql, "No records found");
        if ($res['code'] == 200) {
            $payload = $res['data'];
            $remarks = "success";
            $message = "Successfully retrieved requested data";
        } else {
            $payload = null;
            $remarks = "failed";
            $message = $res['errmsg'];
        }
        return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
    
    }

    public function pullUser($d)
    {
    
        $sql = "SELECT * FROM tbl_user WHERE user_id = '$d->user_id'";
    
        
        $res = $this->gm->generalQuery($sql, "No records found");
        if ($res['code'] == 200) {
            $payload = $res['data'];
            $remarks = "success";
            $message = "Successfully retrieved requested data";
        } else {
            $payload = null;
            $remarks = "failed";
            $message = $res['errmsg'];
        }
        return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
    
    }

    public function pullCheckout($d)
    {
    
        $sql = "SELECT * FROM tbl_checkout WHERE user_id = '$d->user_id'";
    
        
        $res = $this->gm->generalQuery($sql, "No records found");
        if ($res['code'] == 200) {
            $payload = $res['data'];
            $remarks = "success";
            $message = "Successfully retrieved requested data";
        } else {
            $payload = null;
            $remarks = "failed";
            $message = $res['errmsg'];
        }
        return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
    
    }

    public function pullOrders($d)
    {
    
        $sql = "SELECT * FROM tbl_checkout WHERE isApproved = '0'";
    
        
        $res = $this->gm->generalQuery($sql, "No records found");
        if ($res['code'] == 200) {
            $payload = $res['data'];
            $remarks = "success";
            $message = "Successfully retrieved requested data";
        } else {
            $payload = null;
            $remarks = "failed";
            $message = $res['errmsg'];
        }
        return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
    
    }

    public function pullCheckoutDetails($d)
    {
    
        $sql = "SELECT * FROM tbl_checkitems WHERE code = '$d->code'";
    
        
        $res = $this->gm->generalQuery($sql, "No records found");
        if ($res['code'] == 200) {
            $payload = $res['data'];
            $remarks = "success";
            $message = "Successfully retrieved requested data";
        } else {
            $payload = null;
            $remarks = "failed";
            $message = $res['errmsg'];
        }
        return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
    
    }

    public function pullFavorites($d)
    {
    
        $sql = "SELECT * FROM tbl_favorite WHERE user_id = '$d->user_id'";
    
        
        $res = $this->gm->generalQuery($sql, "No records found");
        if ($res['code'] == 200) {
            $payload = $res['data'];
            $remarks = "success";
            $message = "Successfully retrieved requested data";
        } else {
            $payload = null;
            $remarks = "failed";
            $message = $res['errmsg'];
        }
        return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
    
    }

    

    
    
    



}



?>