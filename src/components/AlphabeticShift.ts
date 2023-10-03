class Alphabetizer {
    alphabetize(input: string[]): string[] {
        let sentences = input;
        
        return sentences.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase())
        })
    }
}

export default Alphabetizer;
