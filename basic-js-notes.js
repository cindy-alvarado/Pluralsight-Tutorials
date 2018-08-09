a = b * 2 + foo(c * 3);

var a = 42;

let b = 2;
const a = 42;

function d() {}

//blocks

{
	var a = 42;
	foo(a / 2);
}

var a = 42;

if (a > 10) {
	a = 10;
	foo(a / 2);
}

while ( a > 10) {
	a = 10;
	foo(a / 2);
}

function foo() {

}

var bar = function () {}

var bar = function foo() {}

 
function foo(b) {
	a = a / 2;
	a = a * b;
}

var a = 10;

foo(10);

console.log(a);

foo(100);
foo(1000);

console.log(a);

