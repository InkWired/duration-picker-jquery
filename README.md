
# Duration Picker
> Duration Picker Plugin for jQuery.

## Table of contents
- [Features](#features)
- [Requirement](#requirement)
- [Main](#main)
- [Getting started](#getting-started)
- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [Browser support](#browser-support)
- [Help](#help)
- [License](#license)

## Features
- Supports picking days, hours, minutes as separate options
- Supports setting custom interval
- Supports custom labels
- Supports custom CSS
- Supports touch (mobile)
- Cross-browser support

## Requirement
* [jQuery](http://jquery.com/) (>= 1.7)

## Main
```text
dist/
├── jquery.durationpicker.min.css
├── jquery.durationpicker.min.js
```

## Getting started

### Installation
In browser:

```html
<link  href="/path/to/jquery.durationpicker.min.js" rel="stylesheet">
<script src="/path/to/jquery.durationpicker.min.css"></script>
```

[jsDelivr](https://www.jsdelivr.com/) provides CDN support for Duration Picker's CSS and JavaScript. You can find the links [here](https://cdn.jsdelivr.net/gh/InkWired/duration-picker-jquery@1.0.0/dist/).

### Usage
```javascript
$('.some-inputs').durationpicker(options);
```

Include `jquery.durationpicker.min.css` and `jquery.durationpicker.min.js` in your page.

```options``` is an optional javascript object with parameters explained in the [Options](#options) section.

[⬆ back to top](#table-of-contents)

## Options
|Name   |Type   |Default   |Description   |
| ------------ | ------------ | ------------ | ------------ |
|class|String|`''`|To specify the class for the duration picker element.   |
|showDays   |  Boolean |`true`   |Whether to show Days   |
|showHours   |  Boolean |`true`   |Whether to show Hours   |
|showMins   |  Boolean |`true`   |Whether to show Minutes   |
|daysLabel   |  String |`Days`   |Label to be used for Days Element   |
|hoursLabel   |  String |`Hours`   |Label to be used for Hours Element   |
|minsLabel   |  String |`Minutes`   |Label to be used for Minutes Element   |
|allowZeroTime   |  Boolean |`true`   |Whether the duration can be zero.   |
|minsJump   |  Number |`5`   |Interval to be used for Minutes element   |

[⬆ back to top](#table-of-contents)

## Methods

### setValue
Set the time using seconds.

```javascript
$('#example').durationpicker('setValue', 3900); //1 hour 5 minutes
```
### getValue
Get the time in seconds.

```javascript
var duration = $('#example').durationpicker('getValue');
```
### enable
To enable the duration picker element.

```javascript
$('#example').durationpicker('enable');
```
### disable
To disable the duration picker element.

```javascript
$('#example').durationpicker('disable');
```

### destroy
To destroy the duration picker element.

```javascript
$('#example').durationpicker('destroy');
```

[⬆ back to top](#table-of-contents)

## Events

### change
The native ```onChange``` event will fire any time the input value is updated.

Your code should bind to ```change``` event or use [event delegation](http://api.jquery.com/on/).

## Browser support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 9+

## Help
Submit a [GitHub Issue Request](https://github.com/InkWired/duration-picker-jquery/issues/new). Please provide code that demonstrates the problem, you can use [jsFiddle](http://jsfiddle.net/) and add the link while creating the issue.

## License
[MIT](https://opensource.org/licenses/MIT) © [InkWired](https://www.inkwired.com)

[⬆ back to top](#table-of-contents)