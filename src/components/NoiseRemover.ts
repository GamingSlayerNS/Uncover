class NoiseRemover {
    removeNoise(input: string[]): string[] {
        console.log(input);
        let sentences = input;
        for(let i = 0; i < sentences.length; i++) {
            let firstWord = sentences[i].split(' ')[0].toLowerCase();
            console.log(firstWord);
            if (firstWord === 'the' || firstWord === 'is' || firstWord === 'a' || firstWord === 'an' || firstWord === 'of' 
                || firstWord === 'with' || firstWord === 'and' || firstWord === 'after' || firstWord === 'no' || firstWord === 'from') {
                sentences.splice(i, 1);
                i--;
            }
        }

        return sentences;
    }
}

export default NoiseRemover;