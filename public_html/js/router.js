define([
    'backbone',
    'views/main',
    'views/scoreboard',
    'views/login',
    'views/game',
    'views/registration',
    'views/chat',
    'views/viewmanager',
    'models/session'
], function(
    Backbone,
    MainView,
    ScoreboardView,
    LoginView,
    GameView,
    RegistrationView,
    ChatView,
    ViewManager,
    session
){

    var views ={main:MainView,
                scoreboard:ScoreboardView,
                game:GameView,
                login:LoginView,
                registration:RegistrationView,
                chat: ChatView
    };
    var manager = new ViewManager(views, '.b-page');
    var Router = Backbone.Router.extend({
        routes: {
            'main':'mainAction',
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'registration': 'registrationAction',
            'chat' : 'ChatAction',
            '*default': 'defaultActions'
        },
        mainAction: function() {
            manager.show('main');
        },
        scoreboardAction: function () {
            manager.show('scoreboard');
        },
        gameAction: function () {
            session.is_authinficated(function(){
                manager.show('game');
            }, function(){
                Backbone.history.navigate();
            });
        },
        loginAction: function () {
            manager.show('login');
        },
        registrationAction: function() {
            manager.show('registration');
        },
        ChatAction: function () {
            manager.show('chat');
        },
        defaultActions: function () {
            this.mainAction();
        }
    });
    return new Router();
});