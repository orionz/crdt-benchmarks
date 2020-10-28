import './bundle.js'
//import './b1.js'
import './b2.js'
//import './b3.js'
//import './b4.js'
import { benchmarkResults, N } from './utils.js'

// print markdown table with the results

const benches = Object.keys(benchmarkResults)
const crdtNames = Object.keys(benchmarkResults[benches[benches.length-1]])

let mdTable = `| N = ${N} |\n`
mdTable += `|${"".padEnd(73, ' ')} | `
mdTable += crdtNames.map((name) => name.padStart(15, ' ')).join(' | ')
mdTable += `|\n`

for (const id in benchmarkResults) {
  mdTable += `|${id.padEnd(73, ' ')} | `
  mdTable += crdtNames.map((name) => (benchmarkResults[id][name] || 'missing').padStart(15, ' ')).join(' | ')
  mdTable += `|\n`
}
console.log(mdTable)
