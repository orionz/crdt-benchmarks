
import { setBenchmarkResult } from './utils.js'

if (typeof global !== 'undefined' && typeof window === 'undefined') {
  const fs = require('fs')
  const pkgLock = JSON.parse(fs.readFileSync(__dirname + '/../package-lock.json', 'utf8'))

  const yjsBundleSize = fs.statSync(__dirname + '/../dist/bundleYjs.js').size
  const deltaCrdtsBundleSize = fs.statSync(__dirname + '/../dist/bundleDeltaCrdts.js').size
  const automergeBundleSize = fs.statSync(__dirname + '/../dist/bundleAutomerge.js').size
  const automerge1BundleSize = fs.statSync(__dirname + '/../dist/bundleAutomerge1.js').size
  const automergeWASMBundleSize = fs.statSync(__dirname + '/../dist/bundleAutomergeWASM.js').size
  const yjsGzBundleSize = fs.statSync(__dirname + '/../dist/bundleYjs.js.gz').size
  const deltaCrdtsGzBundleSize = fs.statSync(__dirname + '/../dist/bundleDeltaCrdts.js.gz').size
  const automergeGzBundleSize = fs.statSync(__dirname + '/../dist/bundleAutomerge.js.gz').size
  const automerge1GzBundleSize = fs.statSync(__dirname + '/../dist/bundleAutomerge1.js.gz').size
  const automergeWASMGzBundleSize = fs.statSync(__dirname + '/../dist/bundleAutomergeWASM.js.gz').size

  const yjsVersion = pkgLock.dependencies.yjs.version
  const deltaCrdtsVersion = pkgLock.dependencies['delta-crdts'].version
  const automergeVersion = pkgLock.dependencies.automerge.version

  setBenchmarkResult('yjs', 'Version', yjsVersion)
  setBenchmarkResult('delta-crdts', 'Version', deltaCrdtsVersion)
  setBenchmarkResult('automerge', 'Version', automergeVersion)
  setBenchmarkResult('automerge1', 'Version', "1.0.0-pre1")
  setBenchmarkResult('automergeWASM', 'Version', "1.0.0-pre1")

  setBenchmarkResult('yjs', 'Bundle size', `${yjsBundleSize} bytes`)
  setBenchmarkResult('delta-crdts', 'Bundle size', `${deltaCrdtsBundleSize} bytes`)
  setBenchmarkResult('automerge', 'Bundle size', `${automergeBundleSize} bytes`)
  setBenchmarkResult('automerge1', 'Bundle size', `${automerge1BundleSize} bytes`)
  setBenchmarkResult('automergeWASM', 'Bundle size', `${automergeWASMBundleSize} bytes`)

  setBenchmarkResult('yjs', 'Bundle size (gzipped)', `${yjsGzBundleSize} bytes`)
  setBenchmarkResult('delta-crdts', 'Bundle size (gzipped)', `${deltaCrdtsGzBundleSize} bytes`)
  setBenchmarkResult('automerge', 'Bundle size (gzipped)', `${automergeGzBundleSize} bytes`)
  setBenchmarkResult('automerge1', 'Bundle size (gzipped)', `${automerge1GzBundleSize} bytes`)
  setBenchmarkResult('automergeWASM', 'Bundle size (gzipped)', `${automergeWASMGzBundleSize} bytes`)
}
