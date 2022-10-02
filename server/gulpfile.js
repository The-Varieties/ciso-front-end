import pkg from 'gulp';
const { src, dest, series, parallel } = pkg;
import del from 'del'
import fs from 'fs'
import zip from 'gulp-zip'
import child_process from 'child_process'

const paths = {
    prod_build: '../prod-build',
    react_src: '../client/build/**/*',
    react_dist: '../prod-build/client/build',
    zipped_file_name: 'prod.zip'
}

function clean() {
    return del('../prod_build/**', {force: true});
}

function createProdBuildFolder() {
    if(!fs.existsSync(paths.prod_build)) {
        fs.mkdirSync(paths.prod_build)
    }
    return Promise.resolve('ignore')
}

function buildReactCode() {
    return child_process.exec('cd ../client && npm run build')
}

function copyReactCode() {
    return src(`${paths.react_src}`).pipe(dest(`${paths.react_dist}`))
}

function copyNodeJSCode() {
    return src(['package.json', 'server.js']).pipe(dest(`${paths.prod_build}`))
}

export default series(
    clean,
    createProdBuildFolder,
    buildReactCode,
    parallel(copyReactCode, copyNodeJSCode)
)
