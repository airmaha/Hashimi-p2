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
// our desgin keeps minimum priority by deleting the first node (the one with minimum priority)
// through adding a method in the linked-list class, that is called " delete_first()"
// it works simultaneously with the delete method "deleteMinImpl()" here in the priority queue.
// "deleteMinImpl()" finds the minmumm element then calls  "delete_first()" to perform the acctual deletion.
// once you delete the first node "delete_first()" reconstructs the queue and puts the node 
// next to the previous head in it's place to be the new "first" node.
// isEmpty(): a method that checks if the PQ is empty or not, it uses "isEmpty" mmethod from linkedList class.
// insert():  a method that inserts a new node at the end of the queue using LinkedList insert method.
// deleteMin(): a method that find the element with lowest priority (weight) in the list, then deletes it.
// decrease():  a method to update the priority of a vertex.
// -----------------------------------------------------------------------
// code plan: start to write your API specifications (JSDOC comments) and think about 
// design consequences (design impact)
// -----------------------------------------------------------------------
// Impact analysis:
// 1- adding a new method to linklist package that delests the first node in the PQ.
// 2- reuse the next methods from the linklist package in the priority queue package:
// isEmpty() to check if the priority queue is empty
// insert() to insert a node into the priority queue
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
 /** to store the item in the priority queue*/	
	this.item = item;
/**key to maintain queue order*/
	this.prior = key;
}

// -----------------------------------------------------------------------

/** Check if the queue is empty or not

    @author Maryam

	@returns {boolean} , true if the  priority queue is empty, and false otherwise.
 */

function pqIsEmptyImpl (){

//it uses IsEmpty() method from LinkedList class.
}           

//--------------------------------------------------------------------


/** find the item with the lowest priority (weight)
  in the list, then delete it.

@methodOf PQueue#
 @author Maryam

@returns {array} that contains deleted node information.
 */


function deleteMinImpl()
{


/**
 * most work is done here.
 * we'll store the head node to use it while traversing and to find min and reconstruct the PQ:
 *  first = pq.first;
 * //a temp variable min, will be used as a comparsion node:
 *  min = new LNode( new PQueue() );
 * deletedNode = null; //will store the deleted node.
 * first find the minmmum node then delete:

		while(check if first !=null){
			if(first priority less than min's){
				min = first;
			}
			first = first.next; //update first
		}
	
		deleteNode = min
		
		//if the first has minummum priority, delete it:
		if(first == min){ 
			deleteNode = pq.delete_first();
		}
	
		else{ 
		 //check all nodes except first node
			while(first.next != min){
		     //update current first node 
			}
			first.next = first.next.next; //delete it
		}
	*we'll have a return value that's an array called info that'll store the deleted node's information:
		return info ; 
	
*/
   

}         

//---------------------------------------------------------------------------


/** inserts a method at the end of the PQ.

@methodOf PQueue#
 @author Maryam
@param {object} item input (configuration) object containing user field such as item and key
@param {number} nKey  priority key.
 */

function insertImpl(item,key)
{
  //create a node object :
  // node =  new PQueue(item,key);
  //Insert a new node into the priority queue 
  //pq.insert(node);

}  

//---------------------------------------------------------------------------

/** change the priorty of a node after deletion, and update it's key.

	@methodOf PQueue#
	@author Maryam
	@param {number} id vertex id.
	@param {number} nKey  the updated priority key.
 */

function  decreaseImpl(id, nkey){
   //the method starts traversing using the head of the PQ:
   //current =  pq.first;
   /**
	* while(current != null){
		//if the item is found:
		if(current.item.id == id){
			current.item.prior = nKey;
		}
		then we update the current node:
		current = current.next;
	}

	*/

}



