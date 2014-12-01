/* jshint undef: false, unused: false */

$(function() {
    'use strict';

    /*
     * MENU
     *
     */
    var ISOPENCLASS = 'is-open';
    var _nav = $('nav');
    var _menu = $('.menu', _nav).on('click', toggleMenu);

    function toggleMenu(e) {
        _nav.toggleClass(ISOPENCLASS);
    }


    /*
     * SCROLLING FUNCTIONS
     *
     */
    (function() {

        var _FIXEDCLASS = 'is-fixed';
        var hasClassFixed;

        /*
         * Center single intro
         */
        var _projectSingleIntro = $('.project-single-intro');

        if (!_projectSingleIntro.length) {
            return;
        }

        // Be sure to update when image is loaded
        var _bigProjectImg = $('.project-img img', _projectSingleIntro);

        function checkImageLoaded() {
        	console.log('adasd');
            if (_bigProjectImg[0].complete) {
                updateLayout();
            } else {
                _projectSingleIntro.addClass('waiting');
                _bigProjectImg.on('load', updateLayout);
            }
        }

        checkImageLoaded();

        function updateLayout() {

            var projectSingleMargins = parseInt(($(window).height() - $('.project-img', _projectSingleIntro).height()) * 0.5, 10);

            if (projectSingleMargins < 0) {
                projectSingleMargins = 0;
            }

            _projectSingleIntro.css({
                'margin-top': projectSingleMargins,
                'margin-bottom': projectSingleMargins
            });




            //Scroll functions - Title
            var _title = $('.project-title', _projectSingleIntro);
            var titleOldTopPos = parseInt(_title.css('top'), 10);
            var titleNewTopPos = titleOldTopPos + projectSingleMargins;
            var titleHeight = _title.height();

            _title.css('top', titleNewTopPos).addClass(_FIXEDCLASS); // update top position because title is fixed
            hasClassFixed = true;


            // Remove class, and show image
            _projectSingleIntro.removeClass('waiting');


            // Scroll functions - Content
            var _text = $('.project-single-content');

            var breakpointScroll = _text.offset().top - titleNewTopPos - titleHeight;

            function handleOnScroll(e) {
                /*jshint validthis:true */
                var st = $(this).scrollTop();

                if (breakpointScroll <= st) {

                    if (hasClassFixed) {
                        _title.css('top', breakpointScroll + titleOldTopPos).removeClass(_FIXEDCLASS);
                        hasClassFixed = false;
                    }

                } else {
                    if (!hasClassFixed) {

                        _title.css('top', titleNewTopPos).addClass(_FIXEDCLASS);
                        hasClassFixed = true;
                    }
                }
            }

            // Bind Listeners
            $(window).on('scroll', handleOnScroll);


	        // $(window).on('resize', function () {
	        // 	_title.css('top',titleOldTopPos+'px')
	        // 	checkImageLoaded();
	        // });
        }

       




        //ON RESIZE
        /*
         $(window).unbind('scroll');
		updateLayout()
        */
    })();


});
