/*
|------------------------------------------------------------
| Script for navigation for mobile
|------------------------------------------------------------
*/$(document).ready(function() {
    $('[data-nav-button]').on('click', function () {
        $('[data-nav-button-span]').toggleClass('is-opened');
        $('[data-nav]').toggleClass('is-collapsed');
    });

    $(window).on('resize', function () {
        if ($(window).width() > 768) {
            $('nav').find('ul').removeAttr('style');
        }
    });
 });

$(document).ready(function() {
    $('.NavButton').on('click', function() {
        $('nav').find('ul').slideToggle(700);
    })
});

/*
|------------------------------------------------------------
| Slide-show
|------------------------------------------------------------
*/

var Slider = function (options) {
    this.options = options;
    this.setElement();
    this.cache();
    this.bindEvents();
    this.initialize();
};

Slider.prototype = {
    $: function (child) {
        return this.$el.find(child);
    },

    setElement: function () {
        this.$el = $(this.options.el);
    },

    cache: function () {
        this.$slides = this.$('.slides li');
    },

    bindEvents: function () {
        this.$el.on('click', '.next-slide', $.proxy(this.next, this));
        this.$el.on('click', '.prev-slide', $.proxy(this.prev, this));
        this.$('.slides-nav').on('click', 'li', $.proxy(this.setSpecificSlide, this));
        $(window).on('keyup', $.proxy(this.trackKeyboard, this));
        $(window).on('resize', $.proxy(this.setParentHeight, this));
    },

    initialize: function () {
        this.len = this.$slides.length;
        this.active = 0;
        this.setRepeat();
        this.$('.slides li').first().fadeIn();
        setTimeout($.proxy(this.setParentHeight, this), 1000);
        this.setParentHeight();
    },

    setParentHeight: function (e) {
        this.$el.height(this.$('.slides li').first().height());
    },

    setRepeat: function () {
        this.repeatInterval = setInterval($.proxy(this.next, this), this.options.delay);
    },

    resetRepeat: function () {
        clearInterval(this.repeatInterval);
        this.setRepeat();
    },

    setActive: function (index) {
        this.active = index;
        this.$slides.fadeOut('slow').eq(this.active).fadeIn('slow');
    },

    next: function (e) {
        if (e) {
            e.preventDefault();
            this.resetRepeat();
        }
        this.setActive((this.len === this.active + 1) ? 0 : this.active + 1);
        return this;
    },

    prev: function (e) {
        if (e) {
            e.preventDefault();
            this.resetRepeat();
        }
        this.setActive((this.active - 1 === -1) ? this.len - 1 : this.active - 1);
        return this;
    },

    setSpecificSlide: function (e) {
        e && e.preventDefault();
        this.setActive($(e.currentTarget).index());
        return this;
    },

    trackKeyboard: function (e) {
        e.keyCode === 37 && this.prev(e);
        e.keyCode === 39 && this.next(e);
    }
};

/*
|------------------------------------------------------------
| Inicijalizacija za Slide-show
|------------------------------------------------------------
*/

$(function () {
    var slider = new Slider({ el: '#slider', delay: 3000 });

});

/*
|------------------------------------------------------------
| Galery slider
|------------------------------------------------------------
*/

(function () {
        window.Gallery = function (options) {
            this.options = options;
            this.setElements();
            this.setIndex();
            this.bindEvents();
            this.initialize();
        };

        Gallery.prototype = {
            $: function (child) {
                return this.$el.find(child);
            },

            setElements: function () {
                this.el = $(this.options.el)[0];
                this.$el = $(this.options.el);
                this.$li = this.$('li');
                this.$popup = $('.popup');
                this.$body = $('body');
            },

            setIndex: function () {
                this.$li.each(function (index) {
                    $(this).attr('data-gallery-index', index);
                });
            },

            bindEvents: function () {
                this.$el.on('click', 'li', $.proxy(this.open, this));
                this.$popup.on('click', '.cross', $.proxy(this.close, this));
                this.$popup.on('click', '.right', $.proxy(this.next, this));
                this.$popup.on('click', '.left', $.proxy(this.prev, this));
            },

            initialize: function () {
                this.lastIndex = this.$li.last().index();
            },

            popup: function (options) {
                this.$popup.find('img').attr('src', options.image).attr('alt', options.title);
                this.$popup.find('figcaption').text( options.title );
                this.$popup.show();
                return this;
            },

            setCurrent: function (index) {
                this.currentIndex = index;
                return this;
            },

            checkKey: function (e) {
                if ( e.keyCode === 27) {
                    return this.close(e);
                }

                if ( e.keyCode === 39 ) {
                    return this.next();
                }

                if ( e.keyCode === 37 ) {
                    return this.prev();
                }
            },

            open: function (e) {
                e.preventDefault();
                this.setCurrent( parseInt($(e.currentTarget).attr('data-gallery-index'), 10) ).show();
                this.$body.on('keydown', $.proxy(this.checkKey, this));
            },

            close: function (e) {
                e.preventDefault();
                this.$popup.hide();
                this.$body.off('keydown');
                return this;
            },

            next: function (e) {
                e && e.preventDefault();

                if ( this.currentIndex === this.lastIndex ) {
                    return this.setCurrent(0).show();
                }

                return this.setCurrent(this.currentIndex + 1).show();
            },

            prev: function (e) {
                e && e.preventDefault();

                 if ( this.currentIndex === 0 ) {
                    return this.setCurrent(this.lastIndex).show();
                }

                return this.setCurrent(this.currentIndex - 1).show();
            },

            show: function () {
                var $img = this.$('li[data-gallery-index="'+this.currentIndex+'"]').find('img');

                this.popup({
                    image: $img.attr('src'),
                    title: $img.attr('alt')
                });
            }
        };
    })();

var gallery1 = new Gallery({ el: '.gallery' });
var gallery2 = new Gallery({ el: '.photos' });

/*
|------------------------------------------------------------
| Google map
|------------------------------------------------------------
*/

    var myCenter=new google.maps.LatLng(45.0660729,20.58279,15);
    var marker;
      function initialize() {
        var mapProp = {
        center:myCenter,
        scrollwheel: false,
        zoom:14,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("map-canvas"),mapProp);
    var marker=new google.maps.Marker({
       position:myCenter,
      animation:google.maps.Animation.BOUNCE
  });

marker.setMap(map);
  }

  google.maps.event.addDomListener(window, 'load', initialize);



