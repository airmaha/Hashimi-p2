// CPCS 324 Algorithms & Data Structures 2
// Demo - linked list
// 2014, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// in this version, we give an object-oriented description of solution
// we use objects with properties and methods to describe the solution
// we still have to give step-by-step description (algorithm) for methods
//

var a = new List();    // create linked list objects

// any object can be added to list
a.insert(10);                          // insert number
a.insert("bla-bla");                   // insert string
a.insert(["ali","saad","saeed"]);      // insert array of strings

// insert object {...} with 3 fields
a.insert( {v_id:5, weight:100, label:"Jeddah"} );

// the method .traverse() returns list data in an array
document.write("<p>",a.traverse(),"</p>");

// access property field of object stored in position 3
document.write("<p>",a.traverse()[3].label,"</p>");

// document.write() can't print general objects, use 
// JSON.stringify() for debugging complex data structures
// replace a.traverse() with your own stuff, try the list a
// replace 'document.write' by 'alert' to display in popup box

document.write( "<pre>"+JSON.stringify(a.traverse(), null, "   ")+"</pre>" );



// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// List node object constructor

function LNode(item)
{
	this.item = item;              // stored data in list can be any object
	this.next = null;
}

// -----------------------------------------------------------------------
// Linked list object constructor

function List()
{
	this.first = null;             // list initially empty

	// --------------------
	// many more list processing methods could be added here

	this.insert = insert;          // insert node at end of list
	this.traverse = traverse;      // return list elements in an array
	this.isEmpty = lEmpty;         // return true if list is empty
	
	// --------------------
	// student methods next; ; actual functions in student code section at end

}

// -----------------------------------------------------------------------
// method functions used by List() object
//

function lEmpty()
{
	return (this.first == null);
}

// --------------------
function insert(item)
{
	// if list empty create node and link, otherwise walk down list and insert at end
	
	if (this.isEmpty())
		this.first = new LNode(item);
	else
	{
		var l = this.first;        // walker variable
		while (l.next != null)
			l = l.next;
		l.next = new LNode(item);
	}
}

// --------------------
function traverse()
{
	var out = [];                  // return list elements in array

	for (var i=0, l=this.first; l != null; l = l.next )
		out [i++] = l.item;
	return out;
}



// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------
