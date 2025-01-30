'use strict';

const appConst = {
    recoveryPending : 0,
    recoveryAccepted : 1,
    recoveryRejected : 2,
    temporaryRestricted : 2,
    permanentRestricted : 3,
    pendingQuery : 0,
    progressQuery : 1,
    escalatedQuery : 2,
    resolvedQuery : 3,
    lowPriority : 0,
    mediumPriority: 1,
    highPriority : 2,
    criticalPriority : 3,
}

module.exports = appConst;