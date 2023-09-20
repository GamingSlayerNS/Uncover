class Alphabetizer {
    alphabetize(input: string): string[] {
        let sentences = input.split(". ")
        
        return sentences.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase())
        })
    }
}

class CircularShift {
    circularShift() {return null}
}

class LineStorage {
    storeLine() {return null}
}

export default Alphabetizer
