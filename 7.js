//Maryam Omar Hussien - 1420175 
//Project Milestone 1.
// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Reorganized Code
// 2017, Dr. Muhammad Al-Hashimi

var _v = [], _e = []; 
var counter=0;

function main_graph()   
 {
  // create a graph (default undirected):
  var g = new Graph();
  g.label = "Figure 3.10 (Levitin, 3rd edition)";
  g.printGraph(); //print the graph to check.
  // report connectivity status if available:
  document.write(g.connectInfo());
  // use global input arrays _v and _e to initialize its internal data structures:
  g.readGraph(_v, _e); 
  document.write("<p>", "dfs_push: ", g.dfs_push, "</p>");
  g.topoSearch();
  document.write("<p>", "bfs_order: ", g.bfs_order, "</p>");
  // print the graph adjacency matrix:
  g.makeAdjMatrix();
  document.write("<p>", "first row matrix: ", g.adjMatrix[0], "</p>");
  document.write("<p>", "last row matrix: ", g.adjMatrix[g.nv - 1], "</p>");

  
   
}

//--------------------------------------------------------------
//vertex class:

function Vertex(v)
{
  this.label = v.label;
  this.visit = false;
  this.adjacent = new List();
  this.adjacentByID = adjacentByIdImpl;
  this.incidentEdge = incidentEdgeImpl;
  this.vertexInfo = vertexInfoImpl;
 // this.insertAdjacent = insertAdjacentImpl;
}


// end of Vertex class.
//--------------------------------------------------------------
//Edge class:
function Edge(vert_i, weight)
{
  //Id of the target vertex:
  this.target_v = vert_i;
  this.weight = !(weight === undefined) ? weight : null;
} 


//--------------------------------------------------------------
//Graph class:

function Graph()
{
  this.vert = [];//vertex list.
  this.nv = 0;//number of vertices.
  this.ne = 0;//number of edges.
  this.digraph = false;//to indicate if a graph is directed or not.
  this.weighted = false;//to indicate if a graph is weighted or not.
  this.dfs_push = [];//Array of vertex id in DFS order.
  this.bfs_order = [ ];//Array of vertex id in BFS order.
  this.label = '';//Attach a text label to graph.
  this.connectedComp = 0;//Number of connected components.
  this.adjMatrix = [ ];//Graph adjacency matrix.
  this.readGraph = better_input;
  this.addEdge = addEdgeImpl2;
  this.printGraph = printGraphImpl;
  this.makeGraph = makeGraphImpl;
  this.list_vert = ''; // this will not be used anymore.
  this.dfs = dfsImpl;
  this.bfs = bfsImpl;
  this.makeAdjMatrix = makeAdjMatrixImpl2;
  this.isConnected = isConnectedImpl;
  this.componentInfo = componentInfoImpl;
  this.topoSearch = topoSearchImpl;
}

/****/

function addEdgeImpl(u_i,v_i) {


      // fetch vertices using their id, where u: edge source vertex, v: target vertex:
  var v = this.vert[v_i];
  var u = this.vert[u_i];
  // insert (u,v), i.e., insert v (by id) in adjacency list of u:
  u.adjacent.insert(v_i);
  // insert (v,u) if undirected graph (repeat above but reverse vertex order):
  if (!this.digraph) {
    v.adjacent.insert(u_i);
  }
 }


 

 //new addEdge method, used to add edges weather weighted or not: 


function addEdgeImpl2(u_i, v_i, weight)
{

//get vertices Id list:
 var u = this.vert[u_i];//source vertex.
 var v = this.vert[v_i];//target vertex.

 var temp_edge =new Edge(v_i,weight);//make a temp edge, that contains target vertx and weight.
 u.adjacent.insert(temp_edge);//inseret the new edge in the adjacent list of the current edge.
 
}

/****/

function printGraphImpl()
{
    document.write("<p>GRAPH {",this.label, "} ",
	this.weighted ? "WEIGHTED, " : "", 
	this.digraph?"":"UN", "DIRECTED - ", 
	this.nv, " VERTICES, ", 
	this.ne, " EDGES:</p>");

	this.componentInfo(); //conectivity status.
	
	// list vertices:
	for (var i = 0; i < this.nv; i++)
    {
        var v = this.vert[i];
        //use VertexInfo method instaid of the direct list: 
		document.write("VERTEX: ", i, v.vertexInfo(), "<br>");
	
	}   
}

/****/

