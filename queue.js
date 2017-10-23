///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CPCS 324 Algorithms & Data Structures 2
// Queue list data structure
// 2014, Dr. Muhammad Al-Hashimi, Omama Talal
// -----------------------------------------------------------------------
// Queue list object constructor
// Creates a new queue. A queue is a first-in-first-out (FIFO) data structure list
// items are added to the end of the queue and removed from the front.


// Queue list object
function Queue() {

    // instantiate the queue list
    this.head = new List();

    // memeber method use the functions defined below
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.isEmpty = qEmpty;

}
//------------------------------------------------
/* Enqueues the specified item. The parameter is:
 * new element is added to the end of the list
 * item - the item to enqueue
 */
function enqueue(item) {
    // enqueue the item
    this.head.insert(item);
}
//------------------------------------------------
/* Dequeues an item and returns it. If the queue is empty then undefined is
 * returned.
 */
function dequeue() {
    // if the queue is empty, return undefined
    if (!qEmpty()) return undefined;

    // else, dequeue the queue

    // store the item at the front of the queue
    var item = this.head.first.item;

    //  change the pointor to point the first next item
    this.head.first = this.head.first.next;

    // return the dequeued item
    return item;

}
//-------------------------------------------------
/* Returns true if the queue is empty, and false otherwise.
 */
function qEmpty() {

    return this.head.isEmpty() == false;

}
//-------------------------------------------------
/* Returns the length of the queue.
 */
function getLength() {

    // return the length of the queue
    return this.head.traverse().length;
}
//-------------------------------------------------
/* Returns the item at the front of the queue (without dequeuing it). If the
 * queue is empty then undefined is returned.
 */
function peek() {
    // return the item at the front of the queue
    return this.head.first;
}

