const $output = document.getElementById('output')
const $scoretext = document.getElementById('totalScore')
document.getElementById('file').onchange = function() {
    var file = this.files[0];

    var reader = new FileReader();
    reader.onload = function(progressEvent) {
        const text = this.result;
        // $output.innerText = text;
        
        var lines = text.split('\n');
        let str = ""
        var totalScore = 0
        for (var i = 0; i < lines.length; i++) {
            let line =  lines[i];
            let nums = line.split(' ');
            let p1Move = nums[0];
            let p2Move = nums[1];
            let score = getMatchResult(p1Move, p2Move);
            totalScore += score;
            console.log(`${score} :: ${totalScore}`)
            str += `${line} = ${score}`;
            str += '<br/>';
        }
        $scoretext.innerHTML = `TOTAL SCORE = ${totalScore}<br/><br/>`;
        $output.innerHTML = str;
    }
    reader.readAsText(file);
}

/**
 * A IS ROCK        X IS LOSE
 * B IS PAPER       Y IS DRAW
 * C IS SCISSORS    Z IS WIN
 */
function getMatchResult(p1Move, p2Move) {
    // rock
    if (p1Move === 'A') {
        if (p2Move === 'X') { 
            return 0 + 3;
        } else if (p2Move === 'Y') { 
            return 3 + 1;
        } else { 
            return 6 + 2;
        }
    } else if (p1Move === 'B') { // paper
        if (p2Move === 'X') { 
            return 0 + 1;
        } else if (p2Move === 'Y') { 
            return 3 + 2;
        } else { 
            return 6 + 3;
        }
    } else { // scissors
        if (p2Move === 'X') { 
            return 0 + 2;
        } else if (p2Move === 'Y') { 
            return 3 + 3;
        } else { 
            return 6 + 1;
        }
    }
}