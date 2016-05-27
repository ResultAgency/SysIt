#--------------------------------------------------------------------------------------------
#Shouldn't need to edit anything below this point to make this script work
#--------------------------------------------------------------------------------------------
#get the phone number from the posted form
$strExten = !empty($_POST['txtphonenumber']) ? $_POST['txtphonenumber'] : '' ;
$default_error_msg = 'Проверьте правильность набранного номера.';
$error_msg = '';
 
// Проверка введенного номера
if ( ! empty($strExten) && ! preg_match('/^[0-9]{4,11}$/', $strExten) ) {
    $error_msg = 'Проверьте правильность набранного номера.';
}
elseif( ! empty($strExten) ) {
 
         $strHost = "192.168.XXX.XXX";
        $strUser = "test";
        $strSecret = "test";
        $strChannel = "LOCAL/1234@callback";
        $strContext = "test";
        $strWaitTime = "30000";
        $strPriority = "1";
        $strMaxRetry = "2";
 
    #specify the caller id for the call
    $strCallerId = "Web Call <$strExten>";
 
    $length = strlen($strExten);
 
    if ($length >= 7 && is_numeric($strExten))
    {
        $oSocket = fsockopen($strHost, 5038, $errnum, $errdesc) or die("Connection to host failed");
        fputs($oSocket, "Action: login\r\n");
        fputs($oSocket, "Events: off\r\n");
        fputs($oSocket, "Username: $strUser\r\n");
        fputs($oSocket, "Secret: $strSecret\r\n\r\n");
        fputs($oSocket, "Action: originate\r\n");
        fputs($oSocket, "Channel: $strChannel\r\n");
        fputs($oSocket, "Timeout: $strWaitTime\r\n");
        fputs($oSocket, "CallerId: $strCallerId\r\n");
        fputs($oSocket, "Exten: $strExten\r\n");
        fputs($oSocket, "Context: $strContext\r\n");
        fputs($oSocket, "Variable: var1=23|var2=24|var3=25\r\n");
        fputs($oSocket, "Priority: $strPriority\r\n\r\n");
        fputs($oSocket, "Action: Logoff\r\n\r\n");
        sleep (1);
        fclose($oSocket);
 
        $error_msg = 'Пожалуйста, подождите. Производится вызов.';
    }
}
 
// Данные, которые отправляется обратно в форму.
$result = array(
    "error_msg"     => $error_msg
);
 
echo json_encode( $result );
exit();