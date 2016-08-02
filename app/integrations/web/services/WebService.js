'use strict';

const ConversationService = require('../../../services/ConversationService'),
    AccountService = require('../../../services/AccountService'),
    logger = require('../../../utils/logger'),
    Davis = require('../../../core'),
    BbPromise = require('bluebird'),
    randToken = require('rand-token').uid,
    _ = require('lodash');

const RESPONSE_VERSION = '1.0',
    REQUEST_SOURCE = 'web',
    ERROR_RESPONSE = 'Wow, this is embarrassing!  I understood what you were asking for but I simply can\'t but it into words.  Perhaps you could help me out by checking the logs and adding the missing template?';


module.exports = function WebService(config) {
    
    /**
     * Responds to web using the exchange generated by Davis
     * @param {Object} davis - The fully proceeded Davis object.
     * @returns {Object} response - The response formatted how web expects.
     */
    function formatResponse(davis) {
        //ToDo Add support for cards.
        logger.info('Generating the response for web');
    
        return {
            response: {
                shouldEndSession: _.get(davis, 'exchange.response.finished', true),
                text: davis.exchange.response.visual.text,
                card: davis.exchange.response.visual.card,
                hyperlink: davis.exchange.response.visual.hyperlink,
                ssml: davis.exchange.response.audible.ssml
            }
        };
    }

    return {
        /**
         * Interacts with Davis via web
         * @param {Object} req - The request received from web.
         * @returns {promise} res - The response formatted for web.
         */
        askDavis: (req) => {
            logger.info('Starting our interaction with Davis');
            
            return new BbPromise((resolve, reject) => {

                // Use web user token as id for Davis user 
                //ToDo review this
                let user = {
                    'id': 'web-user-' + req.body.user, 
                    'nlp': config.users[0].nlp, 
                    'dynatrace': config.users[0].dynatrace,
                    'timezone': req.body.timezone
                };
                
                // Starts or continues our conversation
                ConversationService.getConversation(user)
                .then(conversation => {
                    let davis = new Davis(user, conversation, config);
                    return davis.interact(req.body.request, REQUEST_SOURCE);
                })
                .then(davis => {
                    logger.info('Finished processing request');
                    return resolve(formatResponse(davis));
                })
                .catch(err => {
                    logger.error(`Unfortunately, something went wrong.  ${err.message}`);
                    //ToDo Add failure response
                    return reject(err.message);
                });
                
            });
            
        },
        
        /**
        * getDavisUserToken() generates a token
        * @param {Object} req - The request received from web.
        * @returns {String} randToken
        */
        getDavisUserToken: (req) => {
            return randToken(16);
        }
        
    }
    
};