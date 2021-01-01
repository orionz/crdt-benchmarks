import AutomergeWASM from "automerge-wasm"
import * as prng from 'lib0/prng.js'
import * as t from 'lib0/testing.js'
export const gen = prng.create(42)

const N = 10000

const benchmarkAutomergeWASM = (id, init, inputData, changeFunction, check) => {
    const emptyDoc = AutomergeWASM.init()
    let doc1 = AutomergeWASM.change(emptyDoc, init)
    let doc2 = AutomergeWASM.applyChanges(AutomergeWASM.init(), AutomergeWASM.getChanges(emptyDoc, doc1))
    let updateSize = 0
    for (let i = 0; i < inputData.length; i++) {
            const updatedDoc = AutomergeWASM.change(doc1, doc => {
                      changeFunction(doc, inputData[i], i)
                    })
            const change = AutomergeWASM.getLastLocalChange(updatedDoc)
            updateSize += change.length
            doc2 = AutomergeWASM.applyChanges(doc2, [change])
            doc1 = updatedDoc
          }
    check(doc1, doc2)
    const encodedState = AutomergeWASM.save(doc1)
    const documentSize = encodedState.length
    let loadDoc = null
    loadDoc = AutomergeWASM.load(encodedState)
    AutomergeWASM.free(loadDoc)
    AutomergeWASM.free(doc1)
    AutomergeWASM.free(doc2)
}
const benchmarkAllAutomergeText = (id, inputData, changeFunction, check) => {
  //benchmarkAutomerge(id, doc => { doc.text = new Automerge.Text() }, inputData, changeFunction, check)
  // benchmarkAutomerge1(id, doc => { doc.text = new Automerge1.Text() }, inputData, changeFunction, check)
  benchmarkAutomergeWASM(id, doc => { doc.text = new AutomergeWASM.Text() }, inputData, changeFunction, check)
}

const benchmarkName = '[B1.4] Insert N characters at random positions'
let string = ''
const input = []
for (let i = 0; i < N; i++) {
    const index = prng.int32(gen, 0, string.length)
    const insert = prng.word(gen, 1, 1)
    string = string.slice(0, index) + insert + string.slice(index)
    input.push({ index, insert })
}
benchmarkAllAutomergeText(
      benchmarkName,
      input,
      (doc, op, i) => { doc.text.insertAt(op.index, op.insert) },
      (doc1, doc2) => {
              t.assert(doc1.text.join('') === doc2.text.join(''))
              t.assert(doc1.text.join('') === string)
            }
 )
