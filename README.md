# SnowjQueryPlugin
Demo http://promo.hmjim.ru/snow/index.html
init: 

      $(document).snow({
			 SnowImage: [ //images
				'img/50.png',
				'img/100.png',
				'img/150.png'
			 ],
			 Delay: [10, 20], // delay
			 Quantity: 10, // count
			 Ignore: $('.jumbotron, .list-group, .btn-default') // ignore blocks
			});
