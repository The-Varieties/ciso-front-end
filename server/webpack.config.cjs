const path = require('path');

module.exports = {
    entry: './server.js',
    mode: 'production',
    target: 'node',
    output: {
        path: path.resolve(process.cwd(), '.'),
        filename: 'server.bundle.js'
    }
};
