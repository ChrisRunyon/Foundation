!function($){function code(s,discard,alpha,beta,w1,w2){s=String(s);for(var buffer=0,i=0,length=s.length,result="",bitsInBuffer=0;i<length;){var c=s.charCodeAt(i);for(c=c<256?alpha[c]:-1,buffer=(buffer<<w1)+c,bitsInBuffer+=w1;bitsInBuffer>=w2;){bitsInBuffer-=w2;var tmp=buffer>>bitsInBuffer;result+=beta.charAt(tmp),buffer^=tmp<<bitsInBuffer}++i}return!discard&&bitsInBuffer>0&&(result+=beta.charAt(buffer<<w2-bitsInBuffer)),result}for(var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a256="",r64=[256],r256=[256],i=0,UTF8={encode:function(strUni){var strUtf=strUni.replace(/[\u0080-\u07ff]/g,function(c){var cc=c.charCodeAt(0);return String.fromCharCode(192|cc>>6,128|63&cc)}).replace(/[\u0800-\uffff]/g,function(c){var cc=c.charCodeAt(0);return String.fromCharCode(224|cc>>12,128|cc>>6&63,128|63&cc)});return strUtf},decode:function(strUtf){var strUni=strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(c){var cc=(15&c.charCodeAt(0))<<12|(63&c.charCodeAt(1))<<6|63&c.charCodeAt(2);return String.fromCharCode(cc)}).replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(c){var cc=(31&c.charCodeAt(0))<<6|63&c.charCodeAt(1);return String.fromCharCode(cc)});return strUni}};i<256;){var c=String.fromCharCode(i);a256+=c,r256[i]=i,r64[i]=b64.indexOf(c),++i}var Plugin=$.base64=function(dir,input,encode){return input?Plugin[dir](input,encode):dir?null:this};Plugin.btoa=Plugin.encode=function(plain,utf8encode){return plain=Plugin.raw===!1||Plugin.utf8encode||utf8encode?UTF8.encode(plain):plain,plain=code(plain,!1,r256,b64,8,6),plain+"====".slice(plain.length%4||4)},Plugin.atob=Plugin.decode=function(coded,utf8decode){coded=coded.replace(/[^A-Za-z0-9\+\/\=]/g,""),coded=String(coded).split("=");var i=coded.length;do--i,coded[i]=code(coded[i],!0,r64,a256,6,8);while(i>0);return coded=coded.join(""),Plugin.raw===!1||Plugin.utf8decode||utf8decode?UTF8.decode(coded):coded}}(jQuery);