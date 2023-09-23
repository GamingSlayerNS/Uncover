class CircularShift {
    circularShift(input: string): string[] {
        let sentences = input.split(". ");

        let idx = 0;
        let aLine = "";

        while ((aLine = sentences[idx]) != null) {
            try {
                let lastChar = '. ';

                for (let i = 0; i < aLine.length; i++) {
                    let ch = aLine.charAt (i);
                    if (ch !== ' ') {
                      if ((lastChar === ' ') || (lastChar === '\0')) {
                        
                        // circular shift found at the beginning of each word
                        console.log("Array " + idx + "." + i);
                        // Alphabetizer.writeInteger (bos, idx);
                        // Alphabetizer.writeInteger (bos, i);
                      }
                    }
                    lastChar = ch;
                }
            } catch (error) {
                
            }
            idx++;
        }

        return sentences;
    }
}

export default CircularShift;