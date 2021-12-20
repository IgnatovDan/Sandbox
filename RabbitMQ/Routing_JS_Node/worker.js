// https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html

// RabbitMQ management UI: http://localhost:15672/ 
// guest/guest

const amqp = require('amqplib/callback_api');

console.log('Starting...');

amqp.connect('amqp://localhost', function(error0, connection) {
    if(error0) {
        throw error0;
    }

    console.log( process.argv);
    const routingKeys = process.argv.slice(2);
    if(!routingKeys.length) {
        console.log('Incorrect arguments, use: node worker.js [routing1] [routing2] ...');
        process.exit(0);
    }

    console.log('Creating a channel...');
    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1;
        }
        const exchangeName = 'my exchange';

        console.log('Creating an exchange...');
        channel.assertExchange(exchangeName, 'direct', { durable: false });

        channel.prefetch(1);

        let messageCounter = 0;
        console.log('Creating queue...');
        channel.assertQueue(
            '', // generate server side name
            { exclusive: true }, // individual, delete when connection is closed
            (error, assertQueue) => {
                console.log(`Binding '${exchangeName}.${assertQueue.queue}' queue by [${routingKeys}] routings`);

                routingKeys.forEach(routingKey => channel.bindQueue(assertQueue.queue, exchangeName, routingKey));

                console.log(`Consuming messages from queue...`);
                channel.consume(assertQueue.queue, function (msg) {
                    const messageText = msg.content.toString();
                    const consumedMessageNumber = ++messageCounter;
                    console.log(`${messageText} consumed (${consumedMessageNumber})`);
                    setTimeout(
                        () => {
                            console.log(`${messageText} (${consumedMessageNumber}) processed at ${new Date().toISOString()}`);
                            channel.ack(msg);
                        },
                        messageText.split('.').length * 1000
                    );
                }, {
                    noAck: false
                });
            }
        );
    });
});