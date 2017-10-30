// graph from Figure 8.11 (3rd edition)
// input user property fields for each vertex as defined in the Vertex object below
// property fields can be listed in any order; simply omit fields with no value to assign


var _v = [
	{ label: "a" }, // index = 0
	{ label: "b" }, // index = 1
	{ label: "c" }, // index = 2
	{ label: "d" }  // index = 3
];

var _e = [
	{ u: 0, v: 1 },
	{ u: 1, v: 3 },
	{ u: 3, v: 0 },
	{ u: 3, v: 2 }
];