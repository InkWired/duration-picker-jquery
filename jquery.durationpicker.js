/*!
 * Duration Picker jQuery Plugin v.1.0.0 to set duration in days, hours and minutes
 * https://github.com/InkWired/duration-picker-jquery
 *
 * Copyright (c) 2019 InkWired
 *
 * Licensed under the MIT license
 */

(function($) {
    
    var DurationPicker = function (el, options) {
        this.$options = $.extend({}, DurationPicker.DEFAULTS, options);
        this.$el = $(el);
        this.selectDays = null;
        this.selectHours = null;
        this.selectMins = null;
        this.container = null;
        this.oldElemType = 'text';
        this.eventToCallbackMap = {};
        this.init();
    };

    /**
     * Default options
     */
    DurationPicker.DEFAULTS = {
        class: '',
        showDays: true,
        showHours: true,
        showMins: true,
        daysLabel: 'Days',
        hoursLabel: 'Hours',
        minsLabel: 'Minutes',
        allowZeroTime: true,
        minsJump: 5
    };
    
    /**
     * Init function
     */
    DurationPicker.prototype.init = function () {
        this.initContainer();
        if(this.$el.prop("disabled")){
            this.disable();
        }
    };
    
    /**
     * This will create the container with the selected options 
     */
    DurationPicker.prototype.initContainer = function () {
        var durationPicker = this;
        
        durationPicker.oldElemType = durationPicker.$el.prop("type");
        durationPicker.$el.prop("type", "hidden");
        
        //Main Container
        durationPicker.container = $('<div/>', {
            class: 'duration-picker-container ' + durationPicker.$options.class
        });
        
        //Setting days
        durationPicker.selectDays = $('<select/>', {
            name: "duration-picker-days",
            class: "duration-picker-days"
        });
        
        for($i=0; $i<=30; $i++){
            durationPicker.selectDays.append(new Option($i, $i));
        }
        
        //Setting hours
        durationPicker.selectHours = $('<select/>', {
            name: "duration-picker-hours",
            class: "duration-picker-hours"
        });
        
        for($i=0; $i<=23; $i++){
            durationPicker.selectHours.append(new Option($i, $i));
        }
        
        //Setting Mins
        durationPicker.selectMins = $('<select/>', {
            name: "duration-picker-mins",
            class: "duration-picker-mins"
        });
        
        var mins_start = 0;
        /*if(!durationPicker.$options.allowZeroTime){
            mins_start = 1;
        }*/
        
        for($i=mins_start; $i*durationPicker.$options.minsJump<60; $i++){
            durationPicker.selectMins.append(new Option($i*durationPicker.$options.minsJump, $i*durationPicker.$options.minsJump));
        }
        
        //Generating the pickers
        if(durationPicker.$options.showDays){
            durationPicker.container.append(durationPicker.selectDays).append(" " + durationPicker.$options.daysLabel);
            durationPicker.selectDays.change(function(){
                durationPicker.checkDurationPicker();
            });
        }
        
        if(durationPicker.$options.showHours){
            durationPicker.container.append(durationPicker.selectHours).append(" " + durationPicker.$options.hoursLabel);
            durationPicker.selectHours.change(function(){
                durationPicker.checkDurationPicker();
            });
        }
        
        if(durationPicker.$options.showMins){
            durationPicker.container.append(durationPicker.selectMins).append(" " + durationPicker.$options.minsLabel);
            durationPicker.selectMins.change(function(){
                durationPicker.checkDurationPicker();
            });
        }
        
        durationPicker.container.insertBefore(durationPicker.$el);
        
        //Initializing the duration picker
        durationPicker.setValue((durationPicker.$el.val()!=="")?durationPicker.$el.val():0);
    };
    
    /**
     * To destroy the duration picker
     */
    DurationPicker.prototype.destroy = function () {
        this.$el.prop("type", this.oldElemType);
        this.container.remove();
    };

    /**
     * To enable duration picker
     */
    DurationPicker.prototype.enable = function () {
        this.container.find("select").prop("disabled", false);
    };

    /**
     * To disable duration picker
     */
    DurationPicker.prototype.disable = function () {
        this.container.find("select").prop("disabled", "disabled");
    };
    
    /**
     * To get the selected duration in seconds
     */
    DurationPicker.prototype.getValue = function(){
        return this.$el.val();
    }
    
    /**
     * To set the duration (seconds)
     */
    DurationPicker.prototype.setValue = function($secs){
        
        var $secsToSet = parseInt($secs);

        var tDays = parseInt($secsToSet/86400);

        var tHours = $secsToSet%86400;
        tHours = parseInt(tHours/3600);

        var tMins = $secsToSet%3600;
        tMins = parseInt(tMins/60);
        if(tMins===0 && !this.$options.allowZeroTime && tDays===0 && tHours===0){
            tMins=this.$options.minsJump;
        }
        else if(tMins%this.$options.minsJump!==0){
            tMins = Math.round(tMins/this.$options.minsJump)*this.$options.minsJump;
        }

        this.selectDays.val(tDays);
        this.selectDays.trigger("change");
        
        this.selectHours.val(tHours);
        this.selectHours.trigger("change");
        
        this.selectMins.val(tMins);
        this.selectMins.trigger("change");
    }
    
    /**
     * Called when any of the time units change.
     */
    DurationPicker.prototype.checkDurationPicker = function(){
        
        var $secs = 0;
        if(this.$options.showMins){
            var $mins_before = parseInt(this.selectMins.val());
            $mins_start = 0;
            if(!this.$options.allowZeroTime && parseInt(this.selectDays.val())===0 && parseInt(this.selectHours.val())===0){
                $mins_start = 1;
            }

            this.selectMins.empty();
            for($i=$mins_start; $i*this.$options.minsJump<60; $i++){
                this.selectMins.append(new Option($i*this.$options.minsJump, $i*this.$options.minsJump));
            }

            if($mins_before===0 && $mins_start===1){
                this.selectMins.val(this.$options.minsJump);
            }
            else{
                this.selectMins.val($mins_before);
            }
            
            $secs += this.selectMins.val()*60;
        }
        
        if(this.$options.showHours){
            $secs += this.selectHours.val()*3600;
        }
        
        if(this.$options.showDays){
            $secs += this.selectDays.val()*86400;
        }
        
        this.$el.val($secs);

        //this.trigger('change', $secs);
        this.$el.trigger("change");
    };
    
    var allowedMethods = [
        'setValue',
        'destroy',
        'enable',
        'disable'
    ];
 
    // Plugin definition.
    $.fn.durationPicker = function( options ) {
        var args = Array.prototype.slice.call(arguments, 1);

        if (typeof options === 'string' && options==='getValue') {
            if($(this).length>0){
                var data = $(this).first().data('durationPicker');;
                return data[options].apply(data, args);
            }
        }
        else{
            return this.each(function() {
                var value;
                var data = $(this).data('durationPicker');
                if (typeof options === 'string') {
                    
                    if ($.inArray(options, allowedMethods) < 0) {
                        throw new Error("Unknown method: " + options);
                    }

                    if (!data) {
                        return;
                    }

                    value = data[options].apply(data, args);
                    
                    if (options === 'destroy') {
                        $(this).removeData('durationPicker');
                    }
                }

                if (!data) {
                    $(this).data('durationPicker', (data = new DurationPicker(this, options)));
                }
                
                //return typeof value === 'undefined' ? data : value;
            });
        }
    };

    $.fn.durationpicker = $.fn.durationPicker;
 
})(jQuery);