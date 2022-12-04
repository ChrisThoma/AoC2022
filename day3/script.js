const $output = document.getElementById('output')
const $scoretext = document.getElementById('total')
const FIRST_POSITION = 97
const ASCII_OFFSET = 32
const ALPHABET_OFFSET = 26
document.getElementById('file').onchange = function() {
    var file = this.files[0];

    var reader = new FileReader();
    reader.onload = function(progressEvent) {
        const text = this.result;
        var lines = text.split('\n');
        var sum = 0;
        for (var i = 0; i < lines.length; i++) {
            let alphabet = Array(52).fill(false);
            let line =  lines[i];
            for (let j = 0; j < line.length / 2; j++) {
                let alphabetValue = 0
                if (line.charCodeAt(j) < FIRST_POSITION) {
                    alphabetValue = (line.charCodeAt(j) + ASCII_OFFSET + ALPHABET_OFFSET) - FIRST_POSITION;
                } else {
                    alphabetValue = line.charCodeAt(j) - FIRST_POSITION;
                }
                alphabet[alphabetValue] = true;
            }
            for (let j = line.length / 2; j < line.length; j++) {
                let alphabetValue = 0
                if (line.charCodeAt(j) < FIRST_POSITION) {
                    alphabetValue = (line.charCodeAt(j) + ASCII_OFFSET + ALPHABET_OFFSET) - FIRST_POSITION;
                } else {
                    alphabetValue = line.charCodeAt(j) - FIRST_POSITION;
                }
                if (alphabet[alphabetValue] == true) {
                    sum += alphabetValue + 1;
                    $output.innerHTML += `${line[j]} found in both compartments of ${line}. Adding ${alphabetValue + 1}. Sum is now ${sum} <br/><br/>`;
                    break;
                }
            }
        }
        $scoretext.innerHTML = `${sum}`
    }
    reader.readAsText(file);
}