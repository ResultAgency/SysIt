<?php

$strHost = "192.168.XXX.XXX"; 
// адрес сервера asterisk
$strUser = "callback";
 // - логин для подключения к ami
$strSecret = "XXXXXXX";
 // -пароль кот. Указали в manager.conf
$strChannel = "LOCAL/1234@callback"; 
// канал с которого будет создаваться звонок,  тут можно по разному написать, если у вас всего один оператор будет совершать звонок то можно просто указать SIP/1234, но в таком случае вы не сможете дополнительно обрабатывать звонок,  удобнее указать did (номер назначения) и контекст, в моём примере контекст callback а номер 1234
$strContext = "callback"; 
// контекст в которому будет совершаться исходящий звонок
$strWaitTime = "30";
$strPriority = "1";
$strMaxRetry = "2";
 
$strExten = $_POST['txtphonenumber'];
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
fputs($oSocket, "WaitTime: $strWaitTime\r\n");
fputs($oSocket, "CallerId: $strCallerId\r\n");
fputs($oSocket, "Exten: $strExten\r\n");
fputs($oSocket, "Context: $strContext\r\n");
fputs($oSocket, "Priority: $strPriority\r\n\r\n");
fputs($oSocket, "Action: Logoff\r\n\r\n");
sleep (1);
fclose($oSocket);
?>
<p>
<table width="300" border="1" bordercolor="#630000" cellpadding="3" cellspacing="0">
        <tr><td>
        <font size="2" face="verdana,georgia" color="#630000">Производится вызов. Подождите пока Ваш телефон зазвонит!<br>Если телефон не позвонил в течении минуты, попробуйте ещё раз.<br><a href="<? echo $_SERVER['PHP_SELF'] ?>">Ещё раз</a></font>
        </td></tr>
</table>
</p>
<?
}
else
{
?>
<p>
<table width="300" border="1" bordercolor="#630000" cellpadding="3" cellspacing="0">
        <tr><td>
        <font size="2" face="verdana,arial,georgia" color="#630000">Введите Ваш номер без цифры 8 (XXX)XXX-XX-XX.</font>
        <form action="<? echo $_SERVER['PHP_SELF'] ?>" method="post">
                <input type="text" size="20" maxlength="11" name="txtphonenumber"><br>
                <input type="submit" value="Позвонить!">
        </form>
        </td></tr>
</table>
</p>
<?
}
?>
<script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
<script type="">
jQuery(document).ready(function($) {
 
    // Сворачиваем поле при открытии страницы
    //$('#rc-phone-form').css('width', '4.8em');
     
    $('#rc-phone').mouseenter(function(){
        // При наведении мыши на круг - раскрывается поле
        $('#rc-phone-form').css("overflow", "visible").show().animate({width: "375px"}, 500);
        $('#rc-phone').removeClass("rc-inactive");
 
        // При наведении мыши на поле - показываем крестик
        if ( $('#rc-phone-form').width() == "375" ) {
            $('#rc-phone-form-close').show();
            $('#rc-phone-form').css("overflow", "visible");
        }
    });
     
    // Скрываем крестик, когда мышь удаляется от поля
    $('#rc-phone').mouseleave(function(){
        $('#rc-phone-form-close').hide();
    });   
     
    // Смена фона при наведении мыши на кнопку отправки номера
    $('#rc-phone-button').mouseenter(function(){$('#rc-phone-button').css("background-color", "#18A629").addClass("rc-pressed")}).mouseleave(function(){$('#rc-phone-button').css("background-color", "#EEEEEE").removeClass("rc-pressed")}); 
     
    // Проверка номера телефона перед отправкой формы
    $('#form-phone').submit(function(){
        if ( ! $('#rc-phone-input').val() || $('#rc-phone-input').val().match(/[^0-9]/g) ) {
            $('#rc-phone-input-warning').addClass('rc-active');
            return false;
        }
        else{
            $('#rc-phone-input-warning').removeClass('rc-active');
        }
    })
     
    // Скрываем поле после нажатия на крестик
    $('#rc-phone-form-close').click(function(){
        $('#rc-phone-form-close').hide();
        $('#rc-phone-form').animate({width: "4.8em"}, 300, function(){
            $('#rc-phone-form').css("overflow", "hidden");
            $('#rc-phone').addClass("rc-inactive");
        });
 
    });
     
    // Проверка на ввод чисел
    $('#rc-phone-input').bind("change keyup input click", function() {
        $('#rc-phone-input-warning').removeClass('rc-active');
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
        if (this.value.length > 10) {
            this.value = this.value.substring(0,10);
        }
    });
     
    // AJAX запрос
    jQuery("#form-phone").submit( function() {
         
        // номер телефона, который отправляем в обработчик
        var txtphonenumber = jQuery('#rc-phone-input').val();
         
        jQuery.ajax({
            type : "post",
            dataType : "json",
        url : "http://sysit.com.ua/call.php",
            data : {txtphonenumber: txtphonenumber},
            success: function(response) {               
                if( response.error_msg ) {
 
                    jQuery("#rc-phone-input-warning").addClass("rc-active");
                    jQuery("#rc-phone-input-warning").children().text(response.error_msg);
 
                }
            }
        });   
    });
 
});</script>