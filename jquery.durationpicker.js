/*!
 * Duration Picker jQuery Plugin to set duration in days, hours and minutes
 * https://github.com/InkWired/duration-picker-jquery
 *
 * Copyright (c) 2019 InkWired
 *
 * Licensed under the MIT license
 */

(function( $ ) {
    
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
        
        var _self = this;
    };

    /**
     * Default options
     */
    DurationPicker.DEFAULTS = {
        class: 'duration-picker-container',
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
    };
    
    /**
     * This will create the container with the selected options 
     */
    DurationPicker.prototype.initContainer = function () {
        var durationPicker = this;
        
        durationPicker.oldElemType = durationPicker.$el.attr("type");
        durationPicker.$el.attr("type", "hidden");
        
        //Main Container
        durationPicker.container = $('<div/>', {
            class: durationPicker.$options.class
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
        if(!durationPicker.$options.allowZeroTime){
            mins_start = 1;
        }
        
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
        this.$el.attr("type", this.oldElemType);
        this.container.remove();
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
        if(tMins===0 && !this.$options.allowZeroTime){
            tMins=this.$options.minsJump;
        }
        else if(tMins%this.$options.minsJump!==0){
            tMins = Math.round(tMins/this.$options.minsJump)*this.$options.minsJump;
        }

        this.selectDays.val(tDays);
        this.selectHours.val(tHours);
        this.selectMins.val(tMins);
        
        this.selectDays.trigger("change");
        this.selectHours.trigger("change");
        this.selectMins.trigger("change");
    }

    /**
     * Event attachment.
     */
    DurationPicker.prototype.on = function(evt, callback) {
        this.bindEventHandler(evt, callback);
        return this;
    }

    /**
     * Event binder.
     */
    DurationPicker.prototype.bindEventHandler = function(evt, callback) {
        if(this.eventToCallbackMap[evt] === undefined) {
            this.eventToCallbackMap[evt] = [];
        }
        this.eventToCallbackMap[evt].push(callback);
    }

    /**
     * To trigger event.
     */
    DurationPicker.prototype.trigger = function(evt, val) {
        val = (val || val === 0) ? val : undefined;

        if(this.eventToCallbackMap.hasOwnProperty(evt)){
            var callbackFnArray = this.eventToCallbackMap[evt];
            if(callbackFnArray && callbackFnArray.length) {
                for(var i = 0; i < callbackFnArray.length; i++) {
                    var callbackFn = callbackFnArray[i];
                    callbackFn(val);
                }
            }
        }
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

        this.trigger('change', $secs);
    };
    
    var allowedMethods = [
        'setValue',
        'getValue',
        'destroy'
    ];
 
    // Plugin definition.
    $.fn.durationPicker = function( options ) {
        var value;
        var data = $(this).data('durationPicker');
        if (typeof options === 'string') {
            
            if ($.inArray(options, allowedMethods) < 0) {
                throw new Error("Unknown method: " + options);
            }
            
            var args = Array.prototype.slice.call(arguments, 1);

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
        
        return typeof value === 'undefined' ? data : value;
    };
 
})( jQuery );
