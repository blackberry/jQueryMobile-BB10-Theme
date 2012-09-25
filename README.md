jQuery Mobile BlackBerry 10 Theme - Beta
=========================

Content is subject to change

RIM has been committed to providing the best Web support possible for its BlackBerry platform. Part of that story is to support popular tools and frameworks that Web developers are already familiar with. Our strategy has included experimental efforts such as [bbUI.js](https://github.com/blackberry/bbui.js) where we have honed the details of bringing the BlackBerry 10 design language to the Web, a partnership with [Sencha](http://www.sencha.com/) to make sure the Sencha Touch gets first-class BlackBerry 10 support, and direct contributions and support to [jQuery Mobile](http://www.jquerymobile.com) which today is at the forefront of open source Mobile Web development. This project is the official BlackBerry 10 Theme for jQuery Mobile, which will help developers build Web apps that sport the full BlackBerry 10 look and feel using the framework.


![logo](http://github.rim.net/jasscott/JQM-BB10-Theme/raw/master/kitchenSink/kitchensink.png)
Quick Start
-----------
```
<!DOCTYPE html> 
<html> 
<head> 
	<title>My Page</title> 
	<link rel="stylesheet" href="BlackBerry-JQM-all.min.css" />
	<script src="BlackBerry-JQM-all.min.js"></script>
</head> 
<body> 

<div data-role="page">

	<div data-role="header">
		<h1>My Title</h1>
	</div><!-- /header -->

	<div data-role="content">	
		<p>Hello world</p>		
	</div><!-- /content -->

</div><!-- /page -->

</body>
</html>
```
All of the files you need to get started are in ```dist/``` folder

You will notice that this example does not include jQuery or jQuery mobile, this is because all of the files need are combined into ```BlackBerry-JQM-all.min.css``` and ```BlackBerry-JQM-all.min.js```, this is done to reduce download overhead on the device and improve overall performance. If you prefer to include each file seperatly please check out the [getting started](/jasscott/JQM-BB10-Theme/blob/master/docs/README.md) documentation.




Check out the [docs](/jasscott/JQM-BB10-Theme/blob/master/docs/README.md) for more information.

Advanced
--------
Information on how to modify and build this theme can be found [here](/jasscott/JQM-BB10-Theme/blob/master/docs/advanced/README.md).

Authors
-------
* Jason Scott
* Jonathan Séguin
