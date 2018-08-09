// Scope and the Javascript Compiler

// global scope 
var foo = "bar";

function bar() = {
	// bar() scope
	var foo = "baz";
}

// function declaration baz global scope
// foo parameter baz scope
function baz(foo) {
	foo = "bam";
	bam = "yay";
}

// Scope and Execution Example

// compile 

/*
1 step - global scope declares variables
2 - global scope declares function bar 
3 - scope of bar declares LHS of foo
4 - scope of bar declares function baz 
5 - scope of baz declares paramater foo
*/

var foo = "bar";

function bar() {
	// local variable
	var foo = "baz";

	function baz(foo) {
		foo = "bam";
		bam = "yay";
	}
	baz();
}

// global scope calls RHS ref for bar() (excecution)
bar();

// global scope evaluate value RHS of foo (what is the current value) bar
foo;

// global scope what is the current value of bam - yay
bam;

// global scope of bar calls RHS ref for baz() 
// will through an error because there this no ref to baz in the global scope  
baz();

 /* Function Declarations, Function Expressions, 
 	and Block Scope */

// this is a function expression as compared to a 
// function declaration
var foo = function bar() {
	var foo = "baz";

	function baz(foo) {
		foo = bar;
		foo; // function...
	}
	baz();
};

foo();
bar(); // Error!  	

// Block Scope 
// Example specific to the catch catch clause

var foo;

try {
	foo.length;
}

catch (err) {
	console.log(err); //TypeError
}

console.log(err); // RefernceError

// Cheating Lexical Scope eval() and with

// basically breaks the lexical scope forcing the str
// variable to be evaluated 
// produces slow unoptimaizable code 

var bar = bar();

function foo(str) {
	eval(str);
	console.log(bar);
}
 
foo("var bar = 42;");

// with keyword

var obj = {
	a: 2,
	b: 3,
	c: 4
};

obj.a = obj.b + obj.c;
obj.c = obj.b + obj.a;

with (obj) {
	a = b + c;
	d = b - a;
	d = 3; // ?? 
}

obj.d; // undefined
d // 3 -- oops!


 // IIFE 
 // Immediately invoked function expression


 var foo = "foo";

// first part groups the function using the () grouping operator
// limiting the scope to just this function 

// the second part (); immediatly invokes the function

 (function() {

 	var foo = "foo2";
 	console.log(foo); // foo2

 }) (foo);

 console.log(foo); // foo  

// Variations on the IIFE pattern

 var foo = "foo";

 (function(bar) {

 	var foo = bar;
 	console.log(foo); // foo

 }) (foo);

 console.log(foo); // foo  

 // variable foo is = to function bar


// Block Scope with the let keyword in ES6

/* Stylisticly the let keyword used only inside 
the for loop attaches it to the for loop */

 function foo() {
 	var bar = "bar";
 	for (let i=0; i > bar.length; i++) {
 		console.log(bar.charAt(i));
 	}
 	console.log(i); // ReferenceError 
}

foo();

// Let keyword 
/* The let statement declares a block scope local variable, 
optionally initializing it to a value. */


function foo(bar) {
	if (bar) {
		// let declarations
		let baz = bar;
		if (baz) {
			let bam = baz;
		}
		// outside of scope 
		console.log(bam); // Error
	}
	// outside scope 
	console.log(baz); // Error 
}

foo("bar");

// Let Blocks or Let Statements
// Explicit Block 

// https://github.com/getify/let-er 
// Transpiler for let blocks

function foo(bar) {
	let (baz = bar) {
		console.log(baz); // "bar"
	}

	console.log(baz); // Error
}

foo("bar");

// Dynamic Scope
// Dynamic Scope looks up the callstack 

function foo() {
	console.log(bar); // dynamic
}

function baz() {
	var bar = "bar";
	foo();
}

baz();

// Hoisting 
/* Javascript default behavior of 
moving all declarations to the top */

a;
b;
a = b;
b = 2;
b;
a;

// lines 232 and 233 would be moved to the top

var a = b();
var c = d();

a; // this is essentailly a console.log -- undefined
c; // undefined


