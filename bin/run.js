let InvitationsProcess = require('../obj/src/container/InvitationsProcess').InvitationsProcess;

try {
    new InvitationsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
