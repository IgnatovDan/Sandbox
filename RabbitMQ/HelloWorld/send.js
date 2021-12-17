const amqp = require('amqplib/callback_api');

console.log('Starting...');

amqp.connect('amqp://localhost', function(error0, connection){
    if(error0) {
        throw error0;
    }

    console.log('Creating a channel...');
    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1;
        }
        const queue = 'hello1';
        const message = 'Hello my world';

        console.log('Creating a queue...');
        channel.assertQueue(queue, {
            durable: false
        });

        console.log('Sending a message...');
        channel.sendToQueue(queue, Buffer.from(message));
        console.log('The message was sent.');

        console.log('Closing the connection...');
        connection.close();

        console.log('process.exit(0)');
        process.exit(0);
    })
});