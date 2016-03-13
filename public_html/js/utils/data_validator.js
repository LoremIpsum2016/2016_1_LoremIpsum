/**
 * Created by danil on 10.03.16.
 */
define([
    'backbone',
    'models/validation_error'
], function(
    Backbone,
    ValidationError
){
    var REGEX_NOT_FOUND=-1;
    var REGEX_DICT =
    {
      'email':/(\d|\w)+\@(\d|\w)+\..*/,
      'password':/[0-9a-zA-Z_!@#$%^&*()]+/,
      'username':/[0-9a-zA-Z_!@#$%^&*()]+/
    };
    var field_validate = function(data,options,field)
    {
        if (!data.length  && options['required'])
        {
            return new ValidationError("REQUIRED",field);
        }

        if(data.search(REGEX_DICT[options['type']]) === REGEX_NOT_FOUND)
        {
            return new ValidationError("INVALID",field);

        }
        if(options['min_length'] && data.length < options['min_length'])
        {
            return new ValidationError("TO SHORT",{'field':field,
                                       'min_length':options['min_length']});

        }
        if(options['max_length'] && data.length  > options['max_length'])
        {
            return new ValidationError("TO LONG",{'field':field,
                'max_length':options['max_length']});
        }


    };
    var validate=function(form,field_options,must_match)
    {
        var validate_result;
        for (field in field_options)
        {
            validate_result = field_validate(form.elements[field].value,
                                                    field_options[field],field);
            if(validate_result)
            {
                return validate_result;

            }

        }
        for (key in must_match)
        {
            if(form.elements[must_match[key]].value !==
                form.elements[key].value)
            {
                return new ValidationError
                            ('MUST_MATCH',{key:must_match[key]});
            }


        }
    };

    return validate;
});