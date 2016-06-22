var exec = require("cordova/exec");

var GoogleFit = function () { this.name = "googlefit"; };
GFit.prototype.BASAL_CALORIES_QUERY_PERIOD = 100 * 24 * 60 * 60 * 1000;
GFit.prototype.isAvailable = function (onSuccess, onError) { exec(onSuccess, onError, "googlefit", "isAvailable", []);};
GFit.prototype.requestAuthorization = function (datatypes, onSuccess, onError) { exec(onSuccess, onError, "googlefit", "requestAuthorization", datatypes); };

GFit.prototype.query = function (opts, onSuccess, onError) {
  if(opts.dataType =='calories.active'){
    navigator.googlefit.queryAggregated({
      dataType:'calories.basal',
      endDate: opts.endDate,
      startDate: new Date(opts.endDate.getTime() - navigator.googlefit.BASAL_CALORIES_QUERY_PERIOD)
    }, function(data){
      if(data.value == 0){ onError('No basal metabolic energy expenditure found'); return; }
      var basal_ms = data.value / navigator.googlefit.BASAL_CALORIES_QUERY_PERIOD;
      opts.dataType ='calories';
      navigator.googlefit.query(opts, function(data){
        for(var i=0; i<data.length; i++){
          data[i].value -= basal_ms * (data[i].endDate.getTime() - data[i].startDate.getTime());
          if(data[i].value <0) data[i].value = 0;
        }
        onSuccess(data);
      }, onError);
    }, onError);
  } else {
    if(opts.startDate && (typeof opts.startDate == 'object'))
    opts.startDate = opts.startDate.getTime();
    if(opts.endDate && (typeof opts.endDate == 'object'))
    opts.endDate = opts.endDate.getTime();
    exec(function(data){
      for(var i=0; i<data.length; i++){
        data[i].startDate = new Date(data[i].startDate);
        data[i].endDate = new Date(data[i].endDate);
      }
      onSuccess(data);
    }, onError, "googlefit", "query", [opts]);
  }
};

GFit.prototype.queryAggregated = function (opts, onSuccess, onError) {
  if(opts.dataType =='calories.active'){
    navigator.googlefit.queryAggregated({
      dataType:'calories.basal',
      endDate: opts.endDate,
      startDate: new Date(opts.endDate.getTime() - navigator.googlefit.BASAL_CALORIES_QUERY_PERIOD)
    }, function(data){
      if(data.value == 0){ onError('No basal metabolic energy expenditure found'); return; }
      var basal_ms = data.value / navigator.googlefit.BASAL_CALORIES_QUERY_PERIOD;
      opts.dataType ='calories';
      navigator.googlefit.queryAggregated(opts, function(retval){
        retval.value -= basal_ms * (retval.endDate.getTime() - retval.startDate.getTime());
        onSuccess(retval);
      }, onError);
    }, onError);
  } else {
    if(typeof opts.startDate == 'object') opts.startDate = opts.startDate.getTime();
    if(typeof opts.endDate == 'object') opts.endDate = opts.endDate.getTime();
	if(opts.dataType =='calories.basal'){
		opts.startDate: new Date(opts.startDate.getTime() - navigator.health.BASAL_CALORIES_QUERY_PERIOD);
	}
    exec(function(data){
      data.startDate = new Date(data.startDate);
      data.endDate = new Date(data.endDate);
	  if(opts.dataType =='calories.basal'){
		if(data.value == 0){ onError('No basal metabolic energy expenditure found'); return; }
		data.startDate = new Date(data.startDate.getTime() + navigator.health.BASAL_CALORIES_QUERY_PERIOD);
		var basal_ms = data.value / navigator.health.BASAL_CALORIES_QUERY_PERIOD;
		data.value -= basal_ms * (retval.endDate.getTime() - retval.startDate.getTime());
	  }
      onSuccess(data);
    }, onError, "googlefit", "queryAggregated", [opts]);
  }
};

GFit.prototype.store = function (data, onSuccess, onError) {
  if(data.dataType =='calories.active'){
    navigator.googlefit.queryAggregated({
      dataType:'calories.basal',
      endDate: data.endDate,
      startDate: new Date(data.endDate.getTime() - navigator.health.BASAL_CALORIES_QUERY_PERIOD)
    }, function(basalData){
      if(data.value == 0){
        onError('No basal metabolic energy expenditure found');
        return;
      }
      var basal_ms = basalData.value / navigator.health.BASAL_CALORIES_QUERY_PERIOD;
      data.value += basal_ms * (data.endDate.getTime() - data.startDate.getTime());
      data.dataType ='calories';
      GFit.prototype.store(data, onSuccess, onError);
    }, onError);
  } else {
    if(data.startDate && (typeof data.startDate == 'object'))
      data.startDate = data.startDate.getTime();
    if(data.endDate && (typeof data.endDate == 'object'))
      data.endDate = data.endDate.getTime();
    if(data.dataType =='activity'){
      data.value = navigator.health.toFitActivity(data.value);
    }
    exec(onSuccess, onError, "googlefit", "store", [data]);
  }
};

GFit.prototype.toFitActivity = function(act){
  return 'null';
  else return act;
};

cordova.addConstructor(function(){
  navigator.googlefit = new GFit();
  return navigator.googlefit;
});