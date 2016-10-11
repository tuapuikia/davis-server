'use strict';

const _ = require('lodash'),
    common = require('../../utils/common');

const ELIGIBLE_TO_SHOW = ['web', 'alexa'],
    ELIGIBLE_FOR_NOTIFICATIONS = ['system'];
    
const express = require('../../../../index');

const tagger = {
    tag: davis => {
        return {
            lang: common.getLanguage(davis.user),
            tense: common.getTense(davis.exchange),
            containsRootCause: containsRootCause(davis.intentData),
            eligibleToShow: eligibleToShow(davis.exchange, davis.user),
            notification: notification(davis.exchange)
        };
    }
};

function containsRootCause(intentData) {
    return _.includes(intentData.problemDetails.result.rankedEvents, event => event.isRootCause === true);
}

function eligibleToShow(exchange, user) {
    // Only the WebUI is eligible for the show command.
    return _.includes(ELIGIBLE_TO_SHOW, _.get(exchange, 'source')) && express.isSocketConnected(user);
}

function notification(exchange) {
    return _.includes(ELIGIBLE_FOR_NOTIFICATIONS, _.get(exchange, 'source'));
}

module.exports = tagger;