# lukemadera:autoform-pikaday

An add-on Meteor package for aldeed:autoform. Provides a single custom input type, "pikaday", which renders an input that is given Pikaday datepicker functionality.
https://github.com/dbushell/Pikaday


## Dependencies

- aldeed:autoform
- Pikaday (recommended to use `bower` with `mquandalle:bower` package to install, which will auto-include the necessary `pikaday.js` and `pikaday.css` files)
- momentjs:moment


## Installation

In a Meteor app directory:
```bash
meteor add lukemadera:autoform-pikaday
```
Add Pikaday javascript and css files, e.g.: add `"pikaday": "latest"` to your `bower.json` file.


## Usage

Specify "pikaday" for the `type` attribute of any input and set teh SimpleSchema to be an object:

```html
{{> afQuickField name="dueDate" type="pikaday" opts="optsPikaday"}}
```

In the schema, which will then work with a `quickForm` or `afQuickFields`:

```js
AFPikadaySchema =new SimpleSchema({
  dueDate: {
    type: String,
    optional: true
  }
});
```

Specify options, including Pikaday options, with a template helper.

@param {String} [formatValue ='YYYY-MM-DD'] The input and output value format (NOT what is displayed to the user by the Pikaday datepicker per se)
@param {Object} [pikaday] The normal Pikaday options, see: https://github.com/dbushell/Pikaday#configuration
  @param {String} [format ='YYYY-MM-DD'] The Pikaday / input value format that is displayed

```js
if(Meteor.isClient) {
  Template.autoformPikadayBasic.helpers({
    optsPikaday: function() {
      return {
        //WHAT IS STORED (i.e in the database)
        // formatValue: 'YYYY-MM-DD'
        pikaday: {
          //what is DISPLAYED (to the user)
          format: 'MMM D, YYYY'
        }
      }
    }
  });
}
```
