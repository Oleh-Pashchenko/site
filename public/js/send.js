$('.send_btn_1').click(function () {
    var name = $('.input-name_1').val();
    var phone = $('.input-phone_1').val();
    var type = "Консультация";
    send(name,phone,type);
});
$('.send_btn_2').click(function () {
    var name = $('.input-name_2').val();
    var phone = $('.input-phone_2').val();
    var type = "Консультация";
    send(name,phone,type);
});
$('.send_without_modal-3').click(function () {
    var name = $('.name-input-3').val();
    var phone = $('.phone-input-3').val();
    var type = $('.type-input-3').val();
    send(name,phone,type);
});
$('#modal-consultation-btn').click(function () {
    var name = $('#name_modal').val();
    var phone = $('#phone_modal').val();
    var type = $('#type-modal').val();
    send(name,phone,type);
});

$('.btn_w_txt').click(function () {
    var name = $('#name_t').val();
    var phone = $('#tel_t').val();
    var type = 'Суть задачи: '+$('#text_t').val();
    send(name,phone,type);
});

function send(name,phone,type, site = null, theme = null,clients = null) {
    $.ajax({
        type: "POST",
        url: "sendMessage",
        data: {
            name:name,
            phone:phone,
            type: type,
            site:site,
            theme: theme,
            clients: clients
        },
        success:function () {
            alert('Заявка успешно отправлена, оператор свяжется с вами в течении 30 минут!');
        }
    })
}