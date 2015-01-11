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
      for (var x = 0, x < token.length; x++) r[x] = token[x];
   }
}

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
function printCourse (c) {
   if (c != null) {
      var reqs = "";
      for (var i = 0; i < c.pre_reqs.length; i++) {
         if (i != c.pre_reqs.length) reqs += c.pre_reqs[i] + ", ";
         else reqs += c.pre_reqs[i] + " ";
      }
      console.log(c.properties
                  + "<br>[NAME: " + c.name
                  + "] -- [TITLE: " + c.title
                  + "] -- [ID: " + c.id
                  + "] -- [DEPARTMENT: " + c.department
                  + "]<br>[PRE_REQUISITES: " + reqs
                  + "] <br><br>");
   }
}

function readfile (f1, f2) {
   var all_courses = [], req_courses = [], reqs = [];
   var index = 0;

   d3.csv (f1, function (error, data) {
      data.forEach (function(d) {
         all_courses[index] = new Course (d.courses);
         all_courses[index].units = d.units;
         index++;
      });

      index = 0;
      d3.csv (f2, function (error, data) {
         req_courses[index] = d.name;
         reqs[index] = d.requisite;
         index++;
      }); // file reading complete

   });// end d2.csv (f3)
}

// main function
function main () {
   readfile("courseslist.csv", "testcmpsreqlist.csv");
}

// call to main function
main();
