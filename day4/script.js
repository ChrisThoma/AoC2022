const $output = document.getElementById('output')
const $total = document.getElementById('total')
const $overlap = document.getElementById('overlap')
document.getElementById('file').onchange = function() {
    var file = this.files[0];

    var reader = new FileReader();
    reader.onload = function(progressEvent) {
        const text = this.result;
        let lines = text.split('\n');
        let sum = 0;
        let overlaps = 0;
        for (var i = 0; i < lines.length; i++) {
            let line = lines[i];
            let ranges = line.split(',');
            let pair = ranges[0].split('-');
            let firstNumberFirstPair = parseInt(pair[0]);
            let secondNumberFirstPair = parseInt(pair[1]);
            pair = ranges[1].split('-');
            let firstNumberSecondPair = parseInt(pair[0]);
            let secondNumberSecondPair = parseInt(pair[1]);

            if (firstNumberFirstPair >= firstNumberSecondPair) {
                if (firstNumberFirstPair <= secondNumberSecondPair) {
                    overlaps++;
                }
            } else if (firstNumberSecondPair >= firstNumberFirstPair) {
                if (firstNumberSecondPair <= secondNumberFirstPair) {
                    overlaps++;
                }
            }

            if (firstNumberFirstPair <= firstNumberSecondPair) {
                    if (secondNumberFirstPair >= secondNumberSecondPair) {
                        sum++;
                        continue;
                    }
            }
            if (firstNumberSecondPair <= firstNumberFirstPair) {
                    if (secondNumberSecondPair >= secondNumberFirstPair) {
                        sum++;
                        continue;
                    }
            }

            $output.innerHTML += `ranges: ${ranges}, sum = ${sum}, overlaps = ${overlaps}<br/><br/>`;
        }
        $total.innerHTML += `${sum}`;
        $overlap.innerHTML += `${overlaps}`
    }
    reader.readAsText(file);
}