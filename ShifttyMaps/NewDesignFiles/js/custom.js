$(document).ready(function() {
    $('.accordion').expander({
        opened: false,
    });
});

// $(".MenuAside").mCustomScrollbar({
//     theme: "minimal",
// });

$(".notificationsBlock").mCustomScrollbar({
    theme: "minimal",
});

$(document).ready(function() {
    $('#example').DataTable();
});

$(document).ready(function() {
    $(".MenuToggle").click(function() {
        $("body").toggleClass("AsideClose");
    });
    $(".mapPage .MenuToggle").click(function() {
        $("body").toggleClass("AsideCloseFull");
    });


    $(".btnShowFilterDiv").click(function () {
        $(".showFilters").toggleClass("openFilter");
    });
});

$(document).ready(function() {
    $('.js-example-basic-multiple').select2({
        closeOnSelect: false,
        multiple: true
    });
});


$(document).ready(function() {
    $(".SampleIcon").click(function() {
        $("body").toggleClass("OpenFilter");
        $("body").addClass("particle");
    });
    $(".CloseFilterDrawer").click(function() {
        $("body").removeClass("OpenFilter");
        $("body").removeClass("particle");
    });
});



$('.FilterBlock').on('click', 'li', function() {
    $('.FilterBlock li.current').removeClass('current');
    $(this).addClass('current');
});

// Options with images

//test for getting url value from attr
// var img1 = $('.test').attr("data-thumbnail");
// console.log(img1);

//test for iterating over child elements
var langArray = [];
$('.vodiapicker option').each(function(){
  var img = $(this).attr("data-thumbnail");
  var text = this.innerText;
  var value = $(this).val();
  var item = '<li><img src="'+ img +'" alt="" value="'+value+'"/><span>'+ text +'</span></li>';
  langArray.push(item);
})

$('#a').html(langArray);

//Set the button value to the first el of the array
$('.btn-select').html(langArray[0]);
$('.btn-select').attr('value', 'en');

//change button stuff on click
$('#a li').click(function(){
   var img = $(this).find('img').attr("src");
   var value = $(this).find('img').attr('value');
   var text = this.innerText;
   var item = '<li><img src="'+ img +'" alt="" /><span>'+ text +'</span></li>';
  $('.btn-select').html(item);
  $('.btn-select').attr('value', value);
  $(".b").toggle();
  //console.log(value);
});

$(".btn-select").click(function(){
        $(".b").toggle();
    });

//check local storage for the lang
var sessionLang = localStorage.getItem('lang');
if (sessionLang){
  //find an item with value of sessionLang
  var langIndex = langArray.indexOf(sessionLang);
  $('.btn-select').html(langArray[langIndex]);
  $('.btn-select').attr('value', sessionLang);
} else {
   var langIndex = langArray.indexOf('ch');
  console.log(langIndex);
  $('.btn-select').html(langArray[langIndex]);
  //$('.btn-select').attr('value', 'en');
}


$(document).ready(function() {
    $(".menuBtnShow").click(function() {
        $("body").addClass("showMenu");
        $("body").removeClass("showFilter");
        $(".FilterBtnShow").show();
        $(".menuBtnShow").hide();
    });
    $(".FilterBtnShow").click(function() {
        $("body").removeClass("showMenu");
        $("body").addClass("showFilter");
        $(".menuBtnShow").show();
        $(".FilterBtnShow").hide();
    });
});


$('#html').jstree();