function __ShowSnow(settings)
{

	var snowsrc = settings.SnowImage;
    var no = settings.Quantity;
    var dx, xp, yp;    // coordinate and position variables
    var am, stx, sty;  // amplitude and step variables
    var i; 
	var delay = Math.floor(Math.random() * (settings.delay[0] - settings.delay[1] + 1)) + settings.delay[1];
	settings.ignore.css({
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
        dx[i] = 0;                        // set coordinate variables
        xp[i] = Math.random()*(doc_width-50);  // set position variables
        yp[i] = Math.random()*doc_height;
        am[i] = Math.random()*20;         // set amplitude variables
        stx[i] = 0.02 + Math.random()/10; // set step variables
        sty[i] = 0.7 + Math.random();     // set step variables

        var flake = $("<div />");

        var id = ("dot" + i);
        flake.attr("id", id);
        flake.css({
                    position: "absolute",
                    zIndex: settings.ZIndexStart + i,
                    top: "15px",
                    left: "15px"
                });
		var randomNum = Math.round((Math.random() * (snowsrc.length - 1) + 0));
        flake.append("<img src='" + snowsrc[randomNum] + "'>");
        flake.appendTo("body");

        flakes[i] = $("#" + id);

    }


    var animateSnow;
    animateSnow = function() 
    {  
        for (i = 0; i < no; ++ i) 
        {
            // iterate for every dot
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

        snowtimer = setTimeout(animateSnow, delay);
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

    	setTimeout(hidesnow, getRandomInt(opt) * 1000)
		}
		//console.log(settings.HideSnowTime[0]);
(function($) { 
    $.fn.snow = function(options) {
	
    var settings = $.extend({
	        SnowImage: undefined,
            Quantity:  1,
			delay: [10, 20],
            HideSnowTime: [10, 20],
            ZIndexStart:    0,
			ignore: $('body') 
        }, options);

    __ShowSnow(settings);

    return this;
  }

})(jQuery);

