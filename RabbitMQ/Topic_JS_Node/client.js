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
        const exchangeName = 'my topic';

        console.log('Creating an exchange...');
        channel.assertExchange(exchangeName, 'topic', { durable: false });

        const animals = ['dog', 'cat', 'fish'];
        const places = ['home', 'work', 'street'];
        const actions = ['die', 'jump', 'fly'];
        animals.forEach( animal => {
            actions.forEach( action => {
                places.forEach( place => {
                    const message = `${animal} ${action} at ${place}`;
                    channel.publish(exchangeName, `${animal}.${action}.${place}`, Buffer.from(message));
                    console.log(message + ' was sent');
                })
            })
        });

        setTimeout(
            () => closeConnectionAndExit(),
            1000
        );
    });
});