
'use strict';

var lib = ('undefined'!==typeof global && 'undefined'!==typeof global.require && 'undefined'!==typeof global.require.main && 'undefined'!==typeof global.require.main.frdl)
  ? global.require.main.frdl 
  : require('@frdl/functions');

var is = require('@betafcc/is');

if('undefined'===typeof is){
	is = global.require.main.frdl.is;
}

is.scalar = (v) => {
	return is.oneOf(is.string, is.boolean, is.number, is.integer, is.float)(v);
};

is.scalarOrNull = (v) => {
	return is.oneOf(is.scalar, is.null)(v);
};

is.data = (v) => {
	return is.oneOf(is.scalarOrNull, is.dict)(v);
};

is.sortable = (v) => {
	return is.oneOf(is.iterable, is.string, is.dict)(v);
};



lib.overload.add(lib, 'sort',[
	   
	[ [Array.isArray], function(a) { return a.sort();}],
	
	 
	[ [is.string], (s) => {
		 if(false === /[\s\t\n]/.test(s) ){
		   return s.split('').sort().join('');			
		 }else{
			return s.split(/[\s\t\n]/).sort().join(' ').trim();
		 }
	 }],
	
	
     [ [is.dict], (d) => {
		 var ordered = {};
		 Object.keys(d).sort().forEach(function(key) { 
			 ordered[key] = d[key];
		 });
		 return ordered;
	 }],	
	
 	
     [ [is.arrayOf(is.data), is.oneOf(is.equal('-r'), is.equal('recursive'))], (a) => {
		 var arr = [];
		 a.forEach(function(d, i, payload) { 
			  var val = true === is.sortable(d) ? lib.sort(d) : payload[i];
			  arr.push(val);
		 });
		 
		 return arr;
	 }],
	
	
	
  [ [is.dict, is.boolean], (d, asArray) => {
	if(!!asArray){
	  	return so(d);
	}
	 
	var o = {};
	so(d).forEach(function(v,i){
		o[v[0]] = v[1];
	});
   return o;
 }],	
	
	

     [ [is.dict, is.string], (d, field) => {
		 var ordered = {};
		 Object.keys(d).sort(sortByFieldValue(field)).forEach(function(key) { 
			 ordered[key] = d[key];
		 });
		 return ordered;
	 }],
	
     [ [is.dict, is.arrayOf(is.scalarOrNull)], (input, preferedOrder) => {
		var o = [], r = {}, keyValuesArray = so(input);//lib .sort(d,true);

		 keyValuesArray.forEach(function(d, i){   
			 o[i] = {key : d[0], value : d[1]};
		 });

		 o = lib .sort(o, 'key', preferedOrder);
		 
		 o.forEach(function(d, i){  
			 r[d.key] = d.value;
		 });		 
		 
		 return r;
	 }],	
     [ [is.dict, is.arrayOf(is.scalarOrNull), is.truthy], (input, preferedOrder, byKey) => {
		var o = [], r = {}, keyValuesArray = so(input);//lib .sort(d,true);

		 keyValuesArray.forEach(function(d, i){   
			 o[i] = {key : d[0], value : d[1]};
		 });

		 o = lib .sort(o, 'key', preferedOrder);
		 
		 o.forEach(function(d, i){  
			 r[d.key] = d.value;
		 });		 
		 
		 return r;
	 }],		
     [ [is.dict, is.arrayOf(is.scalarOrNull), is.falsy], (input, preferedOrder, byKey) => {
 
		var o = [], r = {}, keyValuesArray = so(input);//lib .sort(d,true);

		 keyValuesArray.forEach(function(d, i){   
			 o[i] = {key : d[0], value : d[1]};
		 });

		 o = lib .sort(o, 'value', preferedOrder);
		 
		 o.forEach(function(d, i){  
			 r[d.key] = d.value;
		 });		 
		 
		 return r;
	 }],
	
	
	
  [ [is.arrayOf(is.dict), is.string], (a, field) => {
	return a.sort(sortByFieldValue(field));
 }],	
	
	
  [ [
	 is.arrayOf(is.dict), 
	 is.string, 
	 is.arrayOf(is.scalarOrNull)
	],   
   /* oa = preferedOrder */
   (a, field, oa) => {
	a.sort(sortByFieldValue(field));  
	return a.sort(sortByArrayValues(field, oa));
 }],	
	
	
  [ [
	 is.arrayOf(is.dict), 
	 is.string, 
	 is.arrayOf(is.scalarOrNull),
	 is.truthy
	],
    /* oa = preferedOrder */
   (a, field, oa, alphasort) => {
	a.sort(sortByFieldValue(field));  
	return a.sort(sortByArrayValues(field, oa));
 }],	
	
  [ [is.arrayOf(is.dict),
	 is.string,
	 is.arrayOf(is.scalarOrNull),
	 is.falsy
	], 
    /* oa = preferedOrder */
   (a, field, oa, alphasort) => {
	return a.sort(sortByArrayValues(field, oa));
 }],		

	
	
	
	
]);


function sortByArrayValues(field, preferedOrder) {
  var o = preferedOrder.reverse();
  return function(a, b) {
     return ( o.indexOf(a[field])<o.indexOf(b[field]))
		- (o.indexOf(a[field])>o.indexOf(b[field]));
  };
}


function sortByFieldValue(field) {
  return function(a, b) {
     return (a[field] > b[field]) - (a[field] < b[field]);
  };
}




function so(o){
    var i;
    var sortable = [];
    for (i in o) {
      sortable.push([i, o[i]]);
    }
	
   sortable.sort(function(a, b) {
    return a[1] - b[1];
  });
	
//sortable =[["key1", "value1"], ["key9999", "value2"], ["key2", "value3"],	
  return sortable;	
}

exports = module.exports = function(){
	return lib.sort.apply(null, Array.prototype.slice.call(arguments));
};
