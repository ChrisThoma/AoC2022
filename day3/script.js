const $output = document.getElementById('output')
const $scoretext = document.getElementById('total')
const $badgetext = document.getElementById('badgetotal')
const FIRST_POSITION = 97
const ASCII_OFFSET = 32
const ALPHABET_OFFSET = 26
const ALL_GROUP_TEXT = "123"
document.getElementById('file').onchange = function() {
    var file = this.files[0];

    var reader = new FileReader();
    reader.onload = function(progressEvent) {
        const text = this.result;
        let lines = text.split('\n');
        let sum = 0;
        let groupCount = 0;
        let lastFound = Array(52).fill(true);
        let groupSum = 0;
        let found = false
        for (var i = 0; i < lines.length; i++) {
            found = false
            let lettersFound = Array(52).fill(false);
            let firstCompartmentLetters = Array(52).fill(false);
            let line =  lines[i];
            for (let j = 0; j < line.length / 2; j++) {
                let alphabetValue = 0
                if (line.charCodeAt(j) < FIRST_POSITION) {
                    alphabetValue = (line.charCodeAt(j) + ASCII_OFFSET + ALPHABET_OFFSET) - FIRST_POSITION;
                } else {
                    alphabetValue = line.charCodeAt(j) - FIRST_POSITION;
                }
                firstCompartmentLetters[alphabetValue] = true;
                lettersFound[alphabetValue] = true;
            }
            for (let j = line.length / 2; j < line.length; j++) {
                let alphabetValue = 0
                if (line.charCodeAt(j) < FIRST_POSITION) {
                    alphabetValue = (line.charCodeAt(j) + ASCII_OFFSET + ALPHABET_OFFSET) - FIRST_POSITION;
                } else {
                    alphabetValue = line.charCodeAt(j) - FIRST_POSITION;
                }
                if (!found && firstCompartmentLetters[alphabetValue] == true) {
                    sum += alphabetValue + 1;
                    $output.innerHTML += `${line[j]} found in both compartments of ${line}. Adding ${alphabetValue + 1}. Sum is now ${sum} <br/><br/>`;
                    found = true;
                }
                lettersFound[alphabetValue] = true;
            }
            for (let j = 0; j < lastFound.length; j++) {
                lastFound[j] = lastFound[j] && lettersFound[j];
            }
            if (groupCount == 2) {
                for (let j = 0; j < lastFound.length; j++) {
                    if (lastFound[j]) {
                        groupSum += (j + 1);
                        break;
                    }
                }
                lastFound = lastFound.fill(true);
                groupCount = 0;
            } else {
                groupCount++
            }
        }
        $badgetext.innerHTML = `BADGE SUM = ${groupSum}`;
        $scoretext.innerHTML = `DOUBLE ITEM SUM = ${sum}`;
    }
    reader.readAsText(file);
}