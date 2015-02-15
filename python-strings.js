(function(){
"use strict";

	var regDigit = /^\d+$/;
	var regSpace = /^\s+$/;
	var regTrim = /^\s+|\s+$/g;
	var regLTrim = /^\s+/;
	var regRTrim = /\s+$/;
	var regTap = /\t/g;

	var fn = {
		find : function(str, start, end){
			return (typeof(end) === "number" ? this.slice(0, end) : this).indexOf(str, start);
		},

		rfind : function(str, start, end){
			return (typeof(end) === "number" ? this.slice(0, end) : this).lastIndexOf(str, start);
		},

		isdigit : function(){
			return regDigit.test(this);
		},

		isspace : function(){
			return regSpace.test(this);
		},

		upper : function(){
			return this.toUpperCase();
		},

		lower : function(){
			return this.toLowerCase();
		},

		startswith : function(str){
			return this.indexOf(str) === 0;
		},

		endswith : function(str){
			return this.lastIndexOf(str) === this.length - str.length && this.length >= str.length;
		},

		capitalize : function(){
			return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
		},

		strip : function(){
			return this.trim ? this.trim() : this.replace(regTrim,"");
		},

		ltrip : function(){
			return this.replace(regLTrim, "");
		},

		rtrip : function(){
			return this.replace(regRTrim, "");
		},

		count : function(str, start, end){
			if(typeof(start) !== "number")start=0;
			if(typeof(end) !== "number")end=this.length;
			
			var count = 0;
			
			while(true){
				start = this.indexOf(str, start);
				if(start !== -1 && start < end){
					start++;
					count++;
					continue;
				}
				return count;
			}
		},

		swapcase : function(){
			var str = "";
			var char;
			for(var i=0,j=this.length;i<j;i++){
				char = this.charAt(i);
				if(char === char.toUpperCase()){
					str+= char.toLowerCase();
				} else {
					str+= char.toUpperCase();
				}
			}
			return str;
		},

		zfill : function(width){
			if(this.length < width){
				return new Array(width - this.length + 1).join("0")+this;
			}
			return this;
		},

		rjust : function(width, fillchar){
			if(this.length < width){
				if(typeof(fillchar) !== "string" || fillchar.length !== 1)fillchar=" ";
				return new Array(width - this.length + 1).join(fillchar)+this;
			}
			return this;
		},

		ljust : function(width, fillchar){
			if(this.length < width){
				if(typeof(fillchar) !== "string" || fillchar.length !== 1)fillchar=" ";
				return this+new Array(width - this.length + 1).join(fillchar);
			}
			return this;
		},

		format : function(first){
			var str = this;
			if(({}).toString.call(first) === "[object Array]"){
				for(var i=0;i<first.length;i++){
					str = str.replace("{"+i+"}", first[i]);
				}
			} else if(typeof(first) === "object"){
				for(var key in first){
					str = str.replace("{"+key+"}", first[key]);
				}
			} else {
				for(var i=0;i<arguments.length;i++){
					str = str.replace("{"+i+"}", arguments[i]);
				}
			}
			return str;
		},

		expandtabs : function(tabsize){
			if(typeof(tabsize) !== "number")tabsize=8;
			var space = new Array(tabsize+1).join(" ");
			return this.replace(regTap, space);
		},

		partition : function(template){
			var arr = this.split(template);
			if(arr.length === 1){
				return [this,"",""]
			}
			return [arr[0], template, arr[1]];
		}
	}
										
	for(var key in fn){
		String.prototype[key] = fn[key];
	}

})();