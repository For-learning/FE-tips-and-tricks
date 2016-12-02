 $ = {
     getHTTPObject: function() {
         var A = false;
         if (typeof ActiveXObject != "undefined") {
             try { A = new ActiveXObject("Msxml2.XMLHTTP") } catch (C) {
                 try { A = new ActiveXObject("Microsoft.XMLHTTP") } catch (B) { A = false }
             }
         } else {
             if (window.XMLHttpRequest) {
                 try { A = new XMLHttpRequest() } catch (C) { A = false }
             }
         }
         return A
     },
     load: function(url, callback, format, method, opt) {
         var http = this.init();
         if (!http || !url) {
             return
         }
         if (http.overrideMimeType) { http.overrideMimeType("text/xml") }
         if (!method) { method = "GET" }
         if (!format) { format = "text" }
         if (!opt) { opt = {} }
         format = format.toLowerCase();
         method = method.toUpperCase();
         var now = "uid=" + new Date().getTime();
         url += (url.indexOf("?") + 1) ? "&" : "?";
         url += now;
         var parameters = null;
         if (method == "POST") {
             var parts = url.split("?");
             url = parts[0];
             parameters = parts[1]
         }
         http.open(method, url, true);
         if (method == "POST") { http.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); }
         var ths = this;
         if (opt.handler) { http.onreadystatechange = function() { opt.handler(http) } } else {
             http.onreadystatechange = function() {
                 if (http.readyState == 4) {
                     if (http.status == 200) {
                         var result = "";
                         if (http.responseText) { result = http.responseText }
                         if (format.charAt(0) == "j") {
                             result = result.replace(/[\n\r]/g, "");
                             result = eval("(" + result + ")")
                         } else {
                             if (format.charAt(0) == "x") { result = http.responseXML }
                         }
                         if (callback) { callback(result) }
                     } else {
                         if (opt.loadingIndicator) { document.getElementsByTagName("body")[0].removeChild(opt.loadingIndicator) }
                         if (opt.loading) { document.getElementById(opt.loading).style.display = "none" }
                         if (error) { error(http.status) }
                     }
                 }
             }
         }
         http.send(parameters)
     },
     bind: function(A) {
         var C = { "url": "", "onSuccess": false, "onError": false, "format": "text", "method": "GET", "update": "", "loading": "", "loadingIndicator": "" };
         for (var B in C) {
             if (A[B]) { C[B] = A[B] }
         }
         if (!C.url) {
             return
         }
         var D = false;
         if (C.loadingIndicator) {
             D = document.createElement("div");
             D.setAttribute("style", "position:absolute;top:0px;left:0px;");
             D.setAttribute("class", "loading-indicator");
             D.innerHTML = C.loadingIndicator;
             document.getElementsByTagName("body")[0].appendChild(D);
             this.opt.loadingIndicator = D
         }
         if (C.loading) { document.getElementById(C.loading).style.display = "block" }
         this.load(C.url, function(E) {
             if (C.onSuccess) { C.onSuccess(E) }
             if (C.update) { document.getElementById(C.update).innerHTML = E }
             if (D) { document.getElementsByTagName("body")[0].removeChild(D) }
             if (C.loading) { document.getElementById(C.loading).style.display = "none" }
         }, C.format, C.method, C)
     },
     init: function() {
         return this.getHTTPObject()
     }
 }
