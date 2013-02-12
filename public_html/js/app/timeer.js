Timeer = function(){

	this.init = function(){

		//	var _class = {};
		_checkpoint = $('#checkpoint');
		_timer = location.search;
		//	_pauseoff = $('#pause.off');
		//	_pauseon = $('#pause.on');
		//	this.checkpoint = $('#checkpoint');

		this.startimer = function(){
			this.hours = 0;
			this.minutes = 0;
			this.seconds = 0;


			// start the timer
			this.start = function(){
				this.milestone();
				this.tick++;
				setuptick = setInterval(uptick, 1000);
				function uptick(){
					this.seconds++;
					if(this.seconds == 60) {
						this.seconds = 0;
						this.minutes++;
					}
					if(this.minutes == 60) {
						this.minutes = 0;
						this.hours++;
					}
					var hours = ""+this.hours;
					var minutes = ""+this.minutes;
					var seconds = ""+this.seconds;
					if (hours.length == 1) {
						hours = "0" + hours;
					}
					if (minutes.length == 1) {
						minutes = "0" + minutes;
					}
					if (seconds.length == 1) {
						seconds = "0" + seconds;
					}
					this.updatedisplay(hours, minutes, seconds);
				}
			};

			// pause the timer
			/*this.pause = function(){				
				var d = new Date();
				var time = d.getTime();
				console.log(time);
				clearInterval(setuptick);
				return false;
			};*/

			// update display
			this.updatedisplay = function(h,m,s){
				time = h+":"+m+"."+s;
				$('#timer').html(time);
			};

			this.start();
		};


		//	milestone marker
		this.milestone = function(){
			var d = new Date();
			var time = d.getTime();
			var label = $(".checkpoint").val();
			var label = (label) ? label : 'label';
			console.log(label + "_" + time);
			return false;
		};


		//	Events
		this.startimer();
		_checkpoint.on("click", this.milestone);
		//	_pauseoff.on("click", this.pause);
		//	_pauseon.on("click", this.start);
	};
};