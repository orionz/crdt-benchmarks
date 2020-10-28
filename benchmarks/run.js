import './bundle.js'
import './b1.js'
//import './b2.js'
//import './b3.js'
//import './b4.js'
import { benchmarkResults, N } from './utils.js'

// print markdown table with the results
let mdTable = `| N = ${N} | YJS | Automerge1 | AutomergeWASM |\n`
mdTable += `|${"".padEnd(73, ' ')} | ${('yjs').padStart(15, ' ')} | ${('automerge1').padStart(15, ' ')} | ${('automergeWASM').padStart(15, ' ')} |\n`
for (const id in benchmarkResults) {
  mdTable += `|${id.padEnd(73, ' ')} | ${(benchmarkResults[id].yjs || '').padStart(15, ' ')} | ${(benchmarkResults[id].automerge || '').padStart(15, ' ')} | ${(benchmarkResults[id]['delta-crdts'] || '').padStart(15, ' ')} |\n`
}
console.log(mdTable)
