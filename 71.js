// CP-CS 324 Algorithms & Data Structures 2
// Graph data structure demo - First Edge Object
// 2016, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//


var _v = [], _e = [];   // globals used by standard graph reader method


// -----------------------------------------------------------------------
// graph caller function - sort of main() for caller page
// called directly, or on load success event of some input file

function main_graph()   
{
    // create a graph (default undirected)
    var g = new Graph();
	

	   
    // set graph properties
	g.label = "Figure 3.10 (Levitin, 3rd edition) ";

    
    // use global input arrays _v and _e to initialize its internal data structures
	g.read_graph(_v,_e);
	
    
    // use print_graph() method to check graph
	g.print_graph();
	

	
	// perform depth-first search and output stored result
	g.topoSearch('d');
	document.write("<p>dfs_push: ",g.dfs_push,"</p>");

    
    // report connectivity status if available
	g.connectInfo();
	
    
    // perform depth-first search and output stored result
	g.topoSearch('b');
	document.write("<p>bfs_order: ",g.bfs_order,"</p>");
    
    
    
    // output the graph adjacency matrix
	g.makeAdjMatrix();
    document.write("<p>first row matrix: ", g.adjMatrix[0], "<p>"); //FIRST ROW
    document.write("<p>last row matrix: ", g.adjMatrix[g.nv - 1], "<p>"); //LAST ROW
    
    
}


// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v)
{
	// user input fields
	
	this.label = v.label;          // vertex can have label, example: a, v1, jeddah
	
	// more fields to initialize internally
	
	this.visit = false;            // vertex can be marked visited (useful for traversals)
	this.adjacent = new List();    // head pointer of adjacency linked list
	
	// --------------------
	// member methods use functions defined below
	this.adjacentByID = adjacentByIdImpl;//Member method - get id of adjacent vertices
	
	this.incidentEdge=incidentEdgeImpl; //Member method - get information of incident edges (including adjacent vertices)
	                                // I get it from: http://www.hashimi.ws/cs324/code/out/jsdoc/symbols/Vertex.html
	this.vertexInfo=vertexInfoImpl; //get vertex information in printable form
}



// -----------------------------------------------------------------------
// Edge object constructor - Create a graph edge object.
function Edge(vert_i, weight){
	
	this.target_v = vert_i; // id of edge target vertex 
    this.weight = !(weight === undefined) ? weight : null; //Edge is unweighted (value: null) unless an optional weight parameter is passed 
	
}



// -----------------------------------------------------------------------
// Graph object constructor

function Graph()
{
	this.vert = new Array();       // vertex list: array of Vertex objects
	this.nv=0;                       // number of vertices
	this.ne=0;                       // number of edges
	this.digraph = false;          // true if digraph, false otherwise (default undirected)
	this.dfs_push = [];            // DFS traversal order output array
	this.bfs_order = [];             // BFS traversal order output array
	this.label = "";               // identification string to label graph
	this.connectedComp = 0;        // number of connected comps set by DFS; 0 for no info
	this.adjMatrix = [];           // graph adjacency matrix to be created on demand
    this.weighted = false;         //true if graph is weighted, false otherwise - Default Value: false 
	
	// --------------------
	// student property fields next
	
	
	// --------------------
	// member methods use functions defined below
	
	this.read_graph = better_input;  // default input reader method   
	
	
	this.add_edge=add_edgeImpl2;
	this.print_graph = print_graphImpl;
	this.list_vert = list_vert;     //Deprecated, use vertexInfoImpl
	this.makeAdjMatrix=makeAdjMatrixImpl;
	this.isConnected=isConnectedImpl;
	this.connectInfo=reportConnectivity;
	
	// --------------------
	// student methods next; actual functions in student code section at end

	this.topoSearch=topoSearchImpl;  // perform a topological search  
	this.dfs = dfsImpl;                  // DFS a connected component
	this.DFS = DFSImpl;                  //Deprecated, use topoSearch
	this.bfs = bfsImpl;                  // BFS a connected component
	this.BFS = BFSImpl;                  //Deprecated, use topoSearch
	
}


// -----------------------------------------------------------------------
// functions used by methods of Graph object
// similar to other functions but use object member fields and methods depending
// on which object is passed by method call through "this"
//

function add_edgeImpl(u_i,v_i)   // obsolete, replace by add_edgeImpl2()
{
	// fetch vertices using their id, where u: edge source vertex, v: target vertex 
	var u = this.vert[u_i];
	var v = this.vert[v_i];
	
	
	// insert (u,v), i.e., insert v (by id) in adjacency list of u
	u.adjacent.insert(v_i);
	
	
	// insert (v,u) if undirected graph (repeat above but reverse vertex order)
	if(!this.digraph){
		v.adjacent.insert(u_i);
	}

}

function add_edgeImpl2(u_i,v_i,weight)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
	var u = this.vert[u_i];
	var v = this.vert[v_i];
	
	
		
	// insert (u,v), i.e., insert v in adjacency list of u
	// (first create edge object using v_i as target, then pass edge object)
	
	var ev=new Edge(v_i,weight);//store the target vertex and the edge weight 
	u.adjacent.insert(ev);
	
		
	// insert (v,u) if undirected graph (repeat above but reverse vertex order)
	if (!this.digraph){
		var eu=new Edge(u_i,weight);
		v.adjacent.insert(eu);
	}
	

}

// --------------------
function print_graphImpl()
{
	
	
	document.write("<p>GRAPH {",this.label, "} ",
	this.weighted ? "WEIGHTED, " : "", 
	this.digraph?"":"UN", "DIRECTED - ", 
	this.nv, " VERTICES, ", 
	this.ne, " EDGES:</p>");

	// report connectivity status if available
	this.connectInfo();
	
	// list vertices
	for (var i = 0; i < this.nv; i++)
    {
	    var v = this.vert[i];
		document.write("VERTEX: ", i, v.vertexInfo(), "<br>");
	
	}
	
	
	//this.list_vert();	
}

// --------------------
/*

Deprecated:
Graph should not know about vertex internal structure. 
It should ask a vertex to report back its information.
 Use Vertex printer method instead.

*/
function list_vert()
{
	return "";
}

// --------------------
//Get vertex details in a string
function  vertexInfoImpl() {
	
		return( " {"+ this.label+ "} - VISIT: "+ this.visit+ 
			" - ADJACENCY: "+ this.adjacentByID() );
	
}

// --------------------
function better_input(v,e)     // default graph input method
{
	// set number of vertices and edges fields
	this.nv = v.length;
	this.ne = e.length;
	
	// input vertices into internal vertex array
	var i;
	for (i=0; i<this.nv;i++){
		this.vert[i]=new Vertex(v[i]);
	}
	
	//pass the two adjacent vertices and weight *if available* to add_edge method
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

	// double edge count if graph undirected 
	if (!this.digraph){
		this.ne*=2;
	}

}

// -----------------------------------------------------------------------
// utility functions used by Graph object method functions
function reportConnectivity()
{
    if (this.connectedComp === 0)
    {
        document.write("<p>no connectivity info<p>");
    }
    else if (this.isConnected())
    {
        document.write("<p>CONNECTED<p>");
    }
    else
    {
        document.write("<p>DISCONNECTED ", this.connectedComp, "<p>");
    }
}



// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------
function isConnectedImpl(){
	if (this.connectedComp==1){
		return true
	}
	else 
		return false;
}

function topoSearchImpl(fun)
{
	// mark all vertices unvisited
	for (var i=0; i<this.nv;i++){
		this.vert[i].visit=false;
	}
	//decide which one to do is depending on the the *mood*
	
	// traverse a connected component 
	for (var i=0; i<this.nv;i++){
		if(!this.vert[i].visit){
			if(fun==='d'){ //'d' for DFS
				this.connectedComp++;
			    this.dfs(i);
			}
			else if(fun==='b'){//'b' for BFS
				this.bfs(i);
			}	
		}	
	}
}

// --------------------
////Deprecated, use topoSearch
function DFSImpl()
{
	
return "";
}

// --------------------
////Deprecated, use topoSearch
function BFSImpl()
{
	
	return"";

}
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

// --------------------
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

}

// --------------------
/*
	Generate adjacency matrix representation of graph from internal adjacency lists.
	Weights mark edges if graph is weighted resulting in a weight (or weighted adjacency) matrix 
	*/
function makeAdjMatrixImpl()
{
	
	// initially create row elements and zero the adjacncy matrix
	var i,j;
    for ( i = 0; i < this.nv; i++)
    {
		var v =this.vert[i];
        this.adjMatrix[i] = []; // create row elements for each vertex
        for ( j = 0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0; //set them all by 0 
        }
    
	
	
	// for each vertex, set 1 for each adjacency with no weight and weight if it's weighted

	var adj = v.incidentEdge(); // get edge information in an array 
    for (j = 0; j < adj.length; j++)
	    {
            this.adjMatrix[i][adj[j].adjVert_i] = this.weighted ? adj[j].edgeWeight : 1; // set 1 for each adjacency 
			                                                                      //or the weight if it's weighted graph
        }
    }
	
	

}


//functions used by vertex object method functions

//---------------------
//Get id of adjacent vertices in an array
function adjacentByIdImpl()
{
    // get adjacent ids from adjVert label of incidentEdge
    var adj = this.incidentEdge();
    var adj_id = [];
    for (var i = 0; i < adj.length; i++)
    {
        adj_id[i] = adj[i].adjVert_i;
    }
    return adj_id;
}

// --------------------
// Get information about edges incident to vertex in an array
function incidentEdgeImpl()
{
	var adj= this.adjacent.traverse();
    var e_info = new Array();
   
    // get edge information in array of two fields"vert_i and weight of that edge"
    for (var i = 0; i < adj.length; i++)
    {
        e_info[i] = {adjVert_i: adj[i].target_v, edgeWeight: adj[i].weight};

    }
    return e_info;
}