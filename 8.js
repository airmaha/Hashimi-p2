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

 //you need to check if the graph is wieghted to determine if one can enter wieght or not:


 // set graph properties
 g.label = "Figure 3.10 (Levitin, 3rd edition) ";

 if (!(_e[0].w===undefined)){
	g.weighted=true;
}
 // use global input arrays _v and _e to initialize its internal data structures
 g.readGraph(_v,_e);
 

 g.printGraph();
 
 // perform depth-first search and output stored result
 g.topoSearch('d');
 document.write("<p>dfs_push: ",g.dfs_push,"</p>");

 
 // report connectivity status if available
 document.write(g.componentInfo());
 
 
 // perform depth-first search and output stored result
 g.topoSearch('b');
 document.write("<p>bfs_order: ",g.bfs_order,"</p>");
 
 document.write("<p>TC matrix by DFS:", "</p>");
 g.TC=g.dfsTC();
 for (var i=0;i<g.TC.length;i++){
	 document.write(g.TC[i],"</p>");
	 
 }

 
 document.write("TC matrix by Warshall-Floyd:", "</p>");
 g.R=g.warshallFloyd();
 for (var i=0;i<g.R.length;i++){
	 document.write(g.R[i],"</p>");
	 
 }
 
 document.write("DAG : ", g.isDAG(), "</p>");
 
 // output the graph adjacency matrix
 g.makeAdjMatrix();
 document.write("Distance matrix Exercise 8.4: 7", "</p>");
 for (var i=0;i<g.adjMatrix.length;i++){
	 document.write(g.adjMatrix[i],"</p>");
	 
 }
		 
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
	//this.incidentEdge = incidentEdgeImpl;
	this.vertexInfo =  vertexInfoImpl;
    this.insertAdjacent = insertAdjacentImpl;	
}

// -----------------------------------------------------------------------

function Edge(vert_i,weight)
{
	
	this.target_v = vert_i;
	this.weight = (weight === undefined) ? null:weight;       
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
	this.makeGraph = makeGraphImpl;
	this.list_vert = ''; // this will not be used anymore.
	this.dfs = dfsImpl;
	this.bfs = bfsImpl;
	this.makeAdjMatrix = makeAdjMatrixImpl2;
	this.isConnected = isConnectedImpl;
	this.componentInfo = componentInfoImpl;
	this.topoSearch = topoSearchImpl;
	this.adjacentByID = adjacentByIdImpl;
	// --------------------
	// student methods next (actual functions in student code sections)

	// transitive closure package (requirements in line comments) 
	
	this.hasPath  = hasPathImpl;                // boolean, true if path exists between vertices v_i, v_j in digraph
	this.shortestPath= shortestPathImpl;            // return distance of shortest path between v_i, v_j in weighted graph 
	this.isDAG =isDAGImpl;                   // boolean, true if acyclic digraph
	this.warshallFloyd = warshallFloydImpl;          // inserts .tc field in adjacency matrix if digraph, and .dist if weighted
	this.dfsTC = dfsTCImpl;                     // return TC matrix for digraph based on a dfs
	this.R;	                       //matrix of Transitive Closure using warshallFloyd 
	this.TC=[];
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

//----------------------------------------------------------------------------------

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

}

//----------------------------------------------------------------------------------
	
function  vertexInfoImpl() {
	
	return( " {"+ this.label+ "} - VISIT: "+ this.visit+ 
	" - ADJACENCY: "+ this.adjacentByID() );
}

//----------------------------------------------------------------------------------


function isConnectedImpl()
{	
   return this.connectedComp == 1 ? true : false	
}


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
	// mark all vertices unvisited:
	for (var i=0; i<this.nv;i++){
		this.vert[i].visit=false;
	}
	
	// traverse a connected component 
	for (var i=0; i<this.nv;i++){
		if(!this.vert[i].visit){
			if(fun==='d'){ // DFS
				this.connectedComp++;
			    this.dfs(i);
			}
			else if(fun==='b'){// BFS
				this.bfs(i);
			}	
		}	
	}
}


//----------------------------------------------------------------------------------


