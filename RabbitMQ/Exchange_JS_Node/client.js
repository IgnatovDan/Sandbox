// https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html

const amqp = require('amqplib/callback_api');

console.log('Starting...');

amqp.connect('amqp://localhost', function(error0, connection){
    if(error0) {
        throw error0;
    }

    function closeConnectionAndExit() {
        console.log('Closing the connection...');
        // Messages are not sent syncronously and will lost if 'close' method is called immediately after 'sendToQueue'
        // TODO: how to check that all the passed messages were accepted by the rabbitMQ server?
        connection.close();

        console.log('process.exit(0)');
        process.exit(0);
    }
    
    console.log('Creating a channel...');
    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1;
        }
        const exchangeName = 'my exchange';

        console.log('Creating an exchange...');
        channel.assertExchange(exchangeName, 'fanout', { durable: false });

        function sendMessagesByInterval(messageNumber) {
            setTimeout(
                () => {
                    messageNumber = messageNumber || 0;

                    if(messageNumber > 15) {
                        closeConnectionAndExit();
                    }

                    const message = `Hello (${messageNumber}), ${new Date().toISOString()} ${String('.').repeat(Math.floor(Math.random() * 10))}`;
                    
                    console.log(message + ' sending...');
                    channel.publish(exchangeName, '', Buffer.from(message));
                    console.log(message + ' was sent');

                    sendMessagesByInterval(messageNumber++);
                },
                1000
            );
        }

        sendMessagesByInterval();
    });

    setTimeout(
        () => closeConnectionAndExit(),
        20000
    );
});