function better_input(v,e)
{
  // set number of vertices and edges:
	this.nv = v.length;
	this.ne = e.length;
	
	// input vertices into internal vertex array
	var i;
	for (i=0; i<this.nv;i++){
		this.vert[i]=new Vertex(v[i]);
	}

	if (this.weighted){ //if the graph is weighted:
		for (i = 0; i < this.ne; i++){
			this.add_edge(e[i].u, e[i].v, e[i].w);
		}

	}
	else {
		for(i=0;i<this.ne;i++){
			this.add_edge(e[i].u, e[i].v);
		}
		
	}

	// double edge count if the gragh is undirected:
	if (!this.digraph){
		this.ne = (this.ne*2);
	}
}

/****/

function topoSearchImpl()
{
   // mark all vertices unvisited
   for (var i = 0; i < this.nv; i++)
   {
       this.vert[i].visit = false;
   }
   // traverse a connected component 	
   for (i = 0; i < this.nv; i++)
   {
       if (!this.vert[i].visit)
       {
           this.topoCounter == 1 ? (this.dfs(i), counter++) : this.bfs(i);
       }
   }
   return counter;    
}

/****/

 function dfsImpl(v_i)
 {

 // process vertex

 var v=this.vert[v_i];
 v.visit=true;
 this.dfs_push[this.dfs_push.length]=v_i;
 

 // recursively traverse its unvisited adjacent vertices

 var w=v.adjacentByID();
 var m=w.length;
 for (var i=0;i<m;i++){
     if(!this.vert[w[i]].visit){
         this.dfs(w[i]);
     }		
 }

 }



function bfsImpl(v_i)
{

	// process v (using its id)
	var v = this.vert[v_i];
    v.visit = true; 
    

	// initialize queue with v
	var q=new Queue();
	q.enqueue(v);
	this.bfs_order[this.bfs_order.length]=v_i;
	
	// while queue not empty
	while (!q.isEmpty()){
		
	    
		// dequeue and process a vertex, u
		var u = q.dequeue();
		
		// queue all unvisited vertices adjacent to u
		var w = u.adjacentByID() //array of adjacents
		var m=w.length;          //how many adjacent to visit

        for (var i = 0; i < m; i++) {

            if (!this.vert[w[i]].visit) 
            {
                this.vert[w[i]].visit = true;      // mark visited
				q.enqueue(this.vert[w[i]]);   
                this.bfs_order[this.bfs_order.length]=w[i];
            } 
        } 
		
	}

	// process v (using its id)
	var v = this.vert[v_i];
    v.visit = true; 
    

	// initialize queue with v
	var q=new Queue();
	q.enqueue(v);
	this.bfs_order[this.bfs_order.length]=v_i;
	
	// while queue not empty
	while (!q.isEmpty()){
		
	    
		// dequeue and process a vertex, u
		var u = q.dequeue();
		
		// queue all unvisited vertices adjacent to u
		var w = u.adjacentByID() //array of adjacents
		var m=w.length;          //how many adjacent to visit

        for (var i = 0; i < m; i++) {

            if (!this.vert[w[i]].visit) 
            {
                this.vert[w[i]].visit = true;      // mark visited
				q.enqueue(this.vert[w[i]]);   
                this.bfs_order[this.bfs_order.length]=w[i];
            } 
        } 
		
	}

}


/****/
function makeAdjMatrixImpl2()
 {	
 
    for (var i = 0; i < this.nv; i++)
    {
		var v =this.vert[i];
        this.adjMatrix[i] = []; // create row elements for each vertex
        for ( j = 0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0; //set them all by 0 
        }
//if weighted=1,not 0;
	var adj = v.incidentEdge(); // get edge information in an array 
    for (var j = 0; j < adj.length; j++)
	    {
            this.adjMatrix[i][adj[j].adjVert_i] = this.weighted ? adj[j].edgeWeight : 1;
 }

/****/


function isConnectedImpl()
 {	
    return this.connectedComp == 1 ? true : false	
 }

/****/
function componentInfoImpl()
 {	
//Report CONNECTED, if graph is connected
if (this.isConnected())
return 'CONNECTED';
//Report No connencted inf if connected component = 0
else if (this.connectedComp == 0)
return 'no connectivity info';
//Report DISCONNECTED if connected comp > 1
else
return 'DISCONNECTED ' + this.connectedComp;
 }


/****/

function adjacentByIdImpl()
 {
    var adj = this.adjacent();
    var adj_id = [];
    for (var i = 0; i < adj.length; i++)
    {
        adj_id[i] = adj[i].adjVert_i;
    }
    return adj_id;
 }
/****/

function  vertexInfoImpl() {
	
		return( " {", this.label, "} - VISIT: ",this.visit, 
			" - ADJACENCY: ",this.adjacentByID() );
	
}

/****/

function incidentEdgeImpl()
 {
 //later
 }

/****/

function makeGraphImpl()
 {
 //later.
 }


// end of graph class.
//--------------------------------------------------------------