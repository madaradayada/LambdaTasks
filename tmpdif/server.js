#!/usr/bin/env node
console.log('pls enter any words')

const { name, version } = require('../tmpdif/package.json') 

if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`${name}
Usage:
--help Help documentation
--version Installed pacckage version`
)
} else if (process.argv.includes('--version') || process.argv.includes('-v')) {
    console.log(version)
}