var partnergalery=$("#partnergalery").owlCarousel({
    autoplay: false,
    mouseDrag: true,
    navigation: false,
    pagination:false,
    items: 4,
    loop: true,
    animateIn: true,
    responsiveClass: true,
    addClassActive:true,
    responsive: {
        0: {
            items: 2
        },
        768: {
            items: 3
        },
        1024: {
            items: 4
        },
        1200: {
            items: 4
        }
    }
}).data('owlCarousel');
var ourTeam=$("#ourTeam").owlCarousel({
    autoplay: true,
    autoplayTimeout: 3000,
    mouseDrag: true,
    navigation: false,
    pagination:false,
    items: 4,
    loop: true,
    animateIn: true,
    responsiveClass: true,
    addClassActive:true,
    responsive: {
        0: {
            items: 2
        },
        768: {
            items: 3
        },
        1024: {
            items: 4
        },
        1200: {
            items: 4
        }
    }
}).data('owlCarousel');
$(function () {
    $('[data-toggle="popover"]').popover()
});

var techWork=0;
var helpServ=0;

$('#Buy').find('.item').css('min-height',window.screen.availHeight-20);
var map = false;
var toslide = true;
var prices=[];

prices=[21 , 8 , 51 , 7 , 81 , 6 , 101, 5];

var countpc=0,price=8,PacPrice=0.5;
var unix=0,windows=0;


function myprice (coutprice) {
    for(var i=0 ;i < coutprice.length ; i+=2)
    {
        if(countpc<coutprice[i]){
            price = parseFloat(coutprice[i + 1] + PacPrice );
            break;
        }
    }
}
var activePacet=$('.prices.active');
function changePacet(Pacet){
    if(activePacet){
        activePacet.removeClass('active');
        activePacet.find('button').text("Выбрать");
    }
    activePacet=$(Pacet);
    activePacet.addClass('active');
    activePacet.find('button').text("Выбрано");
    PacPrice=parseFloat(activePacet.data('pacetprice'),10);
    console.log(PacPrice);
    myprice(prices);
    $( "#Result" ).text((countpc * price + unix * 30 + windows * 20)+servisePrice);
    console.log(countpc.toString()+'*'+price.toString()+'=' + countpc * price);
}

var activeServise=$('.box-button.active');
function changeServise(Servise){
    if(activeServise){
        activeServise.removeClass('active');
        var Slider=$(activeServise.data('servise'));
        Slider.parent('.slider-box').removeClass('active');
    }
    activeServise=$(Servise);
    activeServise.addClass('active');
    var newSlider=$(activeServise.data('servise'));
    newSlider.parent('.slider-box').addClass('active');

}

var temp;
var servisePrice=0;




$(".list-servise").on('click', function () {
    if($(this).hasClass('disable')){

        $(this).parent().find('.slider-container').tooltip('show');

        return false;
    }
    return true;
});
$('.list-servise input[type="checkbox"]').on('change',function(){

    //var AcList=$(this).parent().parent();

    if(this.checked){
        servisePrice+=parseFloat($(this).val(),10);
    }
    else{
        servisePrice-=parseFloat($(this).val(),10);
    }
    $( "#Result" ).text((countpc * price + unix * 30 + windows * 20)+servisePrice);
});

$('#pc').jRange({
    from: 0,
    to: 100,
    step: 1,
    scale: [0,25,50,75,100],
    format: '%s',
    width: 100+'%',
    showLabels: false,
    onstatechange : function ()
    {
        countpc=parseInt(this.options.value,10);
        myprice(prices);//Последовательность по возростанию : Значения,цена.
        $( "#Result" ).text((countpc * price + unix * 30 + windows * 20)+servisePrice);
        $( ".box-button.active .button-count" ).text(this.options.value);
    }
});
var WindowsList=$("#Windows").parent().find('.list-servise');
$('#Windows').jRange({
    from: 0,
    to: 12,
    step: 1,
    scale: [0,3,6,9,12],
    format: '%s',
    width: 100+'%',
    showLabels: false,
    onstatechange : function ()
    {
        windows=parseInt(this.options.value,10);
        $('.box-button.active .button-count').text(this.options.value);
        $( "#Result" ).text((countpc * price + unix * 30 + windows * 20)+servisePrice);
        if(windows==0) {
            WindowsList.addClass('disable');
            this.domNode.tooltip('show');
        }
        else{
            WindowsList.removeClass('disable');
            this.domNode.tooltip('hide');
        }
    }
});
var UnixList=$("#Unix").parent().find('.list-servise');
$('#Unix').jRange({
    from: 0,
    to: 12,
    step: 1,
    scale: [0,3,6,9,12],
    format: '%s',
    width: 100+'%',
    showLabels: false,
    onstatechange : function ()
    {
        unix=parseInt(this.options.value,10);
        $('.box-button.active .button-count').text(this.options.value);
        $( "#Result" ).text((countpc * price + unix * 30 + windows * 20)+servisePrice);
        if(unix==0) {
            UnixList.addClass('disable');
            this.domNode.tooltip('show');
        }
        else{
            UnixList.removeClass('disable');
            this.domNode.tooltip('hide');
        }
    }
});

if($(document).ready()){
    $(".list-servise").parent().find('.slider-container').tooltip({
        title:"Пожалуйста выберете 1 или больше сереров",
        delay: { "show": 500, "hide": 100 },
        placement:"bottom",
        trigger:"manual"
    });
}


var pacList=$(".list-servise");
$('#blablabla').on('shown.bs.modal', function (e) {
    var string='Общая стоймость : '+((countpc * price + unix * 30 + windows * 20)+servisePrice)+', Кол.Пк: '+countpc+', Цена за пк: '+price+', Кол.Серверо Unix: '+unix+', Кол.Серевров Windows: '+windows+',Доп Услуги :';

    $.each($(pacList[0]).find("input[type='checkbox']"), function () {
        if(this.checked){
            string+='; Windows:'+$(this).parent('label').text();
        }
    });
    $.each($(pacList[1]).find("input[type='checkbox']"), function () {
        if(this.checked){
            string+='; Unix:'+$(this).parent('label').text();
        }
    });
    $('#prod').val(string);
});

function come(elem) {
    var docViewTop = $(window).scrollTop(),
        docViewBottom = docViewTop + $(window).height(),
        elemTop = $(elem).offset().top,
        elemBottom = elemTop + $(elem).height();

    return (((elemBottom < docViewBottom) && (elemBottom > docViewTop)) || ((elemTop > docViewTop) && (elemTop < docViewBottom)));
}

$(window).scroll(function(){
        if(come('.prog_line'))
        {
            if (toslide) {
                $('.dk_blue span').hide().parent().css('width','0%');
                $('.blue span').hide().parent().css('width','0%');
                var main_wdt = 77;
                var wdt1 = parseInt($('.dk_blue span').text(), 10);
                var wdt2 = parseInt($('.blue span').text(), 10);

                var realwdt2 = Math.floor((wdt2 * main_wdt)/(wdt1+wdt2));
                var realwdt1 = main_wdt - realwdt2;
                $('.dk_blue').animate({width: realwdt1+"%"}, 'slow', function(){
                    $(this).children('span').show();
                    $('.blue').animate({width: realwdt2+"%"}, 'slow', function(){
                        $(this).children('span').show();
                    });
                });
                toslide = false;
            }
        }
    }
);

