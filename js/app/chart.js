Chart = function(){
	this.render = function(){

		//	get the data
		if (!localStorage['model']) {
			localStorage['model'] = JSON.stringify({});
		}
		_model = JSON.parse(localStorage['model']);



		var milestones = [];
		var milestones1 = [];
		_milestones = [];
		var data = [];
		var data1 = [];
		
		var last = _.size(_model) - 1;
		parseData(_model[last], data, milestones);
		parseData(_model[last - 1], data1, milestones1);

		var timestamp = [];
		timestamp[0] = new Date(_model[last][0]);
		timestamp[1] = new Date(_model[last - 1][0]);

		var current = timestamp[0].toLocaleDateString() + " " + timestamp[0].toLocaleTimeString();
		var last = timestamp[1].toLocaleDateString() + " " + timestamp[1].toLocaleTimeString();




		function parseData(model, data, milestones){
			for(i in model){
				var temp = (function(){
					var milliseconds = model[i] - model[0];
					var seconds = milliseconds / 1000;
					var minutes = milliseconds / 60000;
					var hours = milliseconds / 3600000;


					if(seconds > 0){
						seconds = Math.floor(seconds);
					}
					if(minutes > 0){
						minutes = Math.floor(minutes);
					}
					if(hours > 0){
						hours = Math.floor(hours);
					}

					return seconds;
				})();
				data[i] = temp;
				milestones = _.keys(model);
				if(milestones.length > _milestones.length){
					milestones = _milestones;
				}
				
			}
		}


		data[0] = 0;

		var chart1 = new Highcharts.Chart({
		chart: {
			renderTo: 'container',
			//	bar, line, column, area, areaspline
			type: 'column'
		},
		title: {
			text: 'Milestones'
		},
		xAxis: {
			title: {
				text: 'Milestone'
			},
			milestones: _milestones
		},
		yAxis: {
			title: {
				text: 'Time'
			}
		},
		/*plotOptions: {	
			series: {
				stacking: 'normal'
			}
		},	*/	
		series: [{
			name: 'Time Elapsed - ' + current,
			data: data
		},
		{
			name: 'Time Elapsed - ' + last,
			data: data1
		}]
	});
	}
}