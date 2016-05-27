if($(document).ready()){
    $("header").css("height",$(window).height());


    var pcLable=$("#pc").find('input[type="text"]');
    var winLable=$("#windows").find('input[type="text"]');
    var linuxLable=$("#linux").find('input[type="text"]');
    var result=0;
    var resultMax=0;
    var PricePC=0;

    var PriceLable=$('#price');
    var PriceLableMax=$('#maxprice');
    //var ServicePriceLable=$('#Serviceprice');
    //var ServicePriceline=$('#Serviceline');

    var prices=[21 , 8 , 51 , 7 , 81 , 6 , 101, 5];

    var maxServicePrice=0;
    var ServicePrice=0;
    var WindowsMass=[];
    var LinuxMass=[];

    var activeBlock=$("#calculator li.active");

    $('#pc-slider').jRange({ // Слайдер для ПК
        from: 0,
        to: 100,
        step: 1,
        scale: [0,25,50,75,100],
        format: '%s',
        width: 100+'%',
        showLabels: false,
        onstatechange : function ()
        {
            pcLable.val(parseInt(this.options.value,10));
            UpdatePrice();
        }
    });
    $('#win-slider').jRange({ // Сдайдер для Виндоус
        from: 0,
        to: 12,
        step: 1,
        scale: [0,3,6,9,12],
        format: '%s',
        width: 100+'%',
        showLabels: false,
        onstatechange : function ()
        {
            winLable.val(parseInt(this.options.value,10));
            UpdatePrice();
        }
    });
    $('#linux-slider').jRange({ // Слайдер для линукса
        from: 0,
        to: 12,
        step: 1,
        scale: [0,3,6,9,12],
        format: '%s',
        width: 100+'%',
        showLabels: false,
        onstatechange : function ()
        {
            linuxLable.val(parseInt(this.options.value,10));
            UpdatePrice();
        }
    });

    $.each($('li[data-block]'), function (index,e) {
        var block=$(e).data('block');
        $(block.toString()).on("click", function () {
            activeBlock.removeClass('active');
            $(activeBlock.data('block')).removeClass("active");

            activeBlock=$(e);

            activeBlock.addClass('active');
            $(activeBlock.data('block')).addClass("active");
        });
    });

    $.each($('li[data-block="#windows"] label'), function (index,e) {
        $(e).find("input[type='checkbox']").on("change",function(){
            if(this.checked) {
                ServicePrice += parseInt(this.value,10); // Добавить к цене услуг
                maxServicePrice +=parseInt($(this).data('max-price'),10);
                WindowsMass.push($(e).text()); // Пуш в массив виндоус
            }
            else{
                ServicePrice -= parseInt(this.value,10); // Отнять от цены услуг
                maxServicePrice -=parseInt($(this).data('max-price'),10);
                var temp = WindowsMass.indexOf(e.html); // Найти и ->
                WindowsMass.splice(temp,1); // Удалить из массива виндоус
            }
            UpdatePrice();
        });

    });

    $.each($('li[data-block="#linux"] label'), function (index,e) {
        $(e).find("input[type='checkbox']").on("change",function(){
            if(this.checked) {
                ServicePrice += parseInt(this.value,10); // Добавить к цене услуг
                maxServicePrice -=parseInt($(this).data('max-price'),10);
                LinuxMass.push($(e).text());
            }
            else{
                ServicePrice += parseInt(this.value,10); // Отнять от цены услуг
                maxServicePrice -=parseInt($(this).data('max-price'),10);
                var temp = LinuxMass.indexOf(e.html);   // Найти и ->
                LinuxMass.splice(temp,1); // Удалить из массива Линуксов
            }
            UpdatePrice();
        });
    });

    function UpdatePrice(){
        for(var i=0; i<prices.length; i+=2) // Определения цены
        {
            if(parseInt(pcLable.val(),10)<prices[i]){
                PricePC = parseFloat(prices[i + 1]);
                break;
            }
        }
        result = (pcLable.val() * (PricePC-2) + winLable.val() * 40 + linuxLable.val() * 40 + ServicePrice); // Формула
        resultMax = (pcLable.val() * PricePC + winLable.val() * 50 + linuxLable.val() * 50 + maxServicePrice); // Формула
        PriceLable.numerator({ // Анимация цыфр
            easing: 'swing',
            duration: 300,
            rounding: 1,
            delimiter: ".",
            toValue: result
        });
        PriceLableMax.numerator({ // Анимация цыфр
            easing: 'swing',
            duration: 300,
            rounding: 1,
            delimiter: ".",
            toValue: resultMax
        });
    }
    //function ServiceUpdatePrice(){
    //    if(ServicePrice>0){
    //        $(ServicePriceline).removeClass('disable');
    //    }
    //    else{
    //        $(ServicePriceline).addClass('disable');
    //    }
    //    ServicePriceLable.numerator({ // Анимация цыфр
    //        easing: 'swing',
    //        duration: 300,
    //        rounding: 1,
    //        delimiter: ".",
    //        toValue: ServicePrice
    //    });
    //}


    function ClcSerialize(){
        var string="Ничего не выбрано";
        if(result>0) {
            string = "Общая цена : " + result.toString() + ' - ' + resultMax.toString() + '$ ;';
            string += "Количество ПК : " + pcLable.val() + ';';
            if(winLable.val()>0)
                string += "Количество Windows серевров : " + winLable.val() + ';';
            if(linuxLable.val()>0)
                string += "Количество Linux серверов : " + linuxLable.val() + ';';
            if(WindowsMass.length>0 || LinuxMass.length>0) {
                string += "Доп услуги на цену : " + ServicePrice + ';';
                if(WindowsMass.length>0) {
                    string += "Windows услуги : " + ' ';
                    $.each(WindowsMass, function (index,u) {
                        string += "Услуга : " + u + ';';
                    });
                }
                if(LinuxMass.length>0) {
                    string += "Linux услуги : ";
                    $.each(LinuxMass, function (index,u) {
                        string += "Услуга : " + u + ' ';
                    });
                }
            }
        }
        return string;
    }
}