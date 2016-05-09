/**
 * Created by danil on 17.04.16.
 */
define([
    'backbone',
    'game/game_objects/balls',
    'game/game_objects/blocks',
    'game/game_objects/platforms'
], function(
    Backbone,
    balls_initialize,
    blocks_initialize,
    platforms_initialize
){
    var URL = 'api/v1/game'
    var GameState = Backbone.Model.extend({
        defaults: {
            'login': '',
            'score': 0
        },
        initialize: function (wrapper) {
            this.blocks = blocks_initialize(wrapper);
            this.your_ball =  balls_initialize(wrapper,'your') ;
            this.your_platform = platforms_initialize(wrapper,'your');
            this.another_ball = balls_initialize(wrapper,'another') ;
            this.another_platform = platforms_initialize(wrapper,'another');
            //this.save({},{        правильно
            //   success:function(){
            //       this.fetch();
            //   }.bind(this)
            //});
            this.id = 1;
            this.socket = new WebSocket('ws://127.0.0.1:8100');
            this.fetch();


        },
        sync: function(method, model, options ){
            var handlers ={};
            //handlers['create'] = function(){
            //    $.ajax(URL,{
            //        method: 'GET',
            //        success:function(data){
            //            this.id = data.id;
            //            this.socket = new WebSocket('ws://127.0.0.1:8100');
            //            if(options.success){
            //                options.success(data);
            //            }
            //        }.bind(this),
            //        error:function(){
            //            if(options.error){
            //                options.error();
            //            }
            //        }
            //    });
            //}.bind(this);
            handlers['update'] = function(){
                if(options.attrs){
                    this.socket.send(JSON.stringify(options.attrs));
                }
            }.bind(this);
            handlers['read'] = function(){
                this.socket.onmessage = function (event) {
                    this.your_ball.copy(event.data.your_ball);
                    this.your_platform.copy(event.data.your_platform);
                    this.another_ball.copy( event.data.another_ball);
                    this.another_platform.copy(event.data.another_platform);
                    this.blocks.matrix = event.data.blocks;
                }.bind(this);
            }.bind(this);
            handlers['delete'] = function(){
                this.socket.close(1000);
            }.bind(this);
            handlers[method]();
        },
        toJSON: function () {
            return {
                blocks: this.blocks.matrix,
                your_ball: this.your_ball,
                your_plaform: this.your_plaform,
                another_ball: this.another_ball,
                another_plaform: this.another_plaform
            };
        },
        left: function () {
            this.send_action('left');
            this.your_platform.vx = -5;
        },
        right: function () {
            this.send_action('right');
            this.your_platform.vx = 5;
        },
        stop_platform: function () {
            this.send_action('stop');
            this.your_platform.vx = 0;
        },
        send_action: function(action){
            this.save({},{
                attrs:{'action':action }
            });
        },
        end_game: function(){
            this.destroy();
        }
    });

    return GameState;
});