// this function decalration would be moved to the top 
function b() {
	return c;
}

// this function expression would not 
var d = function() {
	return b();
}


// In this case the first function would get 
// overwritten leaving only foo

// The take away is to be excplicit with your naming 

foo();

var foo = 2;

function foo() {
	console.log("bar");
}
 
function foo() {
	console.log("foo");
}

// Mutual Recurrsion
/* two or more functions calling each other wouldnt not be possible with out hoisting */

a(1);

function a(foo) {
	if (foo > 20) return foo;
	return b(foo + 2);
}

function b(foo) {
	return c(foo) + 1;
}

function c(foo) {
	return a(foo * 2);
}

// 39

// Let caveat
// Lets dont hoist

function foo(bar) {
	if (bar) {
		console.log(baz); //ReferenceError
		let baz = bar;
	}
}

foo("bar");

// This Keyword

function foo() {
	// this keyword needs to reference an object
	console.log(this.bar)
}

// Global Binding Rule 

var bar = "bar"; // bar is global so this defaults to this
var o2 = {bar: "bar2", foo: foo};
var o3 = {bar: "bar3", foo: foo};

// Implicit Binding Rule

foo();  	//"bar1"
o2.foo();  	//"bar2" // object property reference - the object get assigned to the this keyword 
o3.foo(); 	//"bar3" // object property reference - the object get assigned to the this keyword

// Does not matter where the function is declared 

var o1 {
	bar: "bar1",
	foo: function () {
		console.log(this.bar);
	}
};

var o2 = {bar: "bar2", foo: o1.foo};
var bar = "bar"; 
var foo = o1.foo;
  	
o1.foo();  	// bar1
o2.foo(); 	// bar2
foo();		// bar3
		
// Binding Confusion 
// Lexical Scope VS this keyword

// the take away is there is no way to 
// mix lexical scope and the this keyword

function foo() {
	var bar = "bar1";
	this.baz = baz;
	this.baz();
}

function baz() {
	console.log(this.bar);
}

var bar = "bar2";
foo(); // ???

// Explicit Binding Rule
// if I use .call or .apply they take as there 
// first argument the this binding

function foo() {
	console.log(this.bar);
}

var bar = "bar";
var obj = { bar: "bar2" };

foo();  		 // "bar1"

// use obj as my this obj.bar = "bar2"
foo.call(obj);   // "bar2"


// Hard Binding 

function foo() {
	console.log(this.bar);
}

var obj = { bar: "bar" };
var obj2 = { bar : "bar2" };

var orig = foo;
foo = function() {
	orig.call(obj);
};
 
foo(); // "bar"
foo.call(obj2); // ???

// another example of hard binding


// bind utlity
function bind( fn, o ) {
	// accepts two paramaters the function 
	// and the o parameter which is an object
	return function() {
		fn.call(o);
	};
}

function foo() {
	console.log(this.bar);
}

var obj = { bar: "bar" };
var obj2 = { bar : "bar2" };

foo = bind(foo,obj);
 
foo(); // "bar"
foo.call(obj2); // ???


// function.prototype.bind
// lookup on mdn mozilla dev network


// The new keyword
// turns a function call into a constructor call 


function foo() {
	this.baz = "baz";
	console.log(this.bar + " " + baz);
}

var bar = "bar";
var baz = new foo(); // ?? 

// Closures
// when a function "remembers" its lexical svcope 
// even when its executed outside  that  lexical scope 


// global function
function foo() {
	var bar = "bar";

	// local function 
	function baz() {

		// baz can ref bar
		console.log(bar);
	}

	bam(baz);
}

// global function
function bam(baz) {
	baz(); // ?
}

foo();

// Return a function from a function

function foo() {
	var bar = "bar";

	return function() {
		console.log(bar);
	}
}

function bam() {
	// first set of parens gets the function back
	// the second set moves the objects outside lexical
	// and returns it 
	foo()();  // "bar"
}

bam();

// Other examples 

// setTimeOut

function foo() {
	var bar = "bar";

	setTimeOut(function() {
		console.log(bar);
	}, 1000);
}

