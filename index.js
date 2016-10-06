$(document).ready(function(){

    $('.gallery').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        infinite: false
    });

  $filterItems =  $('.filter-item');

  $itemsOriginal = $('.item');
  $itemsCache = $itemsOriginal.clone();

  console.log($itemsCache.length);

  $filterItems.on('click', function() {
    var checkeds = [];
    var checkedsNot = [];

    $('input[type="checkbox"]').each(function() {
        if($(this).is(':checked')) {
            checkeds.push('.'+ $(this).attr('data-filter'));
        } else {
            checkedsNot.push('.'+ $(this).attr('data-filter'));
        }
    });
        
    checkeds = checkeds.join(', ').replace(/, $/, "");
    checkedsNot = checkedsNot.join(', ').replace(/, $/, "");
    console.log(checkeds, checkedsNot);

    if(checkeds === "") {
        checkeds = "*";
        checkedsNot = "";
    }

    var allFilters = checkeds + ":not(" + checkedsNot + ")";
    console.log(allFilters);

    $('.filtering').slick('slickUnfilter').slick('slickFilter' , allFilters);

  }); 

});