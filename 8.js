// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Transitive Closure Package
// 2017, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//


var _v = [], _e = [];   // note naming convention in upload guide


// -----------------------------------------------------------------------
function main_graph()   
{
 // create a graph (default undirected)
 var g = new Graph();
 

	
 // set graph properties
 g.label = "Figure 3.10 (Levitin, 3rd edition) ";

 
 // use global input arrays _v and _e to initialize its internal data structures
 g.readGraph(_v,_e);
 
 
 g.printGraph();
 

 
 // perform depth-first search and output stored result
 g.topoSearch('d');
 document.write("<p>dfs_push: ",g.dfs_push,"</p>");

 
 // report connectivity status if available
 g.componentInfo();
 
 
 // perform depth-first search and output stored result
 g.topoSearch('b');
 document.write("<p>bfs_order: ",g.bfs_order,"</p>");
 
 
 
 // output the graph adjacency matrix
 g.makeAdjMatrix();
 document.write("<p>first row matrix: ", g.adjMatrix[0], "<p>"); //FIRST ROW
 document.write("<p>last row matrix: ", g.adjMatrix[g.nv - 1], "<p>"); //LAST ROW
		
}


// -----------------------------------------------------------------------

function Vertex(v)
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments (leave outline)
	// no JSDOC comments in this section
	
	// property fields
	
	this.label = v.label;
	this.visit = false;
	this.adjacent = new List();
	
	this.adjacentByID = adjacentByIdImpl;
	this.incidentEdge = incidentEdgeImpl;
	this.vertexInfo =  vertexInfoImpl;
    this.insertAdjacent = insertAdjacentImpl;
	// student methods next; actual functions in student code sections
	
}

// -----------------------------------------------------------------------

function Edge(vert_i,weight)
{
	
	
	this.target_v = vert_i;
	this.weight = !(weight === undefined) ? weight : null;       

}


// -----------------------------------------------------------------------

function Graph()
{
	
	this.vert = [];
	this.nv = 0;//number of vertices.
	this.ne = 0;//number of edges.
	this.digraph = false;//to indicate if a graph is directed or not.
	this.weighted = false;//to indicate if a graph is weighted or not.
	this.dfs_push = [];//Array of vertex id in DFS order.
	this.bfs_order = [];//Array of vertex id in BFS order.
	this.label = '';//Attach a text label to graph.
	this.connectedComp = 0;//Number of connected components.
	this.adjMatrix = [];//Graph adjacency matrix.
	this.readGraph = better_input;
	this.addEdge = addEdgeImpl2;
	this.printGraph = printGraphImpl;
	//this.makeGraph = makeGraphImpl;
	this.list_vert = ''; // this will not be used anymore.
	this.dfs = dfsImpl;
	this.bfs = bfsImpl;
	this.makeAdjMatrix = makeAdjMatrixImpl2;
	this.isConnected = isConnectedImpl;
	this.componentInfo = componentInfoImpl;
	this.topoSearch = topoSearchImpl;
	// --------------------
	// student methods next (actual functions in student code sections)

	// transitive closure package (requirements in line comments) 
	
	this.hasPath                   // boolean, true if path exists between vertices v_i, v_j in digraph
	this.shortestPath              // return distance of shortest path between v_i, v_j in weighted graph 
	this.isDAG                     // boolean, true if acyclic digraph
	this.warshallFloyd             // inserts .tc field in adjacency matrix if digraph, and .dist if weighted
	this.dfsTC                     // return TC matrix for digraph based on a dfs
		



}



//--------------------------------------------------------------
function addEdgeImpl2(u_i,v_i,weight)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
	var u = this.vert[u_i];
	var v = this.vert[v_i];
	
	
		
	// insert (u,v), i.e., insert v in adjacency list of u
	// (first create edge object using v_i as target, then pass edge object)
	
	var ev=new Edge(v_i,weight);//store the target vertex and the edge weight 
	u.insertAdjacent(ev);
	
		
	// insert (v,u) if undirected graph (repeat above but reverse vertex order)
	if (!this.digraph){
		var eu=new Edge(u_i,weight);
		v.insertAdjacent(eu);
	}
}


function printGraphImpl()
{
	
	
	document.write("<p>GRAPH {",this.label, "} ",
	this.weighted ? "WEIGHTED, " : "", 
	this.digraph?"":"UN", "DIRECTED - ", 
	this.nv, " VERTICES, ", 
	this.ne, " EDGES:</p>");

	// report connectivity status if available
	this.componentInfo();
	
	// list vertices
	for (var i = 0; i < this.nv; i++)
    {
	    var v = this.vert[i];
		document.write("VERTEX: ", i, v.vertexInfo(), "<br>");
	
	}



	
	
	
	//this.list_vert();	
}

	
function  vertexInfoImpl() {
	
	return( " {"+ this.label+ "} - VISIT: "+ this.visit+ 
	" - ADJACENCY: "+ this.adjacentByID() );
}


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

function makeAdjMatrixImpl2()
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



// -----------------------------------------------------------------------


function better_input(v,e)
{

	// set number of vertices and edges fields
	this.nv = v.length;
	this.ne = e.length;
	
	// input vertices into internal vertex array
	var i;
	for (i=0; i<this.nv;i++){
		this.vert[i]=new Vertex(v[i]);
	}
	
	if (this.weighted){ //if the graph is weighted:
		for (i = 0; i < this.ne; i++){
			this.addEdge(e[i].u, e[i].v, e[i].w);
		}

	}
	else {
		for(i=0;i<this.ne;i++){
			this.addEdge(e[i].u, e[i].v);
		}
		
	}

	// double edge count if graph undirected 
	if (!this.digraph){
		this.ne*=2;
	}
}


function insertAdjacentImpl(e){
	this.adjacent.insert(e);
}

