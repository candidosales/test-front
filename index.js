$(document).ready(function () {

    $('.gallery').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        infinite: false,
        arrows: false
    });

    $filterItems = $('.filter-item');
    $filterTypeItems = $('.filter-type-item');

    var typeFilter = "1";

    $filterTypeItems.on('change', function () {
        typeFilter = $(this).val();
        filter();
    });

    $filterItems.on('click', function () {
       filter();
    });

    function filter() {
         console.log("filter type", typeFilter);

         var checkeds = [],
            checkedsNot = [];

        $('input[type="checkbox"]').each(function () {
            if ($(this).is(':checked')) {
                checkeds.push('.' + $(this).attr('data-filter'));
            } else {
                checkedsNot.push('.' + $(this).attr('data-filter'));
            }
        });

        console.log('checkeds.length', checkeds.length);

        if (checkeds.length > 0) {
            if (checkeds.length > 1) {
                console.log('tem agrupamento');
                switch (typeFilter) {
                    case "1":
                        checkeds = checkeds.concat(groupCheckeds(checkeds));
                        break;
                    case "2":
                        checkeds = groupCheckeds(checkeds);
                        break;
                }
            }

            console.log('checkeds final', checkeds);

            checkeds = checkeds.join(', ').replace(/, $/, "");
            checkedsNot = checkedsNot.join(', ').replace(/, $/, "");
            console.log(checkeds, checkedsNot);

            if (checkeds === "") {
                checkeds = "*";
                checkedsNot = "";
            }

            var allFilters = checkeds + ":not(" + checkedsNot + ")";
            console.log(allFilters);

            $('.filtering').slick('slickUnfilter').slick('slickFilter', allFilters);
        }
    }

    function groupCheckeds(checkeds) {
        var total = checkeds.length;
        var groups = [];

        for (var i = 0; i < total; i++) {
            var element = checkeds[i];
            console.log('element', element);
            for (var y = i + 1; y < total; y++) {
                groups.push(element.trim() + checkeds[y].trim());
                console.log('- possibilite', element.trim() + checkeds[y].trim());
            }
        }
        console.log('groups', groups);
        return groups;
    }

});