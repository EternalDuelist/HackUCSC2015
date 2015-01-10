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

function parseReqs (p) {
}

function Course (p) {
   this.properties = p.toString();
   this.name = parseName(p).toString();
   this.title = parseTitle(p).toString();
   this.id = parseId(p).toString();
   this.department = parseDepartment(p).toString();
   this.pre_reqs = [];
   this.units = 5;
}

function printCourse (c) {
   if (c != null) {
      var reqs = "";
      console.log(c.properties
                  + "<br>[NAME: " + c.name
                  + "] -- [TITLE: " + c.title
                  + "] -- [ID: " + c.id
                  + "] -- [DEPARTMENT: " + c.department
                  + "]<br>[PRE_REQUISITES: " + reqs
                  + "] <br><br>");
   }
}

function readfile (f1, f2, f3) {
   var all_courses = [], major_courses = [], req_names = [], reqs = [];
   var index = 0;
   // read the file containing all the available courses
   d3.csv (f1, function (error, data) {
      data.forEach (function(d) {
         all_courses[index] = new Course (d.courses);
         index++;
      });
      // read the file containing the courses for the major
      index = 0;
      d3.csv (f2, function (error, data) {
         data.forEach (function(d) {
            major_courses[index] = new Course (d.courses);
            index++;
         });
         // read the file containing the pre-requisites for each course
         index = 0;
         d3.csv (f3, function (error, data) {
            req_names[index] = d.name;
            reqs[index] = d.requisite;
            index++;
         }); // file reading complete

         // creates a collection of courses in the major for further operations
         for (var i = 0; i < major_courses.length; i++) {
            for (var j = 0; j < reqs.length; j++) {
               if (reqname[j] == major_courses[i].name) {
                  k = 0;
                  major_courses[i].pre_reqs[k] = reqs[j];
               }// end if
            }// end for j
         }// end for i

      });// end d3.csv (f2)
   });// end d2.csv (f3)
}

// main function
function main () {
   readfile("courseslist.csv", "testcmpslist.csv", "testcmpsreqlist.csv");
}

// call to main function
main();
