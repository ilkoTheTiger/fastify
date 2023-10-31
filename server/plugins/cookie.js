'use strict'

const fp = require('fastify-plugin')

/**
 * This plugins is for the cookies
 *
 * @see https://github.com/fastify/fastify-cookie
 */
module.exports = fp(async function (fastify, opts) {
    fastify.register(require('@fastify/cookie'), {
        secret: "my-secret", // for cookies signature
        hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
        parseOptions: {}  // options for parsing cookies
    })

    fastify.get('/', (req, reply) => {
        const aCookieValue = req.cookies.cookieName
        console.log(aCookieValue)
        // `reply.unsignCookie()` is also available
        // const bCookie = req.unsignCookie(req.cookies.cookieSigned);
        reply
            .setCookie('foo', 'foo', {
                domain: 'localhost',
                path: '/'
            })
            .cookie('baz', 'baz') // alias for setCookie
            .setCookie('bar', 'bar', {
                path: '/',
                signed: true
            })
            .send({ hello: 'stream' })
    })
})