const ADA_PROGRAMS = [
    {
        title: "1. Kruskal's Algorithm",
        code: `// Program 1: Minimum Cost Spanning Tree using Kruskal's algorithm
#include<stdio.h>
int ne=1,min_cost=0;
void main() {
    int n,i,j,min,a,u,b,v,cost[20][20],parent[20];
    printf("Enter the no. of vertices:");
    scanf("%d",&n);
    printf("\\nEnter the cost matrix:\\n");
    for(i=1;i<=n;i++)
        for(j=1;j<=n;j++)
            scanf("%d",&cost[i][j]);
    for(i=1;i<=n;i++) parent[i]=0;
    
    printf("\\nThe edges of spanning tree are\\n");
    while(ne<n) {
        min=999;
        for(i=1;i<=n;i++) {
            for(j=1;j<=n;j++) {
                if(cost[i][j]<min) {
                    min=cost[i][j]; a=u=i; b=v=j;
                }
            }
        }
        while(parent[u]) u=parent[u];
        while(parent[v]) v=parent[v];
        if(u!=v) {
            printf("Edge %d\\t(%d->%d)=%d\\n",ne++,a,b,min);
            min_cost=min_cost+min;
            parent[v]=u;
        }
        cost[a][b]=cost[b][a]=999;
    }
    printf("\\nMinimum cost=%d\\n",min_cost);
}`,
        manualSteps: `**How to solve manually:**\n1. List all edges in the graph and sort them in ascending order of their weights.\n2. Pick the edge with the smallest weight.\n3. Check if adding this edge forms a cycle with the edges already selected. (If it connects two nodes already in the same set, it forms a cycle).\n4. If no cycle is formed, include it in the spanning tree.\n5. Repeat steps 2-4 until you have exactly (V - 1) edges in the tree (where V is the number of vertices).`,
        ioData: `**Expected Input & Output:**\nEnter the no. of vertices: 4\nEnter the cost matrix:\n0 2 999 6\n2 0 3 8\n999 3 0 5\n6 8 5 0\n\nThe edges of spanning tree are:\nEdge 1  (1->2)=2\nEdge 2  (2->3)=3\nEdge 3  (3->4)=5\n\nMinimum cost=10`
    },
    {
        title: "2. Prim's Algorithm",
        code: `// Program 2: Minimum Cost Spanning Tree using Prim's algorithm
#include<stdio.h>
int a,b,u,v,n,i,j,ne=1;
int visited[10]={0},min,mincost=0,cost[10][10];
void main() {
    printf("\\n Enter the number of nodes:");
    scanf("%d",&n);
    printf("\\n Enter the adjacency matrix:\\n");
    for(i=1;i<=n;i++)
        for(j=1;j<=n;j++) {
            scanf("%d",&cost[i][j]);
            if(cost[i][j]==0)
                cost[i][j]=999;
        }
    visited[1]=1;
    printf("\\n");
    while(ne<n) {
        for(i=1,min=999;i<=n;i++)
            for(j=1;j<=n;j++)
                if(cost[i][j]<min)
                    if(visited[i]!=0) {
                        min=cost[i][j]; a=u=i; b=v=j;
                    }
        if(visited[u]==0 || visited[v]==0) {
            printf("\\n Edge %d:(%d %d) cost:%d",ne++,a,b,min);
            mincost+=min;
            visited[b]=1;
        }
        cost[a][b]=cost[b][a]=999;
    }
    printf("\\n Minimun cost=%d",mincost);
}`,
        manualSteps: `**How to solve manually:**\n1. Start with any random vertex (usually vertex 1) and mark it as visited.\n2. Look at all edges connecting the currently visited vertices to unvisited vertices.\n3. Pick the edge with the minimum weight and add the new vertex to the visited set.\n4. Repeat steps 2-3 until all vertices are visited (i.e., you have V-1 edges).\n5. The sum of the selected edges is the minimum cost.`,
        ioData: `**Expected Input & Output:**\nEnter the number of nodes: 4\nEnter the adjacency matrix:\n0 2 999 6\n2 0 3 8\n999 3 0 5\n6 8 5 0\n\nEdge 1:(1 2) cost:2\nEdge 2:(2 3) cost:3\nEdge 3:(3 4) cost:5\n\nMinimum cost=10`
    },
    {
        title: "3a. Floyd's Algorithm",
        code: `// Program 3a: All-Pairs Shortest Paths problem using Floyd's algorithm
#include <stdio.h>
#include <limits.h>
#define V 4
void floydWarshall(int graph[V][V]) {
    int dist[V][V];
    for (int i = 0; i < V; i++)
        for (int j = 0; j < V; j++)
            dist[i][j] = graph[i][j];
            
    for (int k = 0; k < V; k++)
        for (int i = 0; i < V; i++)
            for (int j = 0; j < V; j++)
                if (dist[i][k] != INT_MAX && dist[k][j] != INT_MAX && dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
                    
    printf("Shortest distances between every pair of vertices:\\n");
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (dist[i][j] == INT_MAX)
                printf("INF\\t");
            else
                printf("%d\\t", dist[i][j]);
        }
        printf("\\n");
    }
}
int main() {
    int graph[V][V] = {
        {0, INT_MAX, 3, INT_MAX},
        {2, 0, INT_MAX, INT_MAX},
        {INT_MAX, 7, 0, 1},
        {6, INT_MAX, INT_MAX, 0}
    };
    floydWarshall(graph);
    return 0;
}`,
        manualSteps: `**How to solve manually:**\n1. Create an initial matrix (D0) representing the direct distances between nodes. Use infinity (INF) for non-adjacent nodes.\n2. Iterate through each vertex k (from 1 to V). k acts as an intermediate node.\n3. For each matrix D(k), update the distance between every pair (i, j) using the formula:\n   D(i, j) = min( D(i, j), D(i, k) + D(k, j) )\n4. The final matrix D(V) contains the shortest paths between all pairs of vertices.`,
        ioData: `**Expected Output (Hardcoded Input):**\nShortest distances between every pair of vertices:\n0       9       3       4\n2       0       5       6\n7       7       0       1\n6       15      9       0`
    },
    {
        title: "3b. Warshall's Algorithm",
        code: `// Program 3b: Transitive closure using Warshall's algorithm
#include <stdio.h>
int n,a[10][10],p[10][10];
void path() {
    int i,j,k;
    for(i=0;i<n;i++)
        for(j=0;j<n;j++)
            p[i][j]=a[i][j];
            
    for(k=0;k<n;k++)
        for(i=0;i<n;i++)
            for(j=0;j<n;j++)
                if(p[i][k]==1 && p[k][j]==1)
                    p[i][j]=1;
}
void main() {
    int i,j;
    printf("Enter the number of nodes:");
    scanf("%d",&n);
    printf("\\nEnter the adjacency matrix:\\n");
    for(i=0;i<n;i++)
        for(j=0;j<n;j++)
            scanf("%d",&a[i][j]);
            
    path();
    printf("\\nThe path matrix is shown below\\n");
    for(i=0;i<n;i++) {
        for(j=0;j<n;j++)
            printf("%d ",p[i][j]);
        printf("\\n");
    }
}`,
        manualSteps: `**How to solve manually:**\n1. Create the initial boolean adjacency matrix R(0). If there is an edge from i to j, put 1, else 0.\n2. For each intermediate node k (from 1 to V), update the matrix.\n3. The rule is: R(i, j) becomes 1 if it was already 1, OR if both R(i, k) is 1 AND R(k, j) is 1.\n4. R(V) is the Transitive Closure (path matrix), showing if a path exists between any two nodes.`,
        ioData: `**Expected Input & Output:**\nEnter the number of nodes: 4\nEnter the adjacency matrix:\n0 1 0 0\n0 0 0 1\n0 0 0 0\n1 0 1 0\n\nThe path matrix is shown below\n1 1 1 1\n1 1 1 1\n0 0 0 0\n1 1 1 1`
    },
    {
        title: "4. Dijkstra's Algorithm",
        code: `// Program 4: Shortest paths using Dijkstra's algorithm
#include<stdio.h>
void dij(int, int [20][20], int [20], int [20], int);
void main() {
    int i, j, n, visited[20], source, cost[20][20], d[20];
    printf("Enter no. of vertices: ");
    scanf("%d", &n);
    printf("Enter the cost adjacency matrix\\n");
    for (i = 1; i <= n; i++) {
        for (j = 1; j <= n; j++) {
            scanf("%d", &cost[i][j]);
        }
    }
    printf("\\nEnter the source node: ");
    scanf("%d", &source);
    dij(source, cost, visited, d, n);
    for (i = 1; i <= n; i++) {
        if (i != source)
            printf("\\nShortest path from %d to %d is %d", source, i, d[i]);
    }
}
void dij(int source, int cost[20][20], int visited[20], int d[20], int n) {
    int i, j, min, u, w;
    for (i = 1; i <= n; i++) {
        visited[i] = 0;
        d[i] = cost[source][i];
    }
    visited[source] = 1;
    d[source] = 0;
    
    for (j = 2; j <= n; j++) {
        min = 999;
        for (i = 1; i <= n; i++) {
            if (!visited[i]) {
                if (d[i] < min) {
                    min = d[i]; u = i;
                }
            }
        }
        visited[u] = 1;
        for (w = 1; w <= n; w++) {
            if (cost[u][w] != 999 && visited[w] == 0) {
                if (d[w] > cost[u][w] + d[u])
                    d[w] = cost[u][w] + d[u];
            }
        }
    }
}`,
        manualSteps: `**How to solve manually:**\n1. Mark the source node distance as 0 and all other nodes as Infinity.\n2. Create an empty set of visited nodes.\n3. Pick the unvisited node with the smallest known distance (initially, the source).\n4. For the current node, examine all unvisited neighbors. Calculate their distance through the current node.\n5. If the newly calculated distance is smaller than the previously known distance, update it.\n6. Mark the current node as visited. Repeat until all nodes are visited.`,
        ioData: `**Expected Input & Output:**\nEnter no. of vertices: 5\nEnter the cost adjacency matrix\n0 3 999 7 999\n3 0 4 2 999\n999 4 0 5 6\n7 2 5 0 4\n999 999 6 4 0\nEnter the source node: 1\n\nShortest path from 1 to 2 is 3\nShortest path from 1 to 3 is 7\nShortest path from 1 to 4 is 5\nShortest path from 1 to 5 is 9`
    },
    {
        title: "5. Topological Ordering",
        code: `// Program 5: Topological ordering of vertices in a given digraph
#include<stdio.h>
void findindegree(int [10][10],int[10],int);
void topological(int,int [10][10]);
void main() {
    int a[10][10],i,j,n;
    printf("Enter the number of nodes:");
    scanf("%d",&n);
    printf("\\nEnter the adjacency matrix\\n");
    for(i=1;i<=n;i++)
        for(j=1;j<=n;j++)
            scanf("%d",&a[i][j]);
            
    printf("\\nThe adjacency matirx is:\\n");
    for(i=1;i<=n;i++) {
        for(j=1;j<=n;j++) {
            printf("%d\\t",a[i][j]);
        }
        printf("\\n");
    }
    topological(n,a);
}
void findindegree(int a[10][10],int indegree[10],int n) {
    int i,j,sum;
    for(j=1;j<=n;j++) {
        sum=0;
        for(i=1;i<=n;i++) {
            sum=sum+a[i][j];
        }
        indegree[j]=sum;
    }
}
void topological(int n,int a[10][10]) {
    int k,top,t[100],i,stack[20],u,v,indegree[20];
    k=1; top=-1;
    findindegree(a,indegree,n);
    
    for(i=1;i<=n;i++) {
        if(indegree[i]==0) {
            stack[++top]=i;
        }
    }
    while(top!=-1) {
        u=stack[top--];
        t[k++]=u;
        for(v=1;v<=n;v++) {
            if(a[u][v]==1) {
                indegree[v]--;
                if(indegree[v]==0) {
                    stack[++top]=v;
                }
            }
        }
    }
    printf("\\nTopological sequence is\\n");
    for(i=1;i<=n;i++)
        printf("%d\\t",t[i]);
}`,
        manualSteps: `**How to solve manually (Source Removal Method):**\n1. Calculate the in-degree (number of incoming edges) for all vertices.\n2. Find a vertex with an in-degree of 0 (no dependencies) and output it.\n3. Remove this vertex from the graph along with all its outgoing edges. This will decrease the in-degree of its neighbor vertices by 1.\n4. Repeat steps 2 and 3 until the graph is empty.`,
        ioData: `**Expected Input & Output:**\nEnter the number of nodes: 5\nEnter the adjacency matrix\n0 0 1 0 0\n0 0 1 0 0\n0 0 0 1 1\n0 0 0 0 1\n0 0 0 0 0\n\nThe adjacency matirx is:\n0 0 1 0 0 \n0 0 1 0 0 \n0 0 0 1 1 \n0 0 0 0 1 \n0 0 0 0 0 \n\nTopological sequence is\n2 1 3 4 5`
    },
    {
        title: "6. 0/1 Knapsack (Dynamic Prog.)",
        code: `// Program 6: 0/1 Knapsack problem using Dynamic Programming
#include<stdio.h>
#define MAX 50
int p[MAX],w[MAX],n;
int knapsack(int,int);
int max(int,int);
void main() {
    int m,i,optsoln;
    printf("Enter no. of objects: ");
    scanf("%d",&n);
    printf("\\nEnter the weights:\\n");
    for(i=1;i<=n;i++) scanf("%d",&w[i]);
    printf("\\nEnter the profits:\\n");
    for(i=1;i<=n;i++) scanf("%d",&p[i]);
    printf("\\nEnter the knapsack capacity:");
    scanf("%d",&m);
    
    optsoln=knapsack(1,m);
    printf("\\nThe optimal soluntion is:%d",optsoln);
}
int knapsack(int i,int m) {
    if(i==n)
        return (w[n]>m) ? 0 : p[n];
    if(w[i]>m)
        return knapsack(i+1,m);
    return max(knapsack(i+1,m),knapsack(i+1,m-w[i])+p[i]);
}
int max(int a,int b) {
    if(a>b) return a; else return b;
}`,
        manualSteps: `**How to solve manually:**\n1. Create a table V of size (n+1) x (W+1) where n is objects and W is total capacity.\n2. Initialize row 0 and column 0 to zeros.\n3. For each object i and capacity w:\n   a) If the object's weight is > w, copy the value from above: V[i][w] = V[i-1][w].\n   b) Otherwise, take the MAX of: (Not including it: V[i-1][w]) OR (Including it: Profit[i] + V[i-1][w - Weight[i]]).\n4. The bottom right cell V[n][W] is the maximum profit.`,
        ioData: `**Expected Input & Output:**\nEnter no. of objects: 4\nEnter the weights:\n2 1 3 2\nEnter the profits:\n12 10 20 15\nEnter the knapsack capacity: 5\n\nThe optimal soluntion is: 37`
    },
    {
        title: "7. Greedy Knapsack",
        code: `// Program 7: Knapsack problems using greedy approximation
#include <stdio.h>
#include <stdlib.h>
// Function to find the maximum of two integers
int max(int a, int b) {
    return (a > b) ? a : b;
}
// Function to solve the knapsack problem using dynamic programming
void knapsack(int n, int c, int p[], int w[]) {
    int v[n+1][c+1];
    // Build the DP table in bottom-up manner
    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= c; j++) {
            if (i == 0 || j == 0) {
                v[i][j] = 0;
            } else if (w[i-1] <= j) {
                v[i][j] = max(v[i-1][j], p[i-1] + v[i-1][j-w[i-1]]);
            } else {
                v[i][j] = v[i-1][j];
            }
        }
    }
    // Print the optimal solution
    printf("Optimal Solution: %d\\n", v[n][c]);
    // Print the items included in the knapsack
    printf("The objects picked up into the knapsack are: ");
    int i = n, j = c;
    while (i > 0) {
        if (v[i][j] != v[i-1][j]) {
            printf("%d ", i);
            j -= w[i-1];
        }
        i--;
    }
    printf("\\n");
}
int main() {
    int n, c;
    // Input for number of objects
    printf("Enter the number of objects: ");
    scanf("%d", &n);
    if (n <= 0) {
        printf("The number of objects must be a positive integer.\\n");
        return 1;
    }
    // Input for knapsack capacity
    printf("Enter the capacity of the knapsack: ");
    scanf("%d", &c);
    if (c <= 0) {
        printf("The capacity of the knapsack must be a positive integer.\\n");
        return 1;
    }
    int p[n], w[n];
    // Input for profits
    printf("Enter the profit for each of the %d objects: \\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &p[i]);
        if (p[i] < 0) {
            printf("Profit must be a non-negative integer.\\n");
            return 1;
        }
    }
    // Input for weights
    printf("Enter the weight for each of the %d objects: \\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &w[i]);
        if (w[i] < 0) {
            printf("Weight must be a non-negative integer.\\n");
            return 1;
        }
    }
    // Solve the knapsack problem
    knapsack(n, c, p, w);
    return 0;
}`,
        manualSteps: `**How to solve manually (Fractional/Greedy):**\n1. Calculate the Profit-to-Weight ratio (P/W) for all objects.\n2. Sort the objects in descending order of their P/W ratio.\n3. Add objects sequentially to the knapsack until it is full.\n4. If the next object cannot fit entirely, take a fraction of it that fills the remaining capacity.\n*(Note: The provided C code actually performs 0/1 DP reconstruction. Follow your lab instructor's exact code).*`,
        ioData: `**Expected Input & Output:**\nEnter the number of objects: 3\nEnter the capacity of the knapsack: 20\nEnter the profit for each of the 3 objects:\n25 24 15\nEnter the weight for each of the 3 objects:\n18 15 10\n\nOptimal Solution: 39\nThe objects picked up into the knapsack are: 3 2`
    },
    {
        title: "8. Subset Sum (Backtracking)",
        code: `// Program 8: Subset sum equal to a given positive integer d
#include<stdio.h>
void subset(int,int,int);
int x[10],w[10],d,count=0;
void main() {
    int i,n,sum=0;
    printf("Enter the no. of elements: ");
    scanf("%d",&n);
    printf("\\nEnter the elements in ascending order:\\n");
    for(i=0;i<n;i++) scanf("%d",&w[i]);
    printf("\\nEnter the sum: ");
    scanf("%d",&d);
    
    for(i=0;i<n;i++) sum=sum+w[i];
    
    if(sum<d) {
        printf("No solution\\n");
        return;
    }
    subset(0,0,sum);
    if(count==0) {
        printf("No solution\\n");
        return;
    }
}
void subset(int cs,int k,int r) {
    int i;
    x[k]=1;
    if(cs+w[k]==d) {
        printf("\\n\\nSubset %d\\n",++count);
        for(i=0;i<=k;i++)
            if(x[i]==1) printf("%d\\t",w[i]);
    }
    else if(cs+w[k]+w[k+1]<=d)
        subset(cs+w[k],k+1,r-w[k]);
        
    if(cs+r-w[k]>=d && cs+w[k]<=d) {
        x[k]=0;
        subset(cs,k+1,r-w[k]);
    }
}`,
        manualSteps: `**How to solve manually:**\n1. Sort the given set of numbers in ascending order.\n2. Create a state-space tree. Start with an empty subset.\n3. For each number, branch out in two ways: INCLUDE the number, or EXCLUDE the number.\n4. Keep a running total of the current subset sum. Also, keep track of the remaining possible sum from unused numbers.\n5. Backtrack (prune the tree) if the current sum exceeds the target, OR if the current sum + remaining total is less than the target.\n6. Print the subset when the current sum equals the target.`,
        ioData: `**Expected Input & Output:**\nEnter the no. of elements: 5\nEnter the elements in ascending order:\n1 2 5 6 8\nEnter the sum: 9\n\nSubset 1\n1       2       6\n\nSubset 2\n1       8`
    },
    {
        title: "9. Selection Sort",
        code: `// Program 9: Selection Sort method and compute its time complexity
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
// Function to perform selection sort
void selectionSort(int arr[], int n) {
    int i, j, minIndex, temp;
    for (i = 0; i < n - 1; i++) {
        minIndex = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swap the found minimum element with the first element
        temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
}
// Function to generate random numbers between 0 and 999
int generateRandomNumber() {
    return rand() % 1000;
}
int main() {
    int n;
    printf("enter size of array: ");
    scanf("%d",&n);
    // Allocate memory for the array
    int* arr = (int*)malloc(n * sizeof(int));
    
    srand(time(NULL));
    printf("Random numbers for n = %d:\\n", n);
    for (int i = 0; i < n; i++) {
        arr[i] = generateRandomNumber();
        printf("%d ", arr[i]);
    }
    printf("\\n");
    // Record the start time
    clock_t start = clock();
    // Perform selection sort
    selectionSort(arr, n);
    // Record the end time
    clock_t end = clock();
    // Calculate the time taken for sorting
    double time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;
    // Output the time taken to sort for the current value of n
    printf("\\nTime taken to sort for n = %d: %lf seconds\\n\\n", n, time_taken);
    // Display sorted numbers
    printf("Sorted numbers for n = %d:\\n", n);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n\\n");
    // Free the dynamically allocated memory
    free(arr);
    return 0;
}`,
        manualSteps: `**How to solve manually:**\n1. Divide the array into a "sorted" part (left) and an "unsorted" part (right). Initially, sorted is empty.\n2. Scan the unsorted part to find the smallest number.\n3. Swap this smallest number with the first number of the unsorted part.\n4. Move the boundary of the sorted part one element to the right.\n5. Repeat until the unsorted part is empty.`,
        ioData: `**Expected Input & Output:**\nenter size of array: 5\nRandom numbers for n = 5:\n843 219 900 12 450 \n\nTime taken to sort for n = 5: 0.000001 seconds\n\nSorted numbers for n = 5:\n12 219 450 843 900`
    },
    {
        title: "10. Quick Sort",
        code: `// Program 10: Quick Sort method and compute its time complexity
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
// Function to swap two elements
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
// Function to partition the array and return the pivot index
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}
// Function to perform Quick Sort
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
// Function to generate random numbers between 0 and 999
int generateRandomNumber() {
    return rand() % 1000;
}
int main() {
    int n;
    printf("enter size of array: ");
    scanf("%d",&n);
    // Allocate memory for the array
    int* arr = (int*)malloc(n * sizeof(int));
    srand(time(NULL));
    printf("Random numbers for n = %d:\\n", n);
    for (int i = 0; i < n; i++) {
        arr[i] = generateRandomNumber();
        printf("%d ", arr[i]);
    }
    printf("\\n");
    // Record the start time
    clock_t start = clock();
    // Perform quick sort
    quickSort(arr, 0, n - 1);
    // Record the end time
    clock_t end = clock();
    // Calculate the time taken for sorting
    double time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;
    // Output the time taken to sort for the current value of n
    printf("\\nTime taken to sort for n = %d: %lf seconds\\n\\n", n, time_taken);
    // Display sorted numbers
    printf("Sorted numbers for n = %d:\\n", n);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n\\n");
    // Free the dynamically allocated memory
    free(arr);
    return 0;
}`,
        manualSteps: `**How to solve manually:**\n1. Pick an element as a pivot (usually the first, last, or middle element).\n2. Reorder the array so that all elements smaller than the pivot come before it, and all elements greater come after it (this is partitioning).\n3. After partitioning, the pivot is in its final sorted position.\n4. Recursively apply the above steps to the sub-array of smaller elements and the sub-array of greater elements.`,
        ioData: `**Expected Input & Output:**\nenter size of array: 5\nRandom numbers for n = 5:\n672 105 889 33 501 \n\nTime taken to sort for n = 5: 0.000001 seconds\n\nSorted numbers for n = 5:\n33 105 501 672 889`
    },
    {
        title: "11. Merge Sort",
        code: `// Program 11: Merge Sort method and compute its time complexity
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
// Merge two subarrays of arr[]
void merge(int arr[], int l, int m, int r) {
    int i, j, k;
    int n1 = m - l + 1;
    int n2 = r - m;
    // Create temporary arrays
    int L[n1], R[n2];
    // Copy data to temporary arrays L[] and R[]
    for (i = 0; i < n1; i++) L[i] = arr[l + i];
    for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    
    // Merge the temporary arrays back into arr[l..r]
    i = 0; j = 0; k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i]; i++;
        } else {
            arr[k] = R[j]; j++;
        }
        k++;
    }
    // Copy the remaining elements of L[], if there are any
    while (i < n1) {
        arr[k] = L[i]; i++; k++;
    }
    //Copy the remaining elements of R[], if there are any
    while (j < n2) {
        arr[k] = R[j]; j++; k++;
    }
}
// Merge sort function
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        // Same as (l+r)/2, but avoids overflow for large l and r
        int m = l + (r - l) / 2;
        // Sort first and second halves
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        // Merge the sorted halves
        merge(arr, l, m, r);
    }
}
// Function to generate random numbers between 0 and 999
int generateRandomNumber() {
    return rand() % 1000;
}
int main() {
    int n = 6000;
    printf("enter size of array: ");
    scanf("%d",&n);
    // Allocate memory for the array
    int* arr = (int*)malloc(n * sizeof(int));
    srand(time(NULL));
    printf("Random numbers for n = %d:\\n", n);
    for (int i = 0; i < n; i++) {
        arr[i] = generateRandomNumber();
        printf("%d ", arr[i]);
    }
    printf("\\n");
    // Record the start time
    clock_t start = clock();
    // Perform merge sort
    mergeSort(arr, 0, n - 1);
    // Record the end time
    clock_t end = clock();
    // Calculate the time taken for sorting
    double time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;
    
    printf("\\nTime taken to sort for n = %d: %lf seconds\\n\\n", n, time_taken);
    // Display sorted numbers
    printf("Sorted numbers for n = %d:\\n", n);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n\\n");
    // Free the dynamically allocated memory
    free(arr);
    return 0;
}`,
        manualSteps: `**How to solve manually:**\n1. Divide the unsorted array down the middle into two halves.\n2. Keep dividing the sub-arrays until each sub-array has only 1 element (an array of 1 element is inherently sorted).\n3. Merge the single elements back together in pairs, comparing them to ensure they are sorted.\n4. Keep merging the sorted sub-arrays until you are left with one completely sorted array.`,
        ioData: `**Expected Input & Output:**\nenter size of array: 5\nRandom numbers for n = 5:\n991 22 45 611 120\n\nTime taken to sort for n = 5: 0.000001 seconds\n\nSorted numbers for n = 5:\n22 45 120 611 991`
    },
    {
        title: "12. N-Queen's Problem",
        code: `// Program 12: N Queen's problem using Backtracking
#define N 4
#include <stdbool.h>
#include <stdio.h>
// A utility function to print solution
void printSolution(int board[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            if(board[i][j])
                printf("Q ");
            else
                printf(". ");
        }
        printf("\\n");
    }
}
// A utility function to check if a queen can be placed on board[row][col].
bool isSafe(int board[N][N], int row, int col) {
    int i, j;
    // Check this row on left side
    for (i = 0; i < col; i++)
        if (board[row][i]) return false;
    // Check upper diagonal on left side
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j]) return false;
    // Check lower diagonal on left side
    for (i = row, j = col; j >= 0 && i < N; i++, j--)
        if (board[i][j]) return false;
    return true;
}
// A recursive utility function to solve N Queen problem
bool solveNQUtil(int board[N][N], int col) {
    // Base case: If all queens are placed then return true
    if (col >= N) return true;
    
    // Consider this column and try placing this queen in all rows one by one
    for (int i = 0; i < N; i++) {
        if (isSafe(board, i, col)) {
            // Place this queen in board[i][col]
            board[i][col] = 1;
            // Recur to place rest of the queens
            if (solveNQUtil(board, col + 1)) return true;
            // If placing queen in board[i][col] doesn't lead to a solution, 
            // then remove queen from board[i][col]
            board[i][col] = 0; // BACKTRACK
        }
    }
    // If the queen cannot be placed in any row in this column col then return false
    return false;
}
// This function solves the N Queen problem using Backtracking.
bool solveNQ() {
    int board[N][N] = {
        { 0, 0, 0, 0 },
        { 0, 0, 0, 0 },
        { 0, 0, 0, 0 },
        { 0, 0, 0, 0 }
    };
    if (solveNQUtil(board, 0) == false) {
        printf("Solution does not exist");
        return false;
    }
    printSolution(board);
    return true;
}
// Driver program to test above function
int main() {
    solveNQ();
    return 0;
}`,
        manualSteps: `**How to solve manually:**\n1. Place the first queen in the first row, first column.\n2. Move to the next column and try to place the second queen in the first row.\n3. Check if it is safe (no other queen in the same row, column, or diagonal). If not safe, try the next row down.\n4. If you reach a column where no row is safe, BACKTRACK to the previous column and move that queen down one row.\n5. Repeat until N queens are placed safely.`,
        ioData: `**Expected Output (Hardcoded N=4):**\n. . Q .\nQ . . .\n. . . Q\n. Q . .`
    }
];