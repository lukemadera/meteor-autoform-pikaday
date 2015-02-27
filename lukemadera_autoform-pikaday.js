//variables to store / access across all functions (not sure how to do so otherwise? would have to put these on the element data itself?). BUT must store as instances to keep these separate so multiple instances on the same page do not overwrite each other!
var VAL ={};
var OPTS ={};

var afPikaday ={
  setup: function(instid, ele, template, params) {
    var self =this;

    VAL[instid] =ele.value;

    var optsDefault ={
      formatValue: 'YYYY-MM-DD HH:mm:ssZ',
      pikaday: {
        format: 'MMM D, YYYY h:mmA',
        reposition: false
      }
    };
    OPTS[instid] =EJSON.clone(template.data.atts.opts);
    if(OPTS[instid] ===undefined) {
      OPTS[instid] ={};
    }
    //@todo - use a 3rd party extend function (standalone / very lightweight - not full underscore or lodash)
    var xx;
    if(OPTS[instid].pikaday ===undefined) {
      OPTS[instid].pikaday ={};
    }
    for(xx in optsDefault.pikaday) {
      if(OPTS[instid].pikaday[xx] ===undefined) {
        OPTS[instid].pikaday[xx] =optsDefault.pikaday[xx];
      }
    }
    for(xx in optsDefault) {
      if(OPTS[instid][xx] ===undefined) {
        OPTS[instid][xx] =optsDefault[xx];
      }
    }

    OPTS[instid].pikaday.field =ele;
    OPTS[instid].pikaday.onSelect =function() {
      VAL[instid] =this.getMoment().format(OPTS[instid].pikaday.format);
    };

    var picker = new Pikaday(OPTS[instid].pikaday);

    if(VAL[instid]) {
      //convert from non-display value to display value
      VAL[instid] =moment(VAL[instid], OPTS[instid].formatValue).format(OPTS[instid].pikaday.format);

      self.setVal(instid, picker, {});
    }
  },

  setVal: function(instid, picker, params) {
    picker.setMoment(moment(VAL[instid], OPTS[instid].pikaday.format));
  }
};

AutoForm.addInputType("pikaday", {
  template: "afPikaday",
  valueIn: function(val) {
    //will convert to display value later after set / extend opts and have formats
    // VAL =val;
    return val;
  },
  valueOut: function() {
    var instid =this.attr('data-schema-key');
    var returnVal;
    //convert to non-display value
    if(OPTS[instid].formatValue !==undefined) {
      returnVal =moment(VAL[instid], OPTS[instid].pikaday.format).format(OPTS[instid].formatValue);
    }
    else {
      returnVal =VAL[instid];
    }
    return returnVal;
  }
});

//fix to avoid error for passed in object
// - https://github.com/aldeed/meteor-autoform-bs-datepicker/issues/3
// - https://github.com/aldeed/meteor-autoform-bs-datepicker/commit/3977aa69b61152cf8c0f731a11676b087d2ec9df
Template.afPikaday.helpers({
  atts: function() {
    var atts =EJSON.clone(this.atts);
    // atts.instid ='afPikaday'+Math.random().toString(36).substring(7);
    delete atts.opts;
    return atts;
  }
});

Template.afPikaday.rendered =function() {
  var ele =this.find('input');
  var key =this.data.atts['data-schema-key'];
  afPikaday.setup(key, ele, this, {});
};