define([
    'backbone',
    'tmpl/chat',
    'models/session',
    'views/base',
    'underscore'
], function(
    Backbone,
    tmpl,
    session,
    BaseView,
    _
){
    var ChatView = BaseView.extend({
        className:'.b-chat',
        template: tmpl,
        name:'chat',

        render: function () {
            BaseView.prototype.render.call(this);
        },
        show: function () {
            BaseView.prototype.show.call(this);
        },
        hide: function () {
            BaseView.prototype.hide.call(this);
        }
    });
    return new ChatView();
});