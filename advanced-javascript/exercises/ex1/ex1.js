A();

function A() {
	console.log("A");
	B();

	function B() {
		console.log("B");
		C();
	};

	function C() {
		console.log("C");
		D();
	}

	function D() {
		console.log("D");
		E();
	}

	function E() {
		console.log("E");
		F();
	}

	function F() {
		console.log("F");
		G();
	}
};

function G() {
	console.log("G");

	let H = function() {
		console.log("H");
		I();
	};

	H();
}

function I() {
	console.log("I");
	J();
}

var rest = "KLMNOPQRSTUVWXYZ".split("");
for (var i = 0; i < rest.length; i++) {
	(function(i){
		window[rest[i]] = function() {
			console.log(rest[i]);
			if (i < (rest.length-1)) {
				return i
			}
		};
	})(i);
}

var J = function() {
	J = function() {
		console.log("J");
		K();
	};
};

