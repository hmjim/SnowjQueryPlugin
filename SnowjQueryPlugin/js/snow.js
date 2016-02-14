function __ShowSnow(settings)
{

	var snowsrc = settings.SnowImage; // изображения
    var no = settings.Quantity; // кол-во
    var dx, xp, yp;    // Координаты и позиция
    var am, stx, sty;  // аплитуда и шаг
    var i; 
	var Delay = Math.floor(Math.random() * (settings.Delay[0] - settings.Delay[1] + 1)) + settings.Delay[1];
	settings.Ignore.css({ // блоки за которыми должны быть снежинки
		zIndex:"5000",
		position:"relative"
	});
    var doc_width = $(window).width();
    var doc_height = $(window).height();

    dx = [];
    xp = [];
    yp = [];
    am = [];
    stx = [];
    sty = [];
    flakes = [];
    for (i = 0; i < no; ++i) 
    {
        dx[i] = 0;                        // координаты
        xp[i] = Math.random()*(doc_width-50);  // позиция
        yp[i] = Math.random()*doc_height;
        am[i] = Math.random()*20;         // амплитуда
        stx[i] = 0.02 + Math.random()/10; // шаг
        sty[i] = 0.7 + Math.random();     // шаг

        var flake = $("<div />");

        var id = ("dot" + i);
        flake.attr("id", id);
        flake.css({
                    position: "absolute",
                    zIndex: settings.ZIndexStart + i,
                    top: "15px",
                    left: "15px"
                });
		var randomNum = Math.round((Math.random() * (snowsrc.length - 1) + 0));  // рандом из выбранных картинок
        flake.append("<img src='" + snowsrc[randomNum] + "'>");
        flake.appendTo("body");

        flakes[i] = $("#" + id);

    }


    var animateSnow;
    animateSnow = function() 
    {  
        for (i = 0; i < no; ++ i) 
        {
            // цикл для каждой снежинки
            yp[i] += sty[i];
            if (yp[i] > doc_height - 50) 
            {
                xp[i] = Math.random() * (doc_width - am[i] - 150);
                yp[i] = 0;
                stx[i] = 0.02 + Math.random() / 10;
                sty[i] = 0.7 + Math.random();
            }
      
            dx[i] += stx[i];
            flakes[i].css("top", yp[i] + "px");
            flakes[i].css("left", (xp[i] + am[i] * Math.sin(dx[i])) + "px");
        }

        snowtimer = setTimeout(animateSnow, Delay);
    };


	function hidesnow()
    {
		if(window.snowtimer)
            clearTimeout(snowtimer)

        for (i = 0; i < no; i++)
            flakes[i].hide();
	}
		
    animateSnow();
	if (settings.HideSnowTime > 0)
		function getRandomInt(opt){
			return Math.floor(Math.random() * (settings.HideSnowTime[0] - settings.HideSnowTime[1] + 1)) + settings.HideSnowTime[1];
		};
    	setTimeout(hidesnow, getRandomInt() * 1000);
}

(function($) {
    $.fn.snow = function(options) {
	
    var settings = $.extend({
	        SnowImage: undefined,
            Quantity:  1,
			Delay: [10, 20],
            HideSnowTime: [3000, 5000],
            ZIndexStart:    0,
			Ignore: $('body') 
        }, options);

    __ShowSnow(settings);

    return this;
  }

})(jQuery);

