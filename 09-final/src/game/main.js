game.module(
    'game.main'
)
.require(
    'plugin.p2'
)
.body(function() {
    
game.addAsset('banana.png');
game.addAsset('banana.json');

game.createScene('Main', {
    init: function() {
        this.world = new game.Physics();
        
        var floorBody = new game.Body({
            position: [
                game.width / 2 / this.world.ratio,
                game.height / this.world.ratio + 1
            ]
        });
        var floorShape = new p2.Box({ width: game.width / this.world.ratio, height: 2 });
        floorBody.addShape(floorShape);
        this.world.addBody(floorBody);
    },
    
    mousedown: function(x, y) {
        var banana = new game.Banana(x, y);
    }
});

game.createClass('Banana', {
    init: function(x, y) {
        this.sprite = new game.Sprite('banana.png');
        this.sprite.addTo(game.scene.stage);
        
        this.body = game.Body.fromData('banana.json');
        this.body.position[0] = x / game.scene.world.ratio;
        this.body.position[1] = y / game.scene.world.ratio;
        this.body.addTo(game.scene.world);
        
        this.sprite.anchor.copy(this.body.anchor);
        
        game.Timer.add(5000, this.remove.bind(this));
    },
    
    remove: function() {
        this.body.remove();
        this.sprite.remove();
        game.scene.removeObject(this);
    },
    
    update: function() {
        this.sprite.position.x = this.body.position[0] * this.body.world.ratio;
        this.sprite.position.y = this.body.position[1] * this.body.world.ratio;
        this.sprite.rotation = this.body.angle;
    }
});

game.createScene('Main2', {
    init: function() {
        this.world = new game.Physics();
        
        var floorBody = new game.Body({
            position: [
                game.width / 2 / this.world.ratio,
                game.height / this.world.ratio + 1
            ]
        });
        var floorShape = new p2.Box({ width: game.width / this.world.ratio, height: 2 });
        floorBody.addShape(floorShape);
        this.world.addBody(floorBody);
    },
    
    mousedown: function(x, y) {
        var banana = new game.PhysicsSprite('banana.png', x, y, {
            data: 'banana.json'
        });
        banana.addTo(this.stage);
    }
});

});
