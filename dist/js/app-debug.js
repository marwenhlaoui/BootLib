$(".btn-code").on('click',function(){
	var modal = $('#modal-code');
	var src = $(this).parent();
	var code_data = src.find('.code-data');
	var code_lang = code_data.attr('cs-lang');
	var code_title = code_data.attr('code-title');
	modal.find('.modal-title').html(code_title); 
	$(document).coderStyle({
		get: code_data,
		set: modal.find('.modal-body'),
		language: code_lang
	});
	modal.modal('show');
});
$('.set-code').coderStyle();

$('.popovers .btn').popover();
$('[data-toggle="tooltip"]').tooltip();
$('body').scrollspy({ target: '.theme-menu' });
$('body').scrollspy({ target: '#navbar-example1' });
$('body').scrollspy({ target: '#navbar-example2' });
$('body').scrollspy({ target: '#navbar-example3' });

$(document).ready(function () {
    $(window).scroll(function(){
        var ScrollTop = parseInt($(window).scrollTop()); 
        var menu = $('.theme-menu');
        if (ScrollTop > 100) {
        	menu.addClass('scroll-menu');
        }else{
        	menu.removeClass('scroll-menu'); 
        }
    });
});