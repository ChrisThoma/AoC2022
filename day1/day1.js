const $output = document.getElementById('output')
const $maxtext = document.getElementById('maxtext')
document.getElementById('file').onchange = function() {
    var file = this.files[0];

    var reader = new FileReader();
    reader.onload = function(progressEvent) {
        console.log('reading');
        const text = this.result;
        $output.innerText = text;

        var lines = text.split('\n');
        var maxCals = 0;
        var cals = 0;
        let elvesCals = []
        for (var i = 0; i < lines.length; i++) {
            var cal = parseInt(lines[i])
            console.log(cal);
            if (cal !== cal) {
                console.log("FOUND NAN");
                elvesCals.push(cals)
                maxCals = Math.max(maxCals, cals);
                cals = 0;
            } else {
                cals += cal;
            }
        }
        elvesCals.sort( function(a, b) {
            return b-a;
        });
        let newMax = 0;
        for (let i = 0; i < 3; i++) {
            newMax += elvesCals[i];
        }
        $maxtext.innerText = newMax;
    }
    reader.readAsText(file);
}