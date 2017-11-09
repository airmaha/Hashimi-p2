// CPCS 324 Algorithms & Data Structures 2
// Outline - Priority queue data structure
// 2017, Dr. Muhammad Al-Hashimi


// -----------------------------------------------------------------------
// Basic design decisions and implementation planning (objects & interfaces)

// initial requirements: to quickly support Dijkstra and second Prim's algorithms, 
// implement minimum priority functionality

// design decisions:
// based on the 324 linked list implementation
// how will the PQ ops be implemented?
// <student fill here>

// code plan: start to write your API specifications (JSDOC comments) and think about 
// design consequences (design impact)

// Impact analysis:
// <student fill here>



// -----------------------------------------------------------------------
// Priority queue object constructor (document using JSDOC comments)

function PQueue()
{
	this.pq = new List();                         // requirement: linked-list implementation
	this.isEmpty = pqIsEmptyImpl;                 // return true if queue empty
	this.deleteMin = deleteMinImpl ;              // remove/return item with minimum priority
	this.insert = insertImpl ;                    // insert an item with priority
	this.decrease= decreaseImpl;                  // (fill) update item priority (decrease as defined in textbook) 
	
}

// -----------------------------------------------------------------------
// Priority queue node constructor (document using JSDOC comments)
/**
 to initialize priorty queue nodes.
 
 @constructor

 @author Maryam
 @param {object} item input (configuration) object containing user field such as item and key
 @param {integer} key input that'll indicate the priority of this node.

 */
function PQNode(item, key)
{
	this.item = item;
	this.prior = key;
}

// -----------------------------------------------------------------------

/** Check if the queue is empty or not

    @author Maryam

	@returns {boolean} , true if the  priority queue is empty, and false otherwise.
 */

function pqIsEmptyImpl (){

	return (this.pq.isEmpty());

}           

//--------------------------------------------------------------------


/** sorts the list, then deletes
 the item with highest priority (weight).

@methodOf PQueue#
    @author Maryam

@returns {array} that contains deleted node information.
 */


function deleteMinImpl()
{

	var first = this.pq.first;//store the head node.
	var min = new LNode( new PQueue(0,Infinity) ); //temp varibale to store the minimum node after each comparsion.
	var deleteNode = null; //will store the deleted node.
	

		while(first != null){
			if(first.item.prior < min.item.prior){
				min = first;
			}
			first = first.next; //update first
	
		}
	
		deleteNode = min.item;//assign the node that'll be deleted
	
		first = this.pq.first;//for travarsing
	
		//if the current node is the head node ( first ), delete the head:
		if(first == min){ 
			deleteNode = this.pq.delete_first();
		}
	
		else{ 
			//check all nodes except first node
			while(first.next != min){
				first = first.next; //update current
			}
			first.next = first.next.next; //delete it
		}
	
		var info = [temp.item, temp.prior]; // store the node information 
										 //in array of two values [0]=item ,[1]=key 
		return info; //return deleted node information


}         

//---------------------------------------------------------------------------

function insertImpl(item,key)
{
  //create a node object 
  var node =  new PQueue(item,key);
  
   //Insert a new node into the priority queue 
	this.pq.insert(node);

}  

//---------------------------------------------------------------------------

/** change the priorty of a node after deletion, and update it's key.

	@methodOf PQueue#
	@author maryam
	@param {number} id vertex id.
	@param {number} nKey  the updated priority key.
 */

function  decreaseImpl(id, nkey){

	var current = this.pq.first;

	while(current != null){
		//if we found the item
		if(current.item.id === id){
			current.item.prior = nKey;
			break;
		}
		current = current.next;//update current
	}


}



