game.module(
    'game.main'
)
.require(
    'plugin.p2'
)
.body(function() {
    
game.addAsset('objects.atlas');

game.createScene('Main', {
    init: function() {
        this.backgroundColor = '#cceeff';
        this.makeFloor();
    },
    
    makeFloor: function() {
        for(var i=0; i<8; i++) {
            var floor = new game.Sprite('floor.png');
            floor.position.set(i*floor.width, game.height-floor.height);
            floor.addTo(this.stage);
        }
    }
});

});