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
}`
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
}`
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
}`
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
}`
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
}`
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
}`
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
}`
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
}`
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
}`
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
}`
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
}`
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
}`
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
}`
    }
];