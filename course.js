// course.js file uses graph.js to build plan

// parse the name for each course
function parseName (p) {
   if (p != null) {
      var token;
      for (var i = 0; i < p.length; i++) {
         if (p.charAt(i) == ":") break;
         else token = p.substring(0, i+1);
      }
      return token;
   }
   else console.log("Invalid String: " + p);
}

// parse the title for each course
function parseTitle (p) {
   if (p != null) {
      var token;
      for (var i = 0; i < p.length; i++) {
         if (p.charAt(i) == ":") token = p.substring(i+2, p.length);
      }
      return token;
   }
   else console.log("Invalid String: " + p);
}

// parse the ID for each course
function parseId (p) {
   if (p != null) {
      var token, m = "", n;
      for (var i = 0; i < p.length; i++) {
         if (p.charAt(i) != ":") {
            if (!isNaN(p.charAt(i))) {
               m += p.charAt(i);
               if (p.charAt(i+1) == ";") n = "";
               else n = p.charAt(i+1);
            }
         }
         else break;
      }
      m = parseInt(m);
      token = m + "" + n;
      return token;
   }
}

// parse department for each course
function parseDepartment (p) {
   if (p != null) {
      var token;
      for (var i = 0; i < p.length; i++) {
         if (isNaN(p.charAt(i))) token = p.substring(0, i+1);
         else break;
      }
      return token;
   }
}

// parse pre-requisites for each course
function parseReqs (r, p) {
   if (p != null) {
      var token = [];
      var index = 0, len = 1, j = 0, k = 0;
      for (var i = 0; i < p.length; i++) if (p.charAt(i) == '&') len++;
      
      for (var i = 0; i < len; i++) {
         while (j < p.length) {
            if (p.charAt(j) == '&') {
               token[i] = p.substring(k, j-1);
               k = j+2;
               j++;
               break;
            }
            j++;
         }
         if (j >= p.length) token[i] = p.substring(k,j);
      }
      for (var x = 0; x < token.length; x++) r[x] = token[x];
   }
}

// Course object
function Course (p) {
   this.properties = p.toString();
   this.name = parseName(p).toString();
   this.title = parseTitle(p).toString();
   this.id = parseId(p).toString();
   this.department = parseDepartment(p).toString();
   this.pre_reqs = [];
   this.units;
}

// printCourse function is for debugging purposes only
// prints entire description for each course based on name, title, id, department, and pre-requisite
function printCourse (c) {
   if (c != null) {
      var reqs = "";
      for (var i = 0; i < c.pre_reqs.length; i++) {
         if (i != c.pre_reqs.length-1) reqs += c.pre_reqs[i] + ", ";
         else reqs += c.pre_reqs[i] + "";
      }
      console.log(c.properties
                  + "\n[NAME: " + c.name
                  + "] -- [TITLE: " + c.title
                  + "] -- [ID: " + c.id
                  + "] -- [DEPARTMENT: " + c.department
                  + "]\n[PRE_REQUISITES: " + reqs
                  + "]\n\n");
   }
}

// sets pre-requisites for graph objects
function setter (name, course, pre_req, h) {
	var requisite = [];
	for (var i = 0; i < name.length; i++) {
		for (var j = 0; j < course.length; j++) {
			if (name[i] == course[j]) {
				parseReqs(requisite, pre_req[i]);
				for (var k = 0; k < requisite.length; k++) {
					hashData(h[name[i]].prereq, k.toString(), h[requisite[k]]);
				}
				requisite = [];
			}
		}
	}
}

function readfile (f1, f2) {
	// all_courses contains all of the courses available
	// req_courses contains the names for each required course in a major
	// reqs contains the pre-requisite for each name in req_courses
   var all_courses = [], req_courses = [], reqs = [];
   var index = 0;
   
   // reading files
   d3.csv (f1, function (error, data) {
      data.forEach (function(d) {
         all_courses[index] = new Course(d.courses);
         index++;
      });

      index = 0;
      d3.csv (f2, function (error, data) {
         data.forEach (function(d) {
            req_courses[index] = d.name;
            reqs[index] = d.requisite;
            index++;
         }); // stop reading files
		 
		 // test major courses
		 major_courses = [];
		 temp = [];
		 for (var i = 0; i < req_courses.length; i++) {
			for (var j = 0; j < all_courses.length; j++) {
				if (req_courses[i] == all_courses[j].name) {
					major_courses[i] = all_courses[j];
					parseReqs(temp, reqs[i]);
					for (var k = 0; k < temp.length; k++) major_courses[i].pre_reqs[k] = temp[k];
					temp = [];
				}
			}
		 }
		 for (var i = 0; i < major_courses.length; i++) printCourse(major_courses[i]);
		 // end test major courses
		 
		 // start building automatic plan
         CMPS = new Graph('CMPS');
         var yearOne = [];
		 console.log(CMPS.name + ' ' + CMPS.value + '<br>');
		 
		 // hash all required courses in the major into hData
         for (var i = 0; i < req_courses.length; i++) {
            hashData (hData, req_courses[i], new Graph(req_courses[i]));
         }

         // sets and hashes pre-requisite for major courses
         var major = [];
         for (var i = 0; i < req_courses.length; i++) {
            if (req_courses[i] == "CMPS") {
               parseReqs(major, reqs[i]);
               for (var j = 0; j < major.length; j++) {
                  hashData(CMPS.prereq, j.toString(), hData[major[j]]);
               }
            }
            else break;
         }
		 
         // sets and hashes pre-requisites for all other courses in major
		 setter (req_courses, major, reqs, hData);
		 
		 // builds quarters using modified post sort algorithm
         yearOne[0] = new Quarter('Fall 2012', 3);
         yearOne[1] = new Quarter('Winter 2013', 3);
         yearOne[2] = new Quarter('Spring 2013', 3);
         dSort(CMPS, yearOne);
		 
		 // printing
		 console.log("\n");
         printHash('', hData);
         printGraph(CMPS);
         printHashPR(hData);
		 console.log("\n");
		 
         for (var i = 0; i < 3; i++) {
            console.log(yearOne[i].name);
            for (var j = 0; j < yearOne[i].courseList.length; j++) {
               console.log("> " + yearOne[i].courseList[j].name);
            }
         }
      });
   });
}

// main function
function main () {
   readfile("courselist.csv", "testcmpsreqlist.csv");
}

// call to main function
main();
