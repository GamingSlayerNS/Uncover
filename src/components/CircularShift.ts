class CircularShift {
    circularShift(input: string[]): string[] {
        let shiftedLines = new Array<string>();
        let splitTitle = new Array<string>();
        let idx = 0;
        
        while (idx < input.length) {
            try {
                splitTitle = input[idx].split(' ');
                let titleSize = splitTitle.length;
                console.log(splitTitle);
                
                for (let i = 0; i < titleSize; i++) {
                    // Assign current keyword
                    let line = splitTitle[i];
                    // Append following keywords
                    for (let j = i + 1; j < titleSize; j++) {
                        line = line.concat(" ", splitTitle[j]);
                    }
                    // Append keywords from beginning after looping around
                    if (i > 0) {
                        for (let j = 0; j < i; j++) {
                            line = line.concat(" ", splitTitle[j]);
                        }
                    }
                    shiftedLines.push(line);
                    console.log(line);
                }
            } catch (error) {
                
            }
            idx++;
        }
        console.log(shiftedLines);
        
        return shiftedLines;
    }

    circularShiftDigits(input: string[]): string[] {
        let shiftedLines = this.circularShift(input);
        let shiftedLinesIdx = 0;
        let digits = new Array<string>();
        let idx = 0;
        let aLine = "";
        
        while ((aLine = input[idx]) != null) {
            try {
                let lastChar = '. ';
                
                for (let i = 0; i < aLine.length; i++) {
                    let ch = aLine.charAt(i);
                    if (ch !== ' ') {
                        if ((lastChar === ' ') || (lastChar === '. ')) {
                            // circular shift found at the beginning of each word
                            digits.push(shiftedLines[shiftedLinesIdx] + " " + idx + "." + i);
                            shiftedLinesIdx++;
                        }
                    }
                    lastChar = ch;
                }
            } catch (error) {
                
            }
            idx++;
        }
        
        return digits;
    }
}

export default CircularShift;