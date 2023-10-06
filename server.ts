import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import metrics from 'fastify-metrics';
// import nstats from 'nstats';

const server: FastifyInstance = Fastify({
    logger: true
});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

server.get("/ping", opts, async (request, reply) => {
  return { pong: "it worked again and again!" };
});

server.register(metrics, {
  endpoint: '/metrics',
})

const start = async () => {
  try {
    await server.listen({ port: 4000 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