foo();

// JQuery click events

function foo() {
	var bar = "bar";

	$("#btn").click(function(evt) {
		console.log(bar);
	});
}

foo();


// Shared Scope 

function foo() {
	var bar = 0;
	// both functions have the same closure of the scope 
	// which means when the first one runs bar is updated
	// when the second one runs bar is updated 
	setTimeout(function(){
		console.log(bar++);
	},100);
	setTimeout(function(){
		console.log(bar++);
	},200);
}

foo(); // 0 1


// Closure Loops

// Book definition of how closure works

// at the current state i is not repeated
// only prints out one i6 five times

for (var i = 1; i <= 5; i++) {
	setTimeout(function(){
		console.log("i: " + i);
	},i*1000);
}


// the solution to this problem is to create
// another scope using a IIFE

// this works because a new scope is being created
// at each iteration

for (var i = 1; i<= 5; i++) {

	// wrap the function in outside parens
	// add (); to the end 
	(function(i){
		setTimeout(function(){
			console.log("i: " + i);
		},i*1000);
	})(i);
}


// Using the let keyword
// binds the i to each iteration of the for loop 

for (let i = 1; i <= 5; i++) {
	setTimeout(function(){
		console.log("i: " + i);
	}, i*1000);
}

// Module Patterns

// classic module patterns
// must have an outter function that gets executed
// must have one or more inner functions that gets 
// returned from the function call 

var foo = (function(){

	var o = { bar: "bar" };

	// principle of least esposure
	// encapsulation - hiding private implementation details
	// make everything private and 
	// only make public what needs to be
	return {
		bar: function(){
			console.log(o.bar);
		}
	};

})();

foo.bar();		// "bar"

 // Modified Module Pattern

 var foo = (function(){
	var publicAPI = {
		bar: function(){
			publicAPI.baz();
		},
		baz: function(){
			console.log("baz");
		}
	};
	return publicAPI;
})();

foo.bar();		// "baz"

// Modern Module Pattern
// seen in require.js or other loaders

define("foo", function() {
	var o = {bar: "bar"};

	return {
		bar: function() {
			console.log(o.bar);
		}
	};
});

// ES6 Module Pattern
// everything you export gets added to the public API

var o = { bar: "bar"};

export function bar() {
	return o.bar;
}

// import keyowrd allows you to import one or more 
// members of the API 

// I just want the method  bar from foo
import bar from "foo";
bar(); // bar


// I want the whole module 
module foo from "foo";

// I just want to use the method bar from foo 
foo.bar(); // bar



// Prototype

function Foo(who) {
	// object.prototype
	// object.constructor
	this.me = who;
}

Foo.prototype.identify = function() {
	return "I am " + this.me;
};

// new object is created 
// object gets linked
// context gets set to this

var a1 = new Foo("a1"); // a1.me
var a2 = new Foo("a2"); // a2.me


// .speak gets added to the a2 object
a2.speak = function() {
	alert("Hello, " + this.identify() + ".");
};

// the contructor property is only on the foo function
a1.constructor === Foo;
a1.constructor === a2.constructor; 

/* the dunder proto property is on the
top level prototype object that is built into language */

a1.__proto__ === Foo.prototype;
a1.__proto__ === a2.__proto__;


// Other ways of getting at the same linkage

// so go to the top level Object
a1.__proto__ === Object.getPrototypeof(a1)

// go to the contructor of Foo
a2.constructor === Foo;

a1.__proto__ == a2.__proto__

/* go to the constructor of a2 then to the 
prototype and find the dunder proto */

a2.__proto__ == a2.constructor.prototype


//  Benefits of the Prototype Linkage

/* ability to delegate to a differnt object 
to handle a method call or a property refernce */

// SHADOWING 

function Foo(who) {
	this.me = who;
}

Foo.prototype.identify = function() {
	return "I am " + this.me;
};

var a1 = new Foo("a1");
a1.identify();

// adds the identify property directly to a1
// shadowing
a1.identify = function() {
	alert("Hello, " +
		// expilicit call 
		Foo.prototype.identify.call(this) +
	".");
};

