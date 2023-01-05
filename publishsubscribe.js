import redis from 'redis';

const CHANNELS ={
    TEST:'TEST'
}
class PubSub{
    constructor(){
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscriber.subscribe(CHANNELS.TEST);

        this.subscriber.on('message',(channel,message)=>this.handleMessage(channel,message));

    }
    handleMessage(channel,message){
        console.log(`Message Received Channel: ${channel} Message: ${message}`);
    }
}


const checkPubSub = new PubSub();
setTimeout(()=> checkPubSub.publisher.publish(CHANNELS.TEST,'Helllooo i am swayam'),
1000
); 