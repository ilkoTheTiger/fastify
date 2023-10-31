'use strict'

const fp = require('fastify-plugin')
// const fastify = require('fastify')({ logger: { level: 'trace' } })
const oauthPlugin = require('@fastify/oauth2')

/**
 * This plugin handles Social Login with OAuth2
 *
 * @see https://github.com/fastify/fastify-oauth2
 */
module.exports = fp(async function (fastify, opts) {
    fastify.register(oauthPlugin, {
        name: 'facebookOAuth2',
        credentials: {
            client: {
                id: '<CLIENT_ID>',
                secret: '<CLIENT_SECRET>'
            },
            auth: oauthPlugin.FACEBOOK_CONFIGURATION
        },
        // register a fastify url to start the redirect flow
        startRedirectPath: '/login/facebook',
        // facebook redirect here after the user login
        callbackUri: 'http://localhost:3000/login/facebook/callback'
    })

    fastify.get('/login/facebook/callback', async function (request, reply) {
        const { token } = await this.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

        console.log(token.access_token)

        // if later you need to refresh the token you can use
        // const { token: newToken } = await this.getNewAccessTokenUsingRefreshToken(token)

        reply.send({ access_token: token.access_token })
    })
})
