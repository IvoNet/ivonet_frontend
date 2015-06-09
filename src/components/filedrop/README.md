#File Drop Zone



Don't forget to create a binding variable for the file and filename properties in the controller

De image-container needs some css to make it look better.


```html

<div class="dropzone" file-dropzone="[image/png, image/jpeg, image/gif]"
     data-file="dash.image" data-filename="dash.imageFileName" data-max-file-size="3">
    <span>Drop Image Here</span>
</div>
<div class="image-container">
    <img ng-src={{dash.image}}/>
    <span class="file-name">{{dash.imageFileName}}</span>
</div>

```


## Possible improvements

* default max size (configurable) as the default is now umlimited (unwelcome)
* wrap this in a service specific for image uploads / epubs / etc.


## TODO

* Unit test. How do I do this?
* How do I fake a drag and drop event in a unit test?
