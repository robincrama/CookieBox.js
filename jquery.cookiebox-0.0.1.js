/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function(a){a.cookie=function(g,f,k){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(f))||f===null||f===undefined)){k=a.extend({},k);if(f===null||f===undefined){k.expires=-1}if(typeof k.expires==="number"){var h=k.expires,j=k.expires=new Date();j.setDate(j.getDate()+h)}f=String(f);return(document.cookie=[encodeURIComponent(g),"=",k.raw?f:encodeURIComponent(f),k.expires?"; expires="+k.expires.toUTCString():"",k.path?"; path="+k.path:"",k.domain?"; domain="+k.domain:"",k.secure?"; secure":""].join(""))}k=f||{};var b=k.raw?function(i){return i}:decodeURIComponent;var c=document.cookie.split("; ");for(var e=0,d;d=c[e]&&c[e].split("=");e++){if(b(d[0])===g){return b(d[1]||"")}}return null}})(jQuery);

/*!
 * jQuery CookieBox Plugin
 * Includes: jQuery Cookie Plugin
 * https://github.com/***
 *
 * Copyright 2012, Robin Crama
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
 
(function($) {
	// These methods can be called by adding them as the first argument in the CookieBox plugin call
	
	var cookieTitles = {
		preference: 'PREF'	
	};
	
	var settings;
	
	var setCookie = function(){};
	var flushCookie = function(){};
	
	var methods = {
		init : function(options) {
			return this.each(function() {
				//Reference to jQuery DOM object;
				var $this = $(this);
				
				// Clone the original DOM object
				var $clone = $this.clone();	  
				
				// Setup default options
				settings = $.extend({
					cookieItems: [],
					title: 'This site uses cookies...',
					introText: 'Cookies are small text files that help us to make a better experience for you. More information about cookies on this site can be found on the <a href="#">The Cookie information page</a>.',
					cookieBoxYesText: 'Fine with me!',
					cookieBoxNoText: 'I don\'t like cookies!',
					cookieStoreText: 'To remember your answer, this box uses a cookie. (but no worries, we won\'t get personal)',
					cookiePrefix: 'CB'
				}, options);
				
				var handlers = {
					onSelectCookieBoxYES: function()
					{
						$('#CookieBox').slideUp(1000,function(){ reloadWindow(); });
						setCookie(true);
						
					},
					
					onSelectCookieBoxNO: function()
					{
						$('#CookieBox').slideUp(1000);
						setCookie(false);
						
					}
				}
				
				//Check if preference is already set
				var preferenceIsSet = $.cookie(settings.cookiePrefix+cookieTitles.preference) !== null ? true : false;
				
				if(!preferenceIsSet)
				{
					//append HTML in Body
					var html = getHTML();
					$('body').append(html);
					
					setEventListeners();
				}
				
				
				//Functions
				setCookie = function setCookie(granted)
				{
					var value = (granted) ? 'YES' : 'NO';
					$.cookie(settings.cookiePrefix+cookieTitles.preference, value, { expires: (365*3) });
				}
				
				flushCookie = function flushCookie()
				{
					$.cookie(settings.cookiePrefix+cookieTitles.preference, null);
				}
				
				reloadWindow = function reloadWindow()
				{
					location.reload();	
				}
				
				function setEventListeners()
				{
					$('.CookieBoxYES').on('click', handlers.onSelectCookieBoxYES);
					$('.CookieBoxNO').on('click', handlers.onSelectCookieBoxNO);
				}
				
				function getHTML()
				{
					var html = '<div id="CookieBox">';
					
					html += '<div class="CookieBoxTitle">'+settings.title+'</div>';
					html += '<div class="CookieBoxIntro">'+settings.introText+'</div>';
					
					
					if(settings.cookieItems.length > 0)
					{
						for(i in settings.cookieItems)
						{
							var item = settings.cookieItems[i];
							
							//Check for mandatory items
							if(item.text !== undefined && item.text !== '' && item.text != null)
							{
								html += '<div class="CookieBoxText">';
								if(item.icon !== undefined && item.icon !== '' && item.icon !== null)
								{
									html += '<img src="'+item.icon+'" alt="'+item.title+'" />';
								}
								html += '<span class="CookieBoxTextTitle">'+item.title+'</span>';
								html += '<span class="CookieBoxTextText">'+item.text+'</span>';
								html += '</div>';
							}
						}
					}
					
					html += '<button href="#" class="CookieBoxYES btn btn-success">'+settings.cookieBoxYesText+'</button>';
					html += '<button href="#" class="CookieBoxNO btn btn-danger">'+settings.cookieBoxNoText+'</button>';
					
					html += '<span class="CookieBoxStoreText">' + settings.cookieStoreText + '</span>';
					
					html += '</div>';
					
					return html;
				}
				
			});
		},
		
		setCookie: function(granted)
		{
			setCookie(granted);
		},
		
		flushCookie: function(granted)
		{
			flushCookie();
		},
		
		reloadWindow: function()
		{
			reloadWindow();
		},
		
		hasPermission: function()
		{
			var cookie = $.cookie(settings.cookiePrefix+cookieTitles.preference);
			
			var hasPermission = false;
			if($.cookie(settings.cookiePrefix+cookieTitles.preference) !== null)
			{
				if($.cookie(settings.cookiePrefix+cookieTitles.preference) === 'YES')
				{
					hasPermission = true;
				} else
				{
					hasPermission = false;
				}
			} else
			{
				hasPermission = false;
			}
			return hasPermission;
		}
	};
	
	$.fn.CookieBox = function(method) {

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('The method ' + method + ' does not exist in $.CookieBox');
		}
	}
	
})($);