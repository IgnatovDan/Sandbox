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
        const queue = 'hello1';

        console.log('Creating a queue...');
        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1);

        let messageCounter = 0;
        channel.consume(queue, function (msg) {
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
    });
});