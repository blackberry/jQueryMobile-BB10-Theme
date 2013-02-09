Getting Started
===============
**Important note:** The meta tag `<meta name="viewport" content="width=device-width, initial-scale=1">` recommended by jQuery Mobile
will need to be removed. This is a temporary issue which should be resolved shortly. Alternately you can replace the meta tag with the following meta tag from this [Knowledge Base article](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/How-to-set-up-the-viewport-for-a-BlackBerry-WebWorks-application/ta-p/1943807)
```
<head>
    <title>BlackBerry 10 jQuery Mobile Kitchensink</title>
    <link rel="stylesheet" href="BlackBerry-JQM-all.min.css" />
    <script>
        var meta = document.createElement("meta");
        meta.setAttribute('name','viewport');
        meta.setAttribute('content','initial-scale='+ (1/window.devicePixelRatio) + ',user-scalable=no');
        document.getElementsByTagName('head')[0].appendChild(meta);
   </script>
   <script src="BlackBerry-JQM-all.min.js"></script>
</head>
```

The BlackBerry 10 [UI Guidelines](https://developer.blackberry.com/html5/documentation/ui_guidelines.html) should be followed when
using this theme to ensure the best possible user experience.

Head
----
For the BlackBerry 10 theme it is recommended to use the following head:

    <head>
        <title>BlackBerry 10 jQuery Mobile Kitchensink</title>
        <link rel="stylesheet" href="BlackBerry-JQM-all.min.css" />
        <script src="BlackBerry-JQM-all.min.js"></script>
    </head>

All of the required files are compiled into these two files, increasing the overall performance of the site/application.
If you choose not to use these compiled versions, the correct order of the head is:

    <head>
        <title>My Page</title>
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.1.1/jquery.mobile-1.1.1.min.css" />
        <link rel="stylesheet" href="BlackBerry-JQM.css" />
        <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
        <script src="BlackBerry-JQM-Init.js"></script>
        <script src="http://code.jquery.com/mobile/1.1.1/jquery.mobile-1.1.1.min.js"></script>
        <script src="BlackBerry-JQM.js" type="text/javascript"></script>
    </head>


Swatches
--------
BlackBerry 10 has two primary themes a dark theme and a light theme.
The dark theme is represented by `swatch a`, the light theme by `swatch c` and accents use `swatch b`.

New Transition
============
Cover
-----
The page transitioning out will not move and the page transitioning in will slide in from the left and cover the original page.```data-transition="cover"```

New Controls
============
**Note**: All of the core jQuery Mobile controls are still available for use.
Action Bar
----------
![Actionbar](/figures/Actionbar.png)

To create a actionbar use ```<div data-role="actionbar">```.

To create an optional back button add ```<div data-role="back"></div>```. The back button is not present when tabs are in the action bar.
To change the text of the back button set ```$.mobile.page.prototype.options.backBtnText``` to the new value, you will need to do this in the ```mobileinit``` event or before your actionbar is created. 
To set it durning the ```mobileinit``` event, consider the following.
```
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.1.1/jquery.
<link rel="stylesheet" href="../dist/latest/BlackBerry-JQM.css" />

<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
<script> 
    $(document).bind("mobileinit", function() {
        $.mobile.page.prototype.options.backBtnText = "Zur&uuml;ck";
    });
</script>
<script src="../dist/latest/BlackBerry-JQM-Init.js"></script>
<script src="http://code.jquery.com/mobile/1.1.1/jquery.mobile-1.1.1.min.js"></script>
<script src="../dist/latest/BlackBerry-JQM.js" type="text/javascript"></script>
```


Action bar tabs are used for navigational purposes (i.e. switching between views). Add tabs to the action bar using ```<div data-role="tab">```.
Each tab should have an ```img``` and a ```p```. In landscape mode the text ```p``` will be hidden and the actionbar height will decrease.
```
<div id="o1" data-role="tab">
    <img src="../src/plugins/actionbar/assets/generic_81_81_placeholder.png" alt="" />
    <p>1 Settings</p>
</div>
```

To create a tab overflow button use ```data-role="tab-overflow"```. A tab overflow button can be with or without tab content at initialization.

e.g. Without content, shows the tab overflow icon centered in the button.
```
<div id="tover" data-role="tab-overflow">
</div>
```
e.g. With content, shows the tab overflow icon offset to the right and the img and p centered in the button.
```
<div id="tover" data-role="tab-overflow">
    <img src="img/generic_81_81_placeholder.png" alt="" />
    <p>0 Options</p>
</div>
```

Content can be added to the tab overflow button at anytime dynamically, just like you would change the contents of any ```div```.
```
$("#tover").html("<img src='path/to/image.png' alt="" /><p>My Text</p>");
```

If the tab overflow content is changing state from not having content to having content or vice versa. The class ```noContent``` will have to be removed or added respectively.


Action bar actions are used for actions, such as 'Add', 'Share', and 'Edit'. Add actions to the action bar using ```<div data-role="action">```.
Each action should have an ```img``` and a ```p```. 

To create an action overflow button user ```data-role="action-overflow"```. An action overflow button does not have text or an image.
```
<div id="aover" data-role="action-overflow">
</div>
```

Tabs and actions both have a pressed state. This will be applied on 'vmousedown' and removed on 'vmouseup'
Tabs have an active state. This should be manually added by the developer. 
To add the active state, add the class ```active``` to the element with ```data-role="tab"```.

An action bar should always been used in a fixed footer.

In landscape mode when a text input has focus the actionbar will be hidden, so that there is enough space when the keyboard is up.



```
<div data-role="footer" data-position="fixed">
    <div data-role="actionbar">
        <div data-role="back"></div>
        <div id="o1" data-role="action">
            <img src="../src/plugins/actionbar/assets/generic_81_81_placeholder.png" alt="" />
            <p>1 Settings</p>
        </div>
        <div id="o2" data-role="action">
            <img src="../src/plugins/actionbar/assets/generic_81_81_placeholder.png" alt="" />
            <p>2 Options</p>
        </div>
        <div id="o3" data-role="action">
            <img src="../src/plugins/actionbar/assets/generic_81_81_placeholder.png" alt="" />
            <p>3 Options</p>
        </div>
        <div id="o4" data-role="action">
            <img src="../src/plugins/actionbar/assets/generic_81_81_placeholder.png" alt="" />
            <p>4 Options</p>
        </div>
    </div>
</div>
```
In this example a back button is present and an overflow button will be created. Items o1, o2, o3 will appear in the action bar and o4 will appear in the overflow menu.

A complete example of the action bar can be found [here](/kitchenSink/actionbar_sample.html).

To see all the diffent ways to have your actionbar look [here](/kitchenSink/actionbar.html).

Overflow Menus (Panels)
--------------
To create an overflow menu use the [jQuery Mobile panel](http://jquerymobile.com/demos/1.3.0-beta.1/docs/panels/index.html).

To create a __tab overflow__ menu, create a panel ```data-role="panel"``` with the following options
* ```data-position="left"``` - To place it on the left side of the screen
* ```data-display="reveal"``` - So that when we open it, it uses the reveal animation
* ```data-theme="a"``` - So that it is using the dark theme
* ```class="bb10-panel"``` - So that the content is centered and has bounce when scrolled

```
<div data-role="panel" data-position="left" data-display="reveal" data-theme="a" class="bb10-panel">
	<ul data-role="listview" data-theme="a">
		<li class="ui-btn-active"><a href="#">1 Options</a></li>
		<li><a href="#">2 Options</a></li>
		<li><a href="#">3 Options</a></li>
		<li><a href="#">4 Options</a></li>
		<li><a href="#">5 Options</a></li>
	</ul>
</div>
```

To create an __action overflow__ menu, create a panel ```data-role="panel"``` with the following options
* ```data-position="right"``` - To place it on the left side of the screen
* ```data-display="overlay"``` - So that when we open it, it uses the overlay animation
* ```data-theme="a"``` - So that it is using the dark theme
* ```class="bb10-panel"``` - So that the content is centered and has bounce when scrolled

```
<div data-role="panel" data-position="right" data-display="overlay" data-theme="a" class="bb10-panel">
	<ul data-role="listview" data-theme="a">
		<li><a href="#">Acura</a></li>
		<li><a href="#">Audi</a></li>
		<li><a href="#">BMW</a></li>
	</ul>
</div>
```

A complete example of the overflow menus can be found [here](/kitchenSink/actionbar_sample.html).

Container
---------
![Container](/figures/Container.png)

A container to wrap content in.

    <div class="BB10Container">
        <h3>BB10 Container</h3>
    </div>

An example of this can be found in kitchenSink/building_blocks.html

Divider
-------
![Dividers](/figures/Dividers.png)

Three new dividers have been added for both the dark and light themes
An example of all these can be found in kitchenSink/building_blocks.html

###Group Divider
`<hr class="BB10group">`

###Standard Divider
`<hr>`

###Gradient Divider
`<hr class="BB10gradient">`

###List Divider
![Dividers-list-line](/figures/Dividers-list-line.png)

This is the standard list divider from jQuery Mobile
```html
<ul data-role="listview" data-dividertheme="c">
    <li data-role="list-divider">Light Theme</li>
```

###Solid List Divider
![Dividers-list-solid](/figures/Dividers-list-solid.png)

To create a solid list divider add `ui-header-solid' class to your list-divider
```html
<ul data-role="listview" data-dividertheme="b">
    <li data-role="list-divider" class="ui-header-solid">Last Played</li>
```

Gridview
--------
![Gridview](/figures/Gridview.png)

To create a grid view use ```<div data-role="gridview">```.
Each row in the grid needs to be separated by ```<div data-role="row">```.
A header can be placed in between rows using ```<div data-role="list-divider">```.

```
<div data-role="gridview">
    <div data-role="list-divider">
    <h1>Last Played</h1>
    </div>
    <div data-role="row">
        <div><a href="#">
                <img src="img/img1.jpg" alt="" />
                <div data-role="details">
                    <p>Hello</p>
                </div>
        </a></div>
    </div>
    <div data-role="row">
        <div><a href="#"><img src="img/img2.jpg" alt="" /></a></div>
        <div><a href="#"><img src="img/img3.jpg" alt="" /></a></div>
        <div></div>
    </div>
</div>
```

An example of this can be found in kitchenSink/gridview.html.

Progress Indicator
------------------
![Progress](/figures/Progress.png)

To create a progress indicator use the HTML5 progress tag. ```<progress id="p" value="40" max="100"></progress>```

To change the value of the progress bar: ```$('#p').progressbar("setValue", p);```

To change the state of the progress bar to _error_ :```$('#p').progressbar("setError", true);```

To change the state of the progress bar to _paused_ :```$('#p').progressbar("pause", true);```

An example of this can be found in kitchenSink/progress.html

BlackBerry Activity Indicator
-------
![BlackBerry Activity Indicator](/figures/bb-activity-small.png)
![BlackBerry Activity Indicator](/figures/bb-activity-medium.png)
![BlackBerry Activity Indicator](/figures/bb-activity-large.png)

Activity indicators are used to notify the user that a processes is in progress. They typically denote a process that will complete in an unspecified amount of time. Alternately they are suitable for processes that will complete relatively quickly; where progress bars are not meaningful.

## Creation
To create an activity indicator add the data-role attribute: ```data-role="bb-activity-indicator"``` to a ```div``` element.

## Options
Activity indicators come in 3 different sizes: small, medium and large.

To create activity indicators in their respective sizes add the data-size attributes: ```data-size="small"```, ```data-size="medium"``` or ```data-size="large"```

Activity indicators can also be themed.
To apply the BlackBerry 10 light theme add the data-theme attribute ```data-theme="c"```. Alternately add ```data-theme="a"``` for dark theme.

## Option Defaults
```
theme: 'c'

size: 'medium'

speed: '2s'
```

## Methods
Speed: To change the speed of an activity indicator call ```$('selector').activityindicator('speed', seconds);``` where seconds is a string formatted as ```[number]s```.

An Example:
```$('selector').activityindicator('speed', '5s');```

Dropdown / Select Menus
-------
Although jQuery Mobile has support for select menus it does so by using a popup. To make the JQM/BlackBerry10 experience more inline with native, inline select menus have been added.
By default the inline version will be used.
Below is an example of how to change the value of a select menu programmatically 

```
$('select#select-choice-0').val('express');
$('#select-choice-0').dropdown();
```
