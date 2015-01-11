/* GLOBAL VARIABLES */
var CMPS;
var hData = new Object();
/* END */
function Graph(name) {
   this.name = name;
   this.value = 0;
   this.quarter = 0;
   this.prereq = new Object();
}

function Quarter(name, capacity) {
   this.name = name;
   this.capacity = capacity;
   this.courses = 0;
   this.courseList = [];
}

function hashData(hash, name, data) {
   hash[name] = data;
}

function printHash(prefix,hash) {
   for (var node in hash) {
      if (hash.hasOwnProperty(node)) {
         console.log(prefix + 'key is: ' + hash[node].name + ', Quarter is: ' + hash[node].quarter + '<br>');
      }
   }
}

function printGraph(graph) {
console.log("\n");
   console.log('<br>' + graph.name + ' has prerequisites:<br>');
   printHash('> ', graph.prereq)
}

function printHashPR(hash) {
   for (var node in hash) {
      if (hash.hasOwnProperty(node)) {
         printGraph(hash[node]);
      }
   }
}

function insertClass(graph, schedule) {
   if (graph.quarter < schedule.length) {
      schedule[graph.quarter].courseList.push(graph);
   }
}

function dSort(graph, schedule) {
   for (var node in graph.prereq) {
      if (graph.prereq.hasOwnProperty(node)) {
         var temp = dSort(graph.prereq[node], schedule);
         if (temp > graph.quarter) {
            graph.quarter = temp;
         }
      }
   }

   if (graph.value == 0) {
      console.log(graph.name + " ");
      insertClass(graph, schedule);
      graph.value = 1;
      return graph.quarter + 1;
   }
}
