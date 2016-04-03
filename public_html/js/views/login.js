define([
    'backbone',
    'tmpl/login',
    'utils/data_validator',
    'utils/error_message',
    'models/session',
    'views/base',
    'underscore'
], function(
    Backbone,
    tmpl,
    validate,
    error_message,
    session,
    BaseView,
    _
){
    var PASSWORD_VALIDATE_OPTIONS={'required':true};
    var NICKNAME_VALIDATE_OPTIONS={'required':true};
    var VALIDATED_FIELDS ={'nickname':NICKNAME_VALIDATE_OPTIONS,
                           'password':PASSWORD_VALIDATE_OPTIONS};
    var DELAY =10;


    var LoginView = BaseView.extend({
        el:'#login',
        template: tmpl,
        events: {
            'submit':'submit_handler'
        },
        name:'login',
        error_templates: {
            'INVALID':function(field_name) {
                return 'Invalid ' + field_name;
            },
            'REQUIRED':function(data) {
                return  data['field_name'] + ' is required';
            },
            'SERVER_ERROR':function() {
                return "Invalid email or password";
            }
        },
        initialize: function () {
            BaseView.prototype.initialize.call(this);
            _.bindAll(this,'login_fail','login_success');
        },
        render: function () {
            BaseView.prototype.render.call(this);
        },
        show: function () {
            BaseView.prototype.show.call(this);
             this.form = document.forms['login'];
        },
        hide: function () {
            BaseView.prototype.hide.call(this);
        },
        login_success:function(){
            this.hide();
            Backbone.history.navigate('main', true);
        },
        login_fail:function(){
            error_message({
                'validation_result': session.request_error,
                'error_templates': this.error_templates
            })
        },
        submit_handler: function(event)
        {
            event.preventDefault();
            if(!error_message({'validation_result':validate(this.form.elements,VALIDATED_FIELDS),
                               'error_templates':this.error_templates})) {
                session.login(this.form.elements['nickname'].value,
                              this.form.elements['password'].value,
                              this.login_success,this.login_fail);
            }
        }
    });
    return new LoginView();
});