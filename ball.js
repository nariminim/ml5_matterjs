class Ball{

    constructor(){
        this.x = width/2; 
        this.y = 50; 
        this.r = 10; 
        this.colorPalette = ['#05d8f8ff', '#6ab0ffff', '#3357FF', '#09ffefff'];
        this.c = random(this.colorPalette);        
        this.done = false; 
        
        // restitution: bounciness of the ball 
        this.body = Bodies.circle(this.x, this.y, this.r, {restitution: 0.2});
        // Let's add different velocity to the ball
        let velocity = Vector.create(random(-1, 1), random(-1, 1)); 
        Body.setVelocity(this.body, velocity);
        Composite.add(engine.world, this.body); 
    }

    display(){
        fill(this.c); 
        circle(this.body.position.x, this.body.position.y, this.r*2); 
    }

    isDone(){
        if(this.body.position.y > height+this.r){
            this.done = true; 
        }else{
            this.done = false; 
        }
    }

    // removeBall(){
    //     Composite.remove(engine.world, this.body); 
    // }
}