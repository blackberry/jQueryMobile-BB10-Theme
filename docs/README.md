Getting Started
===============
**Important note:** The meta tag `<meta name="viewport" content="width=device-width, initial-scale=1">` recommended by jQuery Mobile
will need to be removed. This is a temporary issue which should be resolved shortly.

The BlackBerry 10 [UI Guidelines](https://developer.blackberry.com/devzone/resources#uiguides) should be followed when
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
The page transitioning out will not move and the page transitioning in will slide in from the left and cover the original page.
```data-transition="cover"```

New Controls
============
**Note**: All of the core jQuery Mobile controls are still available for use.
Action Bar
----------
![Actionbar](/jasscott/JQM-BB10-Theme/raw/master/docs/figures/Actionbar.png)

To create a actionbar use ```<div data-role="actionbar">```.

To create an optional back button add ```<div data-role="back"></div>```

Add actions to the action bar using ```<div data-role="action">```. Each action should have an image. If there are more than three actions in the actionbar an overflow button will be automatically added to the action bar and the remaining action items will be added to the overflow menu.
Each action should have an ```img``` and a ```p```

An action bar should always been used in a fixed footer.



```
<div data-role="footer" data-position="fixed">
    <div data-role="actionbar">
        <div data-role="back"></div>
        <div id="o1" data-role="action">
            <img src="../plugins/actionbar/assets/generic_81_81_placeholder.png" alt="" />
            <p>1 Settings</p>
        </div>
        <div id="o2" data-role="action">
            <img src="../plugins/actionbar/assets/generic_81_81_placeholder.png" alt="" />
            <p>2 Options</p>
        </div>
        <div id="o3" data-role="action">
            <img src="../plugins/actionbar/assets/generic_81_81_placeholder.png" alt="" />
            <p>3 Options</p>
        </div>
        <div id="o4" data-role="action">
            <img src="../plugins/actionbar/assets/generic_81_81_placeholder.png" alt="" />
            <p>4 Options</p>
        </div>
    </div>
</div>
```
In this example a back button is present and an overflow button will be created. Items o1, o2, o3 will appear in the action bar and o4 will appear in the overflow menu.

A complete example of this can be found in samples/actionbar.

Container
---------
![Container](/jasscott/JQM-BB10-Theme/raw/master/docs/figures/Container.png)

A container to wrap content in.
    
    <div class="BB10Container">
        <h3>BB10 Container</h3>
    </div>
    
An example of this can be found in kitchenSink/building_blocks.html

Divider
-------
![Dividers](/jasscott/JQM-BB10-Theme/raw/master/docs/figures/Dividers.png)

Three new dividers have been added for both the dark and light themes
An example of all these can be found in kitchenSink/building_blocks.html

###Group Divider
`<hr class="BB10group">`

###Standard Divider
`<hr>`

###Gradient Divider
`<hr class="BB10gradient">`


Gridview
--------
![Gridview](/jasscott/JQM-BB10-Theme/raw/master/docs/figures/Gridview.png)

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
![Progress](/jasscott/JQM-BB10-Theme/raw/master/docs/figures/Progress.png)

To create a progress indicator use the HTML5 progress tag. ```<progress id="p" value="40" max="100"></progress>```

To change the value of the progress bar: ```$('#p').progressbar("setValue", p);```

To change the state of the progress bar to _error_ :```$('#p').progressbar("setError", true);```

To change the state of the progress bar to _paused_ :```$('#p').progressbar("pause", true);```

An example of this can be found in kitchenSink/progress.html

BlackBerry Activity Indicator
-------
![BlackBerry Activity Indicator](/jasscott/JQM-BB10-Theme/raw/master/docs/figures/bb-activity-small.png)
![BlackBerry Activity Indicator](/jasscott/JQM-BB10-Theme/raw/master/docs/figures/bb-activity-medium.png)
![BlackBerry Activity Indicator](/jasscott/JQM-BB10-Theme/raw/master/docs/figures/bb-activity-large.png)

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

