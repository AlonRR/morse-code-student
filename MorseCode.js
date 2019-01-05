const BSTree = require('./BinarySearch')
const alphabet = require('./alphabet')

class ScoreTree extends BSTree {
    constructor(value, score) {
        super(value)
        this.score = score
    }
    insertNode(key, score) { //this function inserts a letter into the morse code tree - this should run once in the beginning
        if (!this.value) {
            this.value = key
            this.score = score
        }
        else if (score > this.score && this.rightChild) {
            this.rightChild.insertNode(key, score)
        }
        else if (score <= this.score && this.leftChild) {
            this.leftChild.insertNode(key, score)
        }
        else if (score <= this.score) {
            this.leftChild = new ScoreTree(key, score)
        }
        else {
            this.rightChild = new ScoreTree(key, score)
        }
    }
    findLetter(letter) {
        // this method should record the path to a given letter - right: Dash , left: Dot
        let score = alphabet[letter]
        if (score === this.score) {
            return ` `
        } else if (this.score < score) {
            return `-` + this.rightChild.findLetter(letter)
        } else if (this.score > score) {
            return `.` + this.leftChild.findLetter(letter)
        } 
    }
    translateWord(word) {
        //this method should translate a given word from text to Morse Code
        let obj = ``
        while (word !== ``) {
            let letter = word[0]
            word = word.slice(1)
            if (letter === ` `) {
                obj += `/ `
            } else if(letter!==undefined){
                obj += this.findLetter(letter.toUpperCase())
            }
        }
        return obj
    }
    translateMorse(sentence, param = this) {
        // this function should translate a given code from Morse to English
        let mors = sentence[0]
        sentence = sentence.slice(1)
        if (mors === undefined) {
            return this.value
        } else if (mors === `.`) {
            return this.leftChild.translateMorse(sentence, param)
        } else if (mors === `-`) {
            return this.rightChild.translateMorse(sentence, param)
        } else if (mors === `/` && sentence[0] === ` `) {
            sentence = sentence.slice(1)
            return ` ` + param.translateMorse(sentence, param)
        } else if (mors === ` `) {
            return this.value + param.translateMorse(sentence, param)
        }
    }
}
//initializing the MorseCode tree
const morseCode = new ScoreTree("TOP", 50)
Object.keys(alphabet).forEach(l => {
    morseCode.insertNode(l, alphabet[l])
})

// console.log(morseCode.translateWord("welcome")) // should print .-- . .-.. -.-. --- -- . 
// console.log(morseCode.translateWord("elevation is cool")) // should print . .-.. . ...- .- - .. --- -. /.. ... /-.-. --- --- .-.. 
// console.log(morseCode.translateMorse("... --- ..."))
// console.log(morseCode.translateMorse("-. .. -.-. . / .--- --- -... / --- -. / - .... . / .-.. . ... ... --- -."))//NICE JOB ON THE LESSON
console.log(morseCode.translateWord(`morse code is awsome`))