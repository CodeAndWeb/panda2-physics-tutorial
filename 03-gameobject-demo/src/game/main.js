game.module(
    'game.main'
)
.require(
    'plugin.p2'
)
.body(function() {
    
game.addAsset('objects.atlas');
game.addAsset('objects.json');

game.createScene('Main', {
    init: function() {
        this.world = new game.Physics();
        
        this.backgroundColor = '#cceeff';
        this.makeFloor();
        
        new game.GameObject(game.width/2, 100, "crate");
    },
    
    mousedown: function(x, y) {
        var shapes = ['banana', 'crate', 'cherries', 'orange'];
        var shape = shapes[Math.floor(Math.random() * Math.floor(shapes.length))];
        
        new game.GameObject(x, y, shape);
    },
    
    makeFloor: function() {
        for(var i=0; i<8; i++) {
            var size = 128;
            var floor = new game.PhysicsSprite('floor.png', i*size+size/2, game.height-size/2 );
            floor.addTo(this.stage);
        }
    }
});

game.createClass('GameObject', {
    init: function(x, y, objectType) {
        this.sprite = new game.Sprite(objectType+'.png');
        this.sprite.anchorCenter();
        this.sprite.addTo(game.scene.stage);
        
        this.body = game.Body.fromData('objects.json', objectType);
        this.body.position[0] = x / game.scene.world.ratio;
        this.body.position[1] = y / game.scene.world.ratio;
        this.body.addTo(game.scene.world);
    },
    
    update: function() {
        this.sprite.position.x = this.body.position[0] * this.body.world.ratio;
        this.sprite.position.y = this.body.position[1] * this.body.world.ratio;
        this.sprite.rotation = this.body.angle;
    }
});

});