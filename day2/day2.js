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
 * A IS ROCK        X IS ROCK
 * B IS PAPER       Y IS PAPER
 * C IS SCISSORS    Z IS SCISSORS
 */
function getMatchResult(p1Move, p2Move) {
    // rock
    if (p1Move === 'A') {
        if (p2Move === 'X') { // rock, rock tie
            return 3 + 1;
        } else if (p2Move === 'Y') { // rock, paper win
            return 6 + 2;
        } else { // rock, scissors lose
            return 0 + 3;
        }
    } else if (p1Move === 'B') { // paper
        if (p2Move === 'X') { // paper, rock lose
            return 0 + 1;
        } else if (p2Move === 'Y') { // paper, paper tie
            return 3 + 2;
        } else { // paper, scissors win
            return 6 + 3;
        }
    } else { // scissors
        if (p2Move === 'X') { // scissors, rock win
            return 6 + 1;
        } else if (p2Move === 'Y') { // scissors, paper lose
            return 0 + 2;
        } else { // scissors, scissors tie
            return 3 + 3;
        }
    }
}