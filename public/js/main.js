$(function(){


	$('[data-fancybox="Cases"]').fancybox({
		toolbar  : false,
		smallBtn : true,
		hideOnContentClick: true,
		hideOnOverlayClick: true,
		iframe : {
		preload : false
		}
	});

	$('.cases__wrapper').slick({
    dots: false,
    infinite: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    fade: true,
    prevArrow: '<img  class="slider-arrows cases-arrow-left"src="images/arrow-left.svg" alt=""></img>',
    nextArrow: '<img  class="slider-arrows cases-arrow-right"src="images/arrow-left.svg" alt=""></img>',
  //   responsive: [
	  // {
	  //     breakpoint: 1240, // - от какой ширины изменять настройки(1024 и ниже)
	  //     settings: {
	  //       // вносим изменения на ширине 1024 и ниже
	  //       slidesToShow: 3,
	  //       slidesToScroll: 1

	  //     }
	  //   },
	  // ]
 	 });
	$(".footer__btn-up").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

	$('.left').on('click', function(){
	$('.cases-arrow-left').trigger('click');
	});
	$('.right').on('click', function(){
	$('.cases-arrow-right').trigger('click');
	});
      
    var currentPage = $('.active_page').attr('id').split("_").pop();
    var format = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    var bussinessTheme,
        countOfCustomers,
        link,
        phone;


    $('.next').click(function () {
        if ($('.active_page input').val() != '') {

            if ($('#page_1').hasClass('active_page')) {
                bussinessTheme = $('.active_page#page_1 input').val();
                toggleNextPage();
            } else if ($('#page_2').hasClass('active_page')) {
                countOfCustomers = $('.active_page#page_2 input:checked').val();
                toggleNextPage();
            } else if ($('#page_3').hasClass('active_page')) {
                link = $('.active_page#page_3 input').val();
                toggleNextPage();
            } else if ($('#page_4').hasClass('active_page')) {
                    phone = $('.active_page#page_4 input').val();

                    var message =
                    '<b>ТЕМА: </b>ПРЕСОНАЛЬНЫЙ ПРОГНОЗ НА СТОИМОСТЬ ПРИВЛЕЧЕНИЯ КЛИЕНТОВ <br>' +
                    '<b>Тематика бизнеса: </b>' + bussinessTheme + '<br>' +
                    '<b>Количество клиентов в день: </b>' + countOfCustomers + '<br>' +
                    '<b>Instagram: </b>' + link + '<br>' +
                    '<b>Телефон: </b>' + phone + '<br>';
                    // sendMessage(message, 'ПРЕСОНАЛЬНЫЙ ПРОГНОЗ НА СТОИМОСТЬ ПРИВЛЕЧЕНИЯ КЛИЕНТОВ');
                    toggleNextPage();

                    send("Не указано",phone,"Персональный прогноз",link,bussinessTheme,countOfCustomers)
            }

            function toggleNextPage () {
                var nextPage = 1 + Number(currentPage);
                $('.active_page').removeClass('active_page');
                $('#page_'+nextPage).addClass('active_page');
                currentPage = nextPage;
            }
            
        } else {
            $('.active_page .error-message').show(400);
        }

    }); 

    $('.prev').click(function () {
        var prevPage = Number(currentPage) - 1;
        $('.active_page').removeClass('active_page');
        $('#page_'+prevPage).addClass('active_page');
        currentPage = prevPage;
    }); 

    $('.consultation-form').submit(function (e) {
        var message =
        '<b>ТЕМА: </b>Заявка на консультацию target-hunter <br>' +
        '<b>Имя: </b>' + $(this).find('.input-name').val() + '<br>' +
        '<b>Телефон: </b>' + $(this).find('.input-phone').val() + '<br>';

        if ($(this).find('select').length) {
            message += '<b>Подарок: </b>' + $('form select option:selected').val() + '<br>';
        }
        if ($(this).find('textarea').length) {
            message += '<b>Суть задачи: </b>' + $('form textarea').val() + '<br>';
        }

        // sendMessage(message, 'Заявка на консультацию target-hunter');
    });

    function sendMessage (message, subject) {
        var xhrForAdmin = new XMLHttpRequest();
        xhrForAdmin.open('POST', '/sendMessage', true);
        xhrForAdmin.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhrForAdmin.send('&message=' + message + '&subject=' + subject);
    }


    $('.btn-modal-open').click(function () {
        if ($(this).hasClass('btn-download')) {
            document.querySelector('.modal-title').style.display = 'none';
            document.querySelector('.modal-title-download').style.display = 'block';
        } else {
            document.querySelector('.modal-title').style.display = 'block';
            document.querySelector('.modal-title-download').style.display = 'none';
        }
        document.getElementById('overlay').classList.add('is-visible');
        document.getElementById('modal').classList.add('is-visible');

        $('#type-modal').attr("value","Консультация");

        if($(this).hasClass('start-type')){
            $('#type-modal').attr("value","Тариф Старт");
        }
        if($(this).hasClass('max-type')){
            $('#type-modal').attr("value","Тариф Максимум");
        }
        if($(this).hasClass('opt-type')){
            $('#type-modal').attr("value","Тариф Оптимальный");
        }
    });




    document.getElementById('btn-modal-close').addEventListener('click', function () {
        closeModal();        
    });

    document.getElementById('overlay').addEventListener('click', function () {
        document.getElementById('overlay').classList.remove('is-visible');
        document.getElementById('modal').classList.remove('is-visible');
        resetErrorState();
    });

    function closeModal () {
        document.getElementById('overlay').classList.remove('is-visible');
        document.getElementById('modal').classList.remove('is-visible');
        resetErrorState();
    }
    
});