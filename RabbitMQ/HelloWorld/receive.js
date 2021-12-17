// https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html

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
            durable: false
        });

        console.log('Receiving a message...');
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
        channel.consume(queue, 
            function(msg) {
                console.log(msg.content.toString());
            },
            { noAsk: true }
        );
    });
});