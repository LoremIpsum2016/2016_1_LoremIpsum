define([
    'backbone'
], function(
    Backbone
){

    var PlatformModel = Backbone.Model.extend({
        constructor: function()
        {
            this.color = "white";
            this.width =  50;
            this.height = 5;
            this.vx = 6;
            this.direction = 0;

            Backbone.Model.apply(this, arguments);

        },
        go_left:function()
        {
            this.direction=-1;
        },
        go_right:function()
        {
          this.direction=1;
        },
        stop: function()
        {
           this.direction=0;
        },
        next_position:function()
        {
           return (this.x + this.direction*this.vx);
        },
        left:function()
        {
            return this.x;
        },
        right:function()
        {
           return (this.x+this.width);
        }



    });

    return PlatformModel;
});