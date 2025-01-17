const { exec } = require('child_process');
const semver = require('semver');

exec('tns --version', (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        console.log(`tns --version err: ${err}`);
        return;
    }

    const newLineAt = stdout.indexOf('\n');
    if (newLineAt > -1) stdout = stdout.substring(0, newLineAt).trim();
    const tnsVersion = semver.major(stdout);

    // execute 'tns plugin build' for {N} version > 4. This command builds .aar in platforms/android folder.
    if (tnsVersion >= 4) {
        console.log(`executing 'tns plugin build'`);
        exec('tns plugin build');
    }
}); 