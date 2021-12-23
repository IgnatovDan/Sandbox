// https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html

const amqp = require('amqplib/callback_api');

console.log('Starting...');

const sharedQueueName = 'LongFunction';

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

        console.log('Creating an exclusive queue...');

        let sentMessagesCount = 0;
        let receivedMessagesCount = 0;

        channel.assertQueue('', { exclusive: true }, (_, assertQueueResult) => {
            channel.consume(assertQueueResult.queue, function (msg) {
                const messageText = msg.content.toString();
                console.log(`${messageText}, client received at ${new Date().toISOString()}`);
                receivedMessagesCount++;
            }, {
                noAck: true
            });    

            for(let i = 1; i < 100; i++) {
                const message = new Date().toISOString();
                console.log(`Client sent at ${message} (${i})`);
                channel.sendToQueue(
                    sharedQueueName,
                    Buffer.from(message),
                    {
                        correlationId: i.toString(),
                        replyTo: assertQueueResult.queue
                    }
                );
                sentMessagesCount++;
            }
        });

        function waitForRepliesAndClose() {
            console.log(`waitForRepliesAndClose: ${sentMessagesCount} was sent, ${receivedMessagesCount} was received`);
            if(sentMessagesCount > receivedMessagesCount) {
                console.log(`waiting for new replies for 1 sec...`)
                setTimeout(
                    () => waitForRepliesAndClose(),
                    1000
                );
            }
            else {
                console.log(`exiting...`);
                closeConnectionAndExit();
            }
        }

        setTimeout(
            () => waitForRepliesAndClose(),
            1000
        );
    });
});