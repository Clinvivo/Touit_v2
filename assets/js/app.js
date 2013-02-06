// ==========
// VARIABLES
// ==========

var canvas = document.getElementsByTagName('canvas')[0],
	ctx = canvas.getContext('2d');

	canvas.width = canvas.height = 16;
	document.head = document.head || document.getElementsByTagName('head')[0];

	var colors = {
	    "free": "#349534",
	    "busy": "#d12F19",
	    "away": "#656565"
	};


// ==========
// FUNCTIONS
// ==========

function drawFavicon(color, msg) {
	// Génération du canvas
	ctx.clearRect(0, 0, 16, 16);

	ctx.beginPath();
	ctx.arc(8,8,8,0,2*Math.PI, false); //ctx.arc(x,y,radius,startAngle,endAngle, anticlockwise);
	ctx.fillStyle = color;
	ctx.fill();

	ctx.fillStyle = "#fff";
    ctx.font = "6pt Arial";
    if (msg.length > 1){
    	ctx.fillText(msg, 4, 11);
    } else {
    	ctx.fillText(msg, 6, 11);
    }

    // Génération du lien
    if (browser.chrome){
    	$('link[rel="shortcut icon"]').prop('href', canvas.toDataURL());
    } else {
    	var link = document.createElement('link'),
		oldLink = document.getElementById('dynamic-favicon');
		link.type = "image/png";
		link.rel = 'shortcut icon';
		link.href = canvas.toDataURL();
		if (oldLink) {
			document.head.removeChild(oldLink);
		}
		document.head.appendChild(link);
	}
	
}

function changeStatus() {
    var status = $(this).data("status"),
        texte = $(this).data("texte");

    $("#status .dropdown_button").empty();
    $("#status .dropdown_close").append("<span class='" + status + "'>" + texte + "</span>  <span class='dot " + status + "'>●</span>  ");
    $("#status .dropdown_open").append("<span class='dot " + status + "'>●</span>  ");

    //drawFavicon(colors.status, "7");
}


// ==========
// HELPERS
// ==========

Array.prototype.has = function(v) {
	for (var i = 0, length = this.length; i < length; i++) {
		if (this[i] == v) return true;
	}
	return false;
};

Array.prototype.max = function() {
	var max = this[0];
	for (var i = 1, length = this.length; i < length; i++) {
		if (this[i] > max) {
			max = this[i];
		}
	} 
	return max;
}

var entityMap = {
    "é": "e",
    " ": "_",
    ".": "",
    "è": "e",
    "ï": "i"
};

function escapeChar(string) {
    return String(string).replace(/[é .èï]/g, function(s) {
        return entityMap[s];
    });
}

// Browser sniffing
var ua = (function () {
	var agent = navigator.userAgent.toLowerCase();
	return function (browser) {
		return agent.indexOf(browser) !== -1;
	};
}());

var browser = {
	ie: ua('msie'),
	chrome: ua('chrome'),
	webkit: ua('chrome') || ua('safari'),
	safari: ua('safari') && !ua('chrome'),
	mozilla: ua('mozilla') && !ua('chrome') && !ua('safari')
};

// ==========
// ONLOAD
// ==========

(function() {

	window.onload = function() {

		window.displayedMenu = false;

		$(".dropdown_button").click(function(e) {
			e.preventDefault();

			//$(".dropdown_close, .dropdown_content").css("display","none");
			//$(".dropdown_open").css("display","block");

			var parent = $(this).parent().prop("id");

			if(!window.displayedMenu || window.displayedMenu === false) {
				$("#" + parent).children(".dropdown_close, .dropdown_content").css("display","block");
				$("#" + parent).children(".dropdown_open").css("display","none");
				window.displayedMenu = true;
			} else {
				$(".dropdown_close, .dropdown_content").css("display","none");
				$(".dropdown_open").css("display","block");

				$("#" + parent).children(".dropdown_close, .dropdown_content").css("display","none");
				$("#" + parent).children(".dropdown_open").css("display","block");
				window.displayedMenu = false;
			}
		});

		$(".status_button").click(function(e) {
            e.preventDefault();

            var status = $(this).data("status"),
                texte = $(this).data("texte");

            $("#status .dropdown_button").empty();
            $("#status .dropdown_close").append("<span class='" + status + "'>" + texte + "</span>  <span class='dot " + status + "'>●</span>  ").css("display", "none");
            $("#status .dropdown_open").append("<span class='dot " + status + "'>●</span>  ").css("display", "block");
            $("#status .dropdown_content").css("display", "none");

            window.displayedMenu = false;

            drawFavicon(colors[status], "7");
        });

		drawFavicon(colors.free, "10");

	}
})();