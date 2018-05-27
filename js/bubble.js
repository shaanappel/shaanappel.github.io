function getNameNodes(name, width, height) {
    var nodes = [];
    var offset = 0;
 
    function addLetter(cc_hex, ix) {
        scale_fac = 2.0;
 
        if (document.alphabet.hasOwnProperty(cc_hex)) {
            var chr_data = document.alphabet[cc_hex].P;
 
            for (var i = 0; i < chr_data.length; ++i) {
                point = chr_data[i];
                node = {
                    x: (point[0] + offset)*scale_fac,
                    y: point[1]*scale_fac,
                    r: point[2]*scale_fac
                }
                node2 = Object.assign({}, node);
                node2.r = 0;
                node2.fixed = true;
                nodes.push(node);
                nodes.push(node2);
            }
            offset += document.alphabet[cc_hex].W;
        }
    }
 
    var hexphrase = phraseToHex(name);
 
    var col_ix = -1;
    for (var i = 0; i < hexphrase.length; i += 2) {
        var cc_hex = "A" + hexphrase.charAt(i) + hexphrase.charAt(i + 1);
        if (cc_hex != "A20") {
            col_ix++;
        }
        addLetter(cc_hex, col_ix);
    }
 
    for (var j = 0; j < nodes.length; j++) {
        nodes[j].x = (width / 2 - offset*scale_fac / 2) + nodes[j].x;
        nodes[j].y = (height / 2 - 105*scale_fac) + nodes[j].y;
    }

    return nodes;
}
 
function phraseToHex(phrase) {
    var hexphrase = "";
    for (var i = 0; i < phrase.length; i++) {
        hexphrase += phrase.charCodeAt(i).toString(16);
    }
    return hexphrase;
}

function distance(a,b) {
    return Math.sqrt( Math.pow(a[0]-b[0], 2) + Math.pow(a[1]-b[1], 2) )
}