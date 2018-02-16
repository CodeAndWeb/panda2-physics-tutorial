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
        
        var crate = new game.PhysicsSprite("crate.png", game.width/2, 100, {
            data: 'objects.json',
            name: 'crate'
        });
        
        crate.addTo(this.stage);
    },
    
    mousedown: function(x, y) {
        var shapes = ['banana', 'crate', 'cherries', 'orange'];
        var shape = shapes[Math.floor(Math.random() * Math.floor(shapes.length))];
        
        var banana = new game.PhysicsSprite(shape+'.png', x, y, {
            data: 'objects.json',
            name: shape
        });
        banana.addTo(this.stage);
    },
    
    makeFloor: function() {
        for(var i=0; i<8; i++) {
            var size = 128;
            var floor = new game.PhysicsSprite('floor.png', i*size+size/2, game.height-size/2 );
            floor.addTo(this.stage);
        }
    }
});

});