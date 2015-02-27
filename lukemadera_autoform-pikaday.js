var VAL ={};
var OPTS ={};

AutoForm.addInputType("pikaday", {
  template: "afPikaday",
  valueIn: function(val) {
    // console.log(val);   //TESTING
    //will convert to display value later after set / extend opts and have formats
    VAL =val;
    return val;
  },
  valueOut: function() {
    var returnVal;
    //convert to non-display value
    if(OPTS.formatValue !==undefined) {
      returnVal =moment(VAL, OPTS.pikaday.format).format(OPTS.formatValue);
    }
    else {
      returnVal =VAL;
    }
    // console.log(returnVal);   //TESTING
    return returnVal;
  }
});

//fix to avoid error for passed in object
// - https://github.com/aldeed/meteor-autoform-bs-datepicker/issues/3
// - https://github.com/aldeed/meteor-autoform-bs-datepicker/commit/3977aa69b61152cf8c0f731a11676b087d2ec9df
Template.afPikaday.helpers({
  atts: function() {
    var atts =EJSON.clone(this.atts);
    delete atts.opts;
    return atts;
  }
});

Template.afPikaday.rendered =function() {
  var ele =this.find('input');
  var optsDefault ={
    formatValue: 'YYYY-MM-DD HH:mm:ssZ',
    pikaday: {
      format: 'YYYY-MM-DD h:mmA',
      reposition: false
    }
  };
  OPTS =EJSON.clone(this.data.atts.opts);
  if(OPTS ===undefined) {
    OPTS ={};
  }
  //@todo - use a 3rd party extend function (standalone / very lightweight - not full underscore or lodash)
  var xx;
  if(OPTS.pikaday ===undefined) {
    OPTS.pikaday ={};
  }
  for(xx in optsDefault.pikaday) {
    if(OPTS.pikaday[xx] ===undefined) {
      OPTS.pikaday[xx] =optsDefault.pikaday[xx];
    }
  }
  for(xx in optsDefault) {
    if(OPTS[xx] ===undefined) {
      OPTS[xx] =optsDefault[xx];
    }
  }

  OPTS.pikaday.field =ele;
  OPTS.pikaday.onSelect =function() {
    VAL =this.getMoment().format(OPTS.pikaday.format);
  };

  var picker = new Pikaday(OPTS.pikaday);

  if(VAL) {
    //convert from non-display value to display value
    VAL =moment(VAL, OPTS.formatValue).format(OPTS.pikaday.format);

    setVal();
  }

  function setVal(val) {
    picker.setMoment(moment(VAL, OPTS.pikaday.format));
  }
};