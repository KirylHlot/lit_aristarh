////menu
var burger = document.querySelector('.burger');
var close_button = document.querySelector('.close_button');
var body = document.querySelector('.body');

burger.onclick = function() {
	body.classList.add('menu_open');
}

close_button.onclick = function() {
	hide_menu ();
}

function hide_menu () {
	body.classList.remove('menu_open');
}

$(function($){
	$(document).mouseup(function (e){
		let block = $(".burger"); 
		let menu_wrapper = $(".main_nav");
		if (!block.is(e.target)
			&& block.has(e.target).length === 0
				&& !menu_wrapper.is(e.target)
					&& menu_wrapper.has(e.target).length === 0) {
			hide_menu();
		}
	});
});

window.onload = function() {
	setMaxHeightByWrapper ("articles_img_wrapper", "articles_main_img");
	setMaxHeightAllBlocks ("articles_item");
	//index news
	setMaxHeightByWrapper ("img_wrapper_news_main", "news_main_img");
	setMaxHeightByWrapper ("img_wrapper_news_thumb", "news_thumb");
	cutStringBySymbolCount ("news_thumb_content", 250, true);	
	cutStringBySymbolCount ("news_main_content", 400, true);

	//index fotogal
	setMaxHeightByWrapper ("fotogalary_carousel_item", "fotogalary_carousel_img");

	//instagram
	setMaxHeightByWrapper ("insta_img", "instagram_img");

	//about
		setAboutCarouselContent();
	setMaxHeightByWrapper ("about_carousel_item", "about_carousel_img");	

	//magazine
	setMaxHeightByWrapper ("magazine_carousel_img_wrapper", "magazine_carousel_img");
	
	//footer
	setMaxHeightByWrapper ("footer_insta_img_a", "insta_img_footer");

	//fotoalbom
  setMaxHeightByWrapper ("img_container_fotoalbom", "img_container_fotoalbom_img");

  //inner news
  cutStringBySymbolCount ("mini_title_50", 50, true);
  setMaxHeightByWrapper ("inner_page_main_img_wrapper", "inner_page_main_img");


  addTitleAudio();

}// end window.onload


//fotogalary
$('.fotogalary_carousel').owlCarousel({
			loop: true,
			nav: false,
			dots: false,
			responsive: {
      0: {
         items: 1
      },      
      767: {
         items: 2
      }
   }
});

var fotogalary_carousel=$(".fotogalary_carousel"); 
fotogalary_carousel.owlCarousel(); 

$(".right_arrow").click(function(){ 
	fotogalary_carousel.trigger("next.owl.carousel"); 
}); 
$(".left_arrow").click(function(){ 
	fotogalary_carousel.trigger("prev.owl.carousel"); 
}); 


/////////////////////////////Instagram
$('.document').ready(function($){
  var tok = '12156444054.7a1c57c.036a5126b2944449a64b520e9c7e0253', // я уже давал ссылку чуть выше
      userid = 12156444054, // ID пользователя, можно выкопать в исходном HTML, можно использовать спец. сервисы либо просто смотрите следующий пример :)
      number = 20; // ну это понятно - сколько фоток хотим вывести

  $.ajax({
    url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent',
    dataType: 'jsonp',
    type: 'GET',
    data: {access_token: tok, count: number}, // передаем параметры, которые мы указывали выше
    success: function(result){

      for( x in result.data ){
        $('.instagram_inner').append('<div class="insta_img"><a href="'+result.data[x].link+'" target="_blank" class="insta_img_wrapper"><img class="instagram_img" src="'+result.data[x].images.low_resolution.url+'"></a></div>');         
         // result.data[x].images.standard_resolution.url //- URL картинки 612х612
         // result.data[x].images.low_resolution.url - это URL картинки среднего разрешения, 306х306
         // result.data[x].images.thumbnail.url //- URL картинки 150х150
         //<a href="'+result.data[x].link+'" target="_blank"></a>
      }
      $('.instagram_inner').addClass('owl-carousel');
      $('.instagram_inner').addClass('instagram_inner_carousel');
      $('.instagram_inner_carousel').owlCarousel({
				loop: false,
				nav: false,
				autoplay: false,
				autoplayHoverPause: false,
				responsiveClass: false,
				responsive: {
          0: {
            items: 1
          },
          575: {
             items: 2
          },
          767: {
             items: 2
          },          
          1200: {
             items: 4
          }
       },
        dots: false,
      }); 
    },      

    error: function(result){
      console.log('error instagram code')
    }

  });
});

 
/////////////////////////////end Instagram

//index about
$('.about_carousel').owlCarousel({
			loop: false,
			nav: false,
			dots: false,
			responsive: {
      0: {
         items: 1
      }   
   }
});

var about_carousel=$(".about_carousel"); 
about_carousel.owlCarousel(); 

$(".arr_right").click(function(){ 
	about_carousel.trigger("next.owl.carousel"); 
	setAboutCarouselContent();
}); 
$(".arr_left").click(function(){ 
	about_carousel.trigger("prev.owl.carousel"); 
	setAboutCarouselContent();
}); 

about_carousel.on('dragged.owl.carousel', function(event) {
	setAboutCarouselContent();
})

function setAboutCarouselContent() {
  if (document.querySelector('.about_content')){
    document.querySelector('.content_about').innerText = document.querySelector('.about_carousel').querySelector('.active').querySelector('.about_content').innerText;
  }
}

//magazine

$('.magazine_carousel').owlCarousel({
			loop: true,
			nav: true,
			navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
			dots: false,
			responsive: {
      0: {
         items: 1
      },      
      576: {
         items: 2
      },      
      992: {
         items: 3
      }
   }
});


///popup form
var magazine_popup = document.querySelector('.magazine_popup');
var magazine_carousel_item_mass = document.getElementsByClassName('magazine_carousel_item');
var close_button_popup = document.querySelector('.close_button_popup');
var choise_form_wrapper = document.querySelector('.choise_form_wrapper');


if (close_button_popup){
  close_button_popup.onclick = function(){
    hide_popup_magazine();
  }
}




for (let i = 0; i <magazine_carousel_item_mass.length; i++) {
  magazine_carousel_item_mass[i].addEventListener('click', function () {
    show_popup_magazine(this);
  });
}

function show_popup_magazine (elem) {
  if (magazine_popup){
    magazine_popup.querySelector(`.choise_title`).innerText = elem.querySelector(`.h3_title`).innerText;
    magazine_popup.querySelector(`.choise_сash`).innerText = elem.querySelector(`.price`).innerText;
    magazine_popup.classList.remove('d-none');
  }

}

function hide_popup_magazine (elem) {
  if (magazine_popup){
    magazine_popup.classList.add('d-none');
    magazine_popup.querySelector(`.choise_title`).innerText = "";
    magazine_popup.querySelector(`.choise_сash`).innerText = "";
  }

}

$(document).mouseup(function (e){
	    let block = $(".popup_wrapper");
	    if (!block.is(e.target)
	        && block.has(e.target).length === 0) {
          hide_popup_magazine();
	    }
	});

$(document).ready(function() {
   $(".choise_form_wrapper").submit(function() {
      $.ajax({
         type: "POST",
         url: "magazine_popup.php",
         data: $(this).serialize()
      }).done(function() {
         $(this).find("input, textarea").val("");
         formPopupAlertDone();
      }).fail(function() {
        alert('Ошибка соединения');
      });
      return false;
   });
});

function formPopupAlertDone() {
  formPopupAlertDoneClass.classList.remove('d-none');
  choise_form_wrapper.classList.add('d-none');
}


//footer form

$(document).ready(function() {
  $(".footer_form").submit(function() {
    $.ajax({
      type: "POST",
      url: "footer_popup.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input, textarea").val("");
      formFooterAlertDone();
    }).fail(function() {
      alert('Ошибка соединения');
    });
    return false;
  });
});

function formFooterAlertDone() {
  document.querySelector('.footer_form').classList.add('d-none');
  document.querySelector('.footer_form_alert_done').classList.remove('d-none');
}


audiojs.events.ready(function() {
  var as = audiojs.createAll();
});

function addTitleAudio () {
  let scrubberMass = document.getElementsByClassName('scrubber');

  for (var i = 0; i < scrubberMass.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.className  = "track_title";
    newDiv.innerHTML = scrubberMass[i].parentNode.parentNode.dataset.trackname + " - " + scrubberMass[i].parentNode.parentNode.dataset.tracauthor;
    scrubberMass[i].parentNode.insertBefore(newDiv, scrubberMass[i]);

    let buttonDownload = document.createElement("div");
    buttonDownload.className  = "button_download";
    buttonDownload.innerHTML = "<a href=\"" + scrubberMass[i].parentNode.getElementsByTagName('audio')[0].src +  "\" download><img src=\"img/down_icon.png\"><span>Download</span></a>";
    scrubberMass[i].parentNode.insertBefore(buttonDownload, scrubberMass[i].parentNode.querySelector('.error-message'));
  }
}

////publication parts

var part_title_wrapper_mass = document.getElementsByClassName('part_title_wrapper');

for (let i = 0; i <part_title_wrapper_mass.length ; i++) {
  part_title_wrapper_mass[i].addEventListener('click', function () {
    this.classList.toggle('content_showed');
    this.parentNode.querySelector('.hidden_content').classList.toggle('show_hidden_content');
  })
}