a1.identify();

// In class based languages method names are expected to be the same on child classes

/* however in Javascript - Object Oriented language (can create an object w/o a class) it is your chose wheather or not you choose to follow this naming convention however if not you will have to do shadowing */

// NOT SHADOWING 

function Foo(who) {
	this.me = who;
}

Foo.prototype.identify = function() {
	return "I am " + this.me;
};

Fpp.prototype.identify.speak = function() {
	alert("Hello, " +
		this.identify() + // not shadowing
	".");
};

var a1 = new Foo("a1");
a1.identify(); //alerts: "Hello, I am a1."


// Prototype: objects linked 

/* .create does the first two of the 4 things the new keyword does
1. creates a new object 2. links the object */

function Foo(who) {
	this.me = who;
}
Foo.prototype.identify = function() {
	return "I am " + this.me;
};

function Bar(who) {
	Foo.call(this,who);
}
// Bar.prototype = new Foo(); // OR...
Bar.prototype = Object.create(Foo.prototype);
// NOTE: .constructor is borked here, need to fix

Bar.prototype.speak = function() {
	alert("Hello, " + this.identify() + ".");
};

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak(); // alerts "Hello: I am b1."
b2.speak(); // alerts "Hello: I am b2."

// The this keyword keeps pointing to what we want it too regardless of where we are in the prototype chain */

// Delegated Objects

function Foo(who) {
	this.me = who;
}
Foo.prototype.identify = function() {
	return "I am " + this.me;
};

function Bar(who) {
	Foo.call(this,who);
}
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.speak = function() {
	alert("Hello, " + this.identify() + ".");
};

var b1 = Object.create(Bar.prototype);
Bar.call(b1,"b1");
b1.speak(); // "Hello: I'm b1"

// Simplified Version 

function Foo(who) {
	this.me = who;
}
Foo.prototype.identify = function() {
	return "I am " + this.me;
};


var Bar = Object.create(Foo.prototype);


Bar.init = function(who) {
	Foo.call(this,who);
};

Bar.speak = function() {
	alert("Hello, " + this.identify() + ".");
};


// b1 linked to bar linked to foo.prototype
var b1 = Object.create(Bar);
b1.init("b1");
b1.speak(); // "Hello: I'm b1"

// Futher Simplified Version

// foo is a now just an object with methods on it
var Foo = {
	init: function(who) {
		this.me = who;
	},
	identify: function() {
		return "I am " + this.me;
	}
};

// bar is just an object with methods on it
var Bar = Object.create(Foo);

Bar.speak = function() {
	alert("Hello, " + this.identify() + ".");
};

// linked to bar
var b1 = Object.create(Bar);
b1.init("b1");
b1.speak();


// Async Patterns: Nested-callback tasks

function getData(d,cb) {
	setTimeout(function(){ cb(d); },1000);
}

getData(10,function(num1){
	var x = 1 + num1;
	getData(30,function(num2){
		var y = 1 + num2;
		getData(
			"Meaning of life: " + (x + y),
			function(answer){
				console.log(answer);
				// Meaning of life: 42
			}
		);
	});
});


// Asyc Patterns: Generators
// ES6 Syntax

// a generator can pause itself a itirrator can resume it. 


// This is synchronous 
function*  gen() {
	console.log("Hello");
	// new keyowrd yeild
	yeild null;
	console.log("World");
}

var it = gen();

// an ittirator 
it.next(); // prints "Hello"
it.next(); // prints "World";


// Promises

// a function is called 
// the task is set
// a promise is returned

// real world example - e2e testing or data calls


// built-in native Promise

function getData(d) {
	return new Promise(function(resolve,reject){
		setTimeout(function(){ resolve(d); },1000);
	});
}

// reject is your error path

var x;

getData(10)
.then(function(num1){
	x = 1 + num1;
	return getData(30);
})
.then(function(num2){
	var y = 1 + num2;
	return getData("Meaning of life: " + (x + y));
})
.then(function(answer){
	console.log(answer);
	// Meaning of life: 42
});

  








 





































