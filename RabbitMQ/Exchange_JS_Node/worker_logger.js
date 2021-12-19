// https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html

// RabbitMQ management UI: http://localhost:15672/ 
// guest/guest

const amqp = require('amqplib/callback_api');

console.log('Starting...');

amqp.connect('amqp://localhost', function(error0, connection) {
    if(error0) {
        throw error0;
    }

    console.log('Creating a channel...');
    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1;
        }
        const exchangeName = 'my exchange';

        console.log('Creating an exchange...');
        channel.assertExchange(exchangeName, 'fanout', { durable: false });

        let messageCounter = 0;
        console.log('Creating queue...');
        channel.assertQueue(
            '',
            { exclusive: true },
            (error, assertQueue) => {
                console.log(`Binding '${exchangeName}' exchange to '${assertQueue.queue}' queue...`);
                channel.bindQueue(assertQueue.queue, exchangeName, '');

                console.log(`Consuming messages from queue...`);
                channel.consume(assertQueue.queue, function (msg) {
                    const messageText = msg.content.toString();
                    const consumedMessageNumber = ++messageCounter;
                    console.log(`${messageText} consumed (${consumedMessageNumber})`);
                }, {
                    noAck: true // it's ok for 'logger'
                });
            }
        );
    });
});