!function($,window,document,undefined){"use strict";Foundation.libs.abide={name:"abide",version:"5.5.3",settings:{live_validate:!0,validate_on_blur:!0,focus_on_invalid:!0,error_labels:!0,error_class:"error",timeout:1e3,patterns:{alpha:/^[a-zA-Z]+$/,alpha_numeric:/^[a-zA-Z0-9]+$/,integer:/^[-+]?\d+$/,number:/^[-+]?\d*(?:[\.\,]\d+)?$/,card:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,cvv:/^([0-9]){3,4}$/,email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,url:/^(https?|ftp|file|ssh):\/\/([-;:&=\+\$,\w]+@{1})?([-A-Za-z0-9\.]+)+:?(\d+)?((\/[-\+~%\/\.\w]+)?\??([-\+=&;%@\.\w]+)?#?([\w]+)?)?/,domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,datetime:/^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,time:/^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,dateISO:/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,month_day_year:/^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,day_month_year:/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/},validators:{equalTo:function(el,required,parent){var from=document.getElementById(el.getAttribute(this.add_namespace("data-equalto"))).value,to=el.value,valid=from===to;return valid}}},timer:null,init:function(scope,method,options){this.bindings(method,options)},events:function(scope){function validate(originalSelf,e){clearTimeout(self.timer),self.timer=setTimeout(function(){self.validate([originalSelf],e)}.bind(originalSelf),settings.timeout)}var self=this,form=self.S(scope).attr("novalidate","novalidate"),settings=form.data(this.attr_name(!0)+"-init")||{};this.invalid_attr=this.add_namespace("data-invalid"),form.off(".abide").on("submit.fndtn.abide",function(e){var is_ajax=/ajax/i.test(self.S(this).attr(self.attr_name()));return self.validate(self.S(this).find("input, textarea, select").not(":hidden, [data-abide-ignore]").get(),e,is_ajax)}).on("validate.fndtn.abide",function(e){"manual"===settings.validate_on&&self.validate([e.target],e)}).on("reset",function(e){return self.reset($(this),e)}).find("input, textarea, select").not(":hidden, [data-abide-ignore]").off(".abide").on("blur.fndtn.abide change.fndtn.abide",function(e){var id=this.getAttribute("id"),eqTo=form.find('[data-equalto="'+id+'"]');settings.validate_on_blur&&settings.validate_on_blur===!0&&validate(this,e),"undefined"!=typeof eqTo.get(0)&&eqTo.val().length&&validate(eqTo.get(0),e),"change"===settings.validate_on&&validate(this,e)}).on("keydown.fndtn.abide",function(e){var id=this.getAttribute("id"),eqTo=form.find('[data-equalto="'+id+'"]');settings.live_validate&&settings.live_validate===!0&&9!=e.which&&validate(this,e),"undefined"!=typeof eqTo.get(0)&&eqTo.val().length&&validate(eqTo.get(0),e),"tab"===settings.validate_on&&9===e.which?validate(this,e):"change"===settings.validate_on&&validate(this,e)}).on("focus",function(e){navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i)&&$("html, body").animate({scrollTop:$(e.target).offset().top},100)})},reset:function(form,e){var self=this;form.removeAttr(self.invalid_attr),$("["+self.invalid_attr+"]",form).removeAttr(self.invalid_attr),$("."+self.settings.error_class,form).not("small").removeClass(self.settings.error_class),$(":input",form).not(":button, :submit, :reset, :hidden, [data-abide-ignore]").val("").removeAttr(self.invalid_attr)},validate:function(els,e,is_ajax){for(var validations=this.parse_patterns(els),validation_count=validations.length,form=this.S(els[0]).closest("form"),submit_event=/submit/.test(e.type),i=0;validation_count>i;i++)if(!validations[i]&&(submit_event||is_ajax))return this.settings.focus_on_invalid&&els[i].focus(),form.trigger("invalid.fndtn.abide"),this.S(els[i]).closest("form").attr(this.invalid_attr,""),!1;return(submit_event||is_ajax)&&form.trigger("valid.fndtn.abide"),form.removeAttr(this.invalid_attr),!is_ajax},parse_patterns:function(els){for(var i=els.length,el_patterns=[];i--;)el_patterns.push(this.pattern(els[i]));return this.check_validation_and_apply_styles(el_patterns)},pattern:function(el){var type=el.getAttribute("type"),required="string"==typeof el.getAttribute("required"),pattern=el.getAttribute("pattern")||"";return this.settings.patterns.hasOwnProperty(pattern)&&pattern.length>0?[el,this.settings.patterns[pattern],required]:pattern.length>0?[el,new RegExp(pattern),required]:this.settings.patterns.hasOwnProperty(type)?[el,this.settings.patterns[type],required]:(pattern=/.*/,[el,pattern,required])},check_validation_and_apply_styles:function(el_patterns){var i=el_patterns.length,validations=[];if(0==i)return validations;var form=this.S(el_patterns[0][0]).closest("[data-"+this.attr_name(!0)+"]");for(form.data(this.attr_name(!0)+"-init")||{};i--;){var parent,valid,el=el_patterns[i][0],required=el_patterns[i][2],value=el.value.trim(),direct_parent=this.S(el).parent(),validator=el.getAttribute(this.add_namespace("data-abide-validator")),is_radio="radio"===el.type,is_checkbox="checkbox"===el.type,label=this.S('label[for="'+el.getAttribute("id")+'"]'),valid_length=required?el.value.length>0:!0,el_validations=[];if(el.getAttribute(this.add_namespace("data-equalto"))&&(validator="equalTo"),parent=direct_parent.is("label")?direct_parent.parent():direct_parent,is_radio&&required)el_validations.push(this.valid_radio(el,required));else if(is_checkbox&&required)el_validations.push(this.valid_checkbox(el,required));else if(validator){for(var validators=validator.split(" "),last_valid=!0,all_valid=!0,iv=0;iv<validators.length;iv++)valid=this.settings.validators[validators[iv]].apply(this,[el,required,parent]),el_validations.push(valid),all_valid=valid&&last_valid,last_valid=valid;all_valid?(this.S(el).removeAttr(this.invalid_attr),parent.removeClass("error"),label.length>0&&this.settings.error_labels&&label.removeClass(this.settings.error_class).removeAttr("role"),$(el).triggerHandler("valid")):(this.S(el).attr(this.invalid_attr,""),parent.addClass("error"),label.length>0&&this.settings.error_labels&&label.addClass(this.settings.error_class).attr("role","alert"),$(el).triggerHandler("invalid"))}else if(el_patterns[i][1].test(value)&&valid_length||!required&&el.value.length<1||$(el).attr("disabled")?el_validations.push(!0):el_validations.push(!1),el_validations=[el_validations.every(function(valid){return valid})],el_validations[0])this.S(el).removeAttr(this.invalid_attr),el.setAttribute("aria-invalid","false"),el.removeAttribute("aria-describedby"),parent.removeClass(this.settings.error_class),label.length>0&&this.settings.error_labels&&label.removeClass(this.settings.error_class).removeAttr("role"),$(el).triggerHandler("valid");else{this.S(el).attr(this.invalid_attr,""),el.setAttribute("aria-invalid","true");var errorElem=parent.find("small."+this.settings.error_class,"span."+this.settings.error_class),errorID=errorElem.length>0?errorElem[0].id:"";errorID.length>0&&el.setAttribute("aria-describedby",errorID),parent.addClass(this.settings.error_class),label.length>0&&this.settings.error_labels&&label.addClass(this.settings.error_class).attr("role","alert"),$(el).triggerHandler("invalid")}validations=validations.concat(el_validations)}return validations},valid_checkbox:function(el,required){var el=this.S(el),valid=el.is(":checked")||!required||el.get(0).getAttribute("disabled");return valid?(el.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class),$(el).triggerHandler("valid")):(el.attr(this.invalid_attr,"").parent().addClass(this.settings.error_class),$(el).triggerHandler("invalid")),valid},valid_radio:function(el,required){for(var name=el.getAttribute("name"),group=this.S(el).closest("[data-"+this.attr_name(!0)+"]").find("[name='"+name+"']"),count=group.length,valid=!1,disabled=!1,i=0;count>i;i++)group[i].getAttribute("disabled")?(disabled=!0,valid=!0):group[i].checked?valid=!0:disabled&&(valid=!1);for(var i=0;count>i;i++)valid?(this.S(group[i]).removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class),$(group[i]).triggerHandler("valid")):(this.S(group[i]).attr(this.invalid_attr,"").parent().addClass(this.settings.error_class),$(group[i]).triggerHandler("invalid"));return valid},valid_equal:function(el,required,parent){var from=document.getElementById(el.getAttribute(this.add_namespace("data-equalto"))).value,to=el.value,valid=from===to;return valid?(this.S(el).removeAttr(this.invalid_attr),parent.removeClass(this.settings.error_class),label.length>0&&settings.error_labels&&label.removeClass(this.settings.error_class)):(this.S(el).attr(this.invalid_attr,""),parent.addClass(this.settings.error_class),label.length>0&&settings.error_labels&&label.addClass(this.settings.error_class)),valid},valid_oneof:function(el,required,parent,doNotValidateOthers){var el=this.S(el),others=this.S("["+this.add_namespace("data-oneof")+"]"),valid=others.filter(":checked").length>0;if(valid?el.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class):el.attr(this.invalid_attr,"").parent().addClass(this.settings.error_class),!doNotValidateOthers){var _this=this;others.each(function(){_this.valid_oneof.call(_this,this,null,null,!0)})}return valid},reflow:function(scope,options){var self=this,form=self.S("["+this.attr_name()+"]").attr("novalidate","novalidate");self.S(form).each(function(idx,el){self.events(el)})}}}(jQuery,window,window.document);