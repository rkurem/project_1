const http = require("http");
const fs = require("fs");
//lisame mooduli, et pärringu URL-i mõista
const url = require("url");
const dateEt = require("./src/datetimeET");
const textRef = "txt/vanasonad.text";
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Remo Kurem, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Remo Kurem, veebiprogrammeerimine</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee">Tallinna ülikoolis</a> veebiprogrammeerimise kurusel ja ei oma mõistlikku sisu.</p>\n\t<p>Algul lihtsalt HTML ja varsti juba Node.Js.</p>\n\t<hr>';
const pageBanner = 'img src="vp_banner_2025_AA';
const pageEnd = '\n</body>\n</html>';


http.createServer(function(req, res){
	//vaatan pärngut (req), mida klient tahab
	console.log("Praegune URL: " + req.url);
	//eraldame (parse) puhta URL-i ilma parameetrite jms kraamita
	let currentUrl = url.parse(req.url, true);
	console.log("Puhas url: " + currentUrl.pathname);
	
	//loon marsruudid erinevate URL-ide jaoks
	
	//avaleht
	if(currentUrl.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageStart);
		res.write(pageBody);
		res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
		res.write('n\t\<p>Vaata ka valikut <a href= "vanasonad">vanasõnu</a>.</p>');
		res.write(pageEnd);
		return res.end();
	}
	
	else if(currentUrl.pathname === "/vanasonad"){
		res.writeHead(200, {"Content-type": "text/html"});
		fs.readFile(textRef, "utf8", (err, data)=>{
			if(err){
				res.write(pageStart);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p><p>Kahjuks tänaseks ühtki vanasõna välja pakkuda pole!</p>");
				res.write(pageEnd);
				return res.end();
			} else {
				let oldWisdomList = data.split(";");
				let folkWisdomOutput = "\n\t<ol>";
				for (let i = 0; i < oldWisdomList.length; i ++){
					folkWisdomOutput += "\n\t\t<li>" + oldWisdomList[i] + "</li>";
				}
				folkWisdomOutput += "\n\t</ol>";
				res.write(pageStart);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
				res.write("\n\t<h2>Valik Eesti vanasõnu</h2>")
				res.write(folkWisdomOutput);
				res.write(pageEnd);
				return res.end();
			}
		});
	}
	
	else {
		res.end("Viga 404, sellist lehte ei ole olemas!");
	}
}).listen(5321);