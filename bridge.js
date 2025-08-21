class Bridge {
    constructor(num, radius, length) {
        this.bodies = [];
        this.num = num;
        this.radius = radius;
        this.length = length;
        this.chains;

        this.initialize();
    }

    initialize() {
        for (let i = 0; i < num; i++) {
            let x = width / 2 + (i * 20);
            let y = random(10, 50);

            let fixed = false;
            if (i == 0) {
                fixed = true;
            } else {
                fixed = false;
            }
            this.bodies[i] = Bodies.circle(x, y, this.radius, { isStatic: fixed });
        }

        this.chains = Composite.create();
        Composite.add(this.chains, this.bodies);
        let options = {
            length: this.length,
            stiffness: 1
        }
        Composites.chain(this.chains, 0, 0, 0, 0, options);
        Composite.add(engine.world, this.chains);
    }

    display() {
        for (let i = 0; i < this.bodies.length; i++) {
            let x1 = this.bodies[i].position.x;
            let y1 = this.bodies[i].position.y;
            fill(255); stroke(0);
            circle(x1, y1, this.radius * 2);

            let x2, y2;
            if (i < this.bodies.length - 1) {
                x2 = this.bodies[i + 1].position.x;
                y2 = this.bodies[i + 1].position.y;
                
                strokeWeight(2);
                line(x1, y1, x2, y2);
            }
        }
    }
}