function dfsImpl(v_i)
{
	// process vertex:

	var v=this.vert[v_i];
	v.visit=true;
	this.dfs_push[this.dfs_push.length]=v_i;
	

	// recursively traverse its unvisited adjacent vertices:

	var w=v.adjacentByID();
	var m=w.length;
	for (var i=0;i<m;i++){
		if(!this.vert[w[i]].visit){
			this.dfs(w[i]);
		}		
	}


}

//----------------------------------------------------------------------------------

function bfsImpl(v_i)
{
	// process v (using its id):
	var v = this.vert[v_i];
    v.visit = true; 
    

	// initialize queue with v:
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




//----------------------------------------------------------------------------------

function makeAdjMatrixImpl2()
{
	
	// initially create row elements and zero the adjacncy matrix

    for (var i = 0; i < this.nv; i++)
    {
		var v =this.vert[i];
        this.adjMatrix[i] = []; // create row elements for each vertex
        for (var j = 0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0; //set them all by 0 
        }
    

	
	var adj = v.adjacentByID(); // get edge information in an array
	var temp= v.adjacent.traverse();
	for (var k = 0; k < adj.length; k++)
	{
		if (this.weighted){
		this.adjMatrix[i][adj[k]]= temp[k].weight;
		}else{
		this.adjMatrix[i][adj[k]] =  1;// set 1 for each adjacency 
		  }																		  //or the weight if it's weighted graph
	}

	}
		
		}
			



function adjacentByIdImpl()
{


    var adj = this.adjacent.traverse();
    var adj_id = [];
    for (var i = 0; i < adj.length; i++)
    {
        adj_id[i] = adj[i].target_v;
    }
    return adj_id;
}


// -----------------------------------------------------------------------


function better_input(v,e)
{
	

	// set number of vertices and edges fields
	this.nv = v.length;
	this.ne = e.length;
	
	// input vertices into internal vertex array

	for (var i=0; i<this.nv;i++){
		this.vert[i]=new Vertex(v[i]);
	}
	
    for(var j=0;j<this.ne;j++){
			this.addEdge(e[j].u, e[j].v, e[j].w);
		
		}
		
	// double edge count if graph undirected 
	if (!this.digraph){
		this.ne*=2;
	}
	

}

//----------------------------------------------------------------------------------

function insertAdjacentImpl(e){
	this.adjacent.insert(e);
}

function makeGraphImpl(){
	//later
}

//----------------------------------------------------------------------------------
//new:

function hasPathImpl()
{
	return "";

}

function shortestPathImpl(){
	return "";
}

function isDAGImpl(){
	
	if(this.digraph){
		this.dfsTC();
		for (var i=0;i<this.nv;i++){
			if(this.TC[i][i]===1){ 
				return false; //when TC main diagonal has 1s on it, then it has directed cycle
				
			}
		}
		return true;//does not have directed cycle
	}
	else {
		return false; //not digraph
	}
	
	
}

function dfsTCImpl(){
	var i,j,k
	
	for (i=0;i<this.nv;i++){
		this.TC[i]=[];  // create and init the corresponding row
		
		for(j=0;j<this.nv;j++){
			this.TC[i][j]=0; //set by zero
		}
	}
	
	//mark all vertices unvisited
	for (i=0;i<this.nv;i++){
		for(j=0;j<this.nv;j++){
			this.vert[j].visit=false;
		}
		
		this.dfs(i);
		
		for (k=0;k<this.nv;k++){
			if (this.vert[k].visit &&!(i==k)){
				this.TC[i][k]=1;
			}
		}
	}
	
	for (i=0;i<this.nv;i++){
		for (j=0;j<this.nv;j++){
			if (this.TC[i][j]==1&& this.TC[j][i]==1){
				this.TC[i][i]=1;
			}
		}
	}
	
	return this.TC;
}

function warshallFloydImpl(){
	
	this.makeAdjMatrix();
	this.R = this.adjMatrix;
	for (var k= 0; k < this.nv; k++){
		for (var i= 0; i< this.nv; i++){
			for (var j= 0; j< this.nv; j++){
				if (this.weighted){ //Floyd
					this.R[i][j] = Math.min(this.R[i][j], (this.R[i][k] + this.R[k][j]));
				}
				else if (this.digraph){ //Warshall
					this.R[i][j] = this.R[i][j] | (this.R[i][k] & this.R[k][j]);
				}
				
			}
		}
	}
	return this.R; //return the TC matrix
	
}


