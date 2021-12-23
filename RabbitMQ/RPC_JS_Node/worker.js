// https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html

// RabbitMQ management UI: http://localhost:15672/ 
// guest/guest

const amqp = require('amqplib/callback_api');

console.log('Starting...');

function longFunction() {
    // thread blocking operation, ~5 seconds
    const random = Math.floor(Math.random() * 10);
    for(i = 0; i < (100000000 * random); i++) {
        Math.sqrt(i * (1000000000 * Math.random()));
    }
}

const sharedQueueName = 'LongFunction';

amqp.connect('amqp://localhost', function(error0, connection) {
    if(error0) {
        throw error0;
    }

    console.log('Creating a channel...');
    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1;
        }

        channel.prefetch(1); // TODO: whether it is possible to process 5 messages simultaneously???

        console.log(`Creating the ${sharedQueueName} queue...`);
        channel.assertQueue(sharedQueueName, { durable: false });

        console.log(`Consuming messages from queue...`);
        channel.consume(sharedQueueName, function (msg) {
            const messageText = msg.content.toString();

            console.log(`> ${messageText}, correlation id: ${msg.properties.correlationId}`);

            longFunction();
            const result = `${messageText}, worker processed at ${new Date().toISOString()} (${msg.properties.correlationId})`;
            console.log('< ' + result);

            channel.sendToQueue(msg.properties.replyTo, Buffer.from(result.toString()), { correlationId: msg.properties.correlationId });
            channel.ack(msg);
        }, {
            noAck: false
        });
    });
});