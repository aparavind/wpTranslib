(function() {
    tinymce.create("tinymce.plugins.green_button_plugin", {

        //url argument holds the absolute url of our plugin directory
        init : function(ed, url) {
	    var state;

   function my_action() {
        state = !state; /* Switching state */
        ed.fire('mybutton', {state: state});

        if (state){
            alert(state); /* Do your true-stuff here */
        }
        else {
            alert(state); /* Do your false-stuff here */
        }
    }

    function toggleState_MyButton() {
        var self = this;
        ed.on('mybutton', function(e) {
            self.active(e.state);
        });
    }

    /* Adding the button & command */
    ed.addCommand('green_command', my_action);

            //add new button    
            ed.addButton("green", {
                title : "Green Color Text",
                cmd : "green_command",
                image : "https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/32x32/Circle_Green.png",
		onPostRender: toggleState_MyButton
            });

        },

        createControl : function(n, cm) {
            return null;
        },

        getInfo : function() {
            return {
                longname : "Extra Buttons",
                author : "Narayan Prusty",
                version : "1"
            };
        }
    });

    tinymce.PluginManager.add("green_button_plugin", tinymce.plugins.green_button_plugin);
})();


