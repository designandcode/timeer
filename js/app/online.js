Online = function(){
	this.set_ONLINE_global_var = function(){
		if(!navigator.onLine) {
			ONLINE = false;	
		}
		else {
			ONLINE = true;	
		}
	};	
}