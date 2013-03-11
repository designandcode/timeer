Timeer = function(){

	this.init = function(){
		
		_checkpoint = $('#checkpoint');
		_start = $('#start');
		_finish = $('#finish');
		_marker = 1;
		_started = false;
		_timedisplay = "00:00.00";
		
		_checkpoint.attr('disabled', true);
		_finish.attr('disabled', true);
		$('#milestones').html('Click the start button to start your program.');

		
		if (!localStorage['model']) {
			localStorage['model'] = JSON.stringify({});
		}
		_model = JSON.parse(localStorage['model']);


		/*if(online){	// Save result to persistent store if connection is available
			$.post('php/db.php', function(data){
				//	How to do this without going into
				//	full fledged user management mode
				console.log(data);
			});
		}*/

		this.startimer = function(){
			var hours = 0;
			var minutes = 0;
			var seconds = 0;


			// start the timer
			this.start = function(){
				_start.attr('disabled', true);
				_checkpoint.attr('disabled', false);
				_finish.attr('disabled', false);
				var d = new Date();
				var time = d.getTime();
				//	var table = set[0];

				if (_.isEmpty(_model)) {
					current = 0;
					_model[current] = {};
					//	_model[current][table] = set[1];
					//	_model[current]['start'] = time;
					_model[current][0] = time;
					$("#milestones").html('<div>Started!</div>');
				}
				else {
					current = 1*_.last(_.keys(_model));
					_model[current+1] = {};
					//	_model[current+1]['start'] = time; 
					_model[current+1][0] = time; 
					$("#milestones").html('<div>Started!</div>');
				}
				localStorage['model'] = JSON.stringify(_model);

				_started = true;

				setuptick = setInterval(uptick, 1000);
				function uptick(){
					seconds++;
					if(seconds == 60) {
						seconds = 0;
						minutes++;
					}
					if(minutes == 60) {
						minutes = 0;
						hours++;
					}
					hours = ""+hours;
					minutes = ""+minutes;
					seconds = ""+seconds;
					if (hours.length == 1) {
						hours = "0" + hours;
					}
					if (minutes.length == 1) {
						minutes = "0" + minutes;
					}
					if (seconds.length == 1) {
						seconds = "0" + seconds;
					}
					_timedisplay = hours+":"+minutes+"."+seconds;
					$('#timer').html(_timedisplay);
				}
			};


			this.start();
			updateChart();
		};

		this.stop = function(){
			if(_started){
				_start.attr('disabled', true);
				_checkpoint.attr('disabled', true);
				_finish.attr('disabled', true);
				clearInterval(setuptick);

				//	_model[current]['stop'] = {};

				var d = new Date();
				var time = d.getTime();

				var name = prompt("Session note:");

				if(name != null){
					_model[current][name] = time;
					var message = 'You ran for ';
					message += name;
					message += ' miles in ';
					message += _timedisplay + '.';
					$("#milestones").append('<div>'+message+'</div>');
				}

				//	_model[current]['stop'] = time;
				else{
					_model[current][_marker] = time;
				}
				$("#milestones").append('<div>Stopped!</div>');
				localStorage['model'] = JSON.stringify(_model);
			}
			else{
				return false;
			}
			location.reload();
			//	updateChart();
		};

		//	milestone marker
		this.milestone = function(){
			if(_started){
				var d = new Date();
				var time = d.getTime();
				current = 1*_.last(_.keys(_model));
				_model[current][_marker] = time;

				var message = 'You ran for ';
				message += _marker;
				message += ' miles in ';
				message += _timedisplay + '.';

				//	$("#milestones").append('<div>'+message+'</div>');
				localStorage['model'] = JSON.stringify(_model);
				_marker++;
			}
			else{
				return false;
			}

			updateChart();
		};

		function updateChart(){
			APP.call("Chart", function(){
				this.render();
			});
		};

		//	Events
		_finish.click(this.stop);
		_checkpoint.click(this.milestone);
		_start.click(this.startimer);
		$(window).unload(function(){
			this.stop();
		});
	};
};