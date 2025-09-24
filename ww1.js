const http = require("http");
const dateEt = require("./src/datetimeET");
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Remo Kurem, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Remo Kurem, veebiprogrammeerimine</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> veebiprogrammeerimise kurusel ja ei oma mõistlikku sisu.</p>\n\t<h2>Väike muudatus</h2>\n\t<hr>';
const pageEnd = '\n</body>\n</html>';

http.createServer(function(req, res){
	//console.log("Laadimine");
	res.writeHead(200, {"Content-type": "text/html"});
	//res.write("Boom! Töötab!");
	res.write(pageStart);
	res.write(pageBody);
	res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate()+ "</p>");
	res.write(pageEnd);
	return res.end();
}).listen(5321);