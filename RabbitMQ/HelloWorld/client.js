// https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html

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

        console.log('Creating a queue...');
        channel.assertQueue(queue, {
            durable: false
        });

        function sendMessagesByInterval() {
            setTimeout(
                () => {
                    const message = 'Hello my world, ' + new Date().toISOString() + ' ' + String('.').repeat(Math.floor(Math.random() * 10));
                    console.log(message + ' sending...');
                    channel.sendToQueue(queue, Buffer.from(message));
                    console.log(message + ' was sent');
                    sendMessagesByInterval();
                },
                1000
            );
        }

        sendMessagesByInterval();
    });
    setTimeout(
        () => {
            console.log('Closing the connection...');
            // Messages are not sent syncronously and will lost if 'close' method is called immediately after 'sendToQueue'
            // TODO: how to check that all the passed messages were accepted by the rabbitMQ server?
            connection.close();
    
            console.log('process.exit(0)');
            process.exit(0);
        },
        15000
    );
});