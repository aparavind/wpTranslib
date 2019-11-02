<?php

/*
Plugin Name: Visual Editor Buttons
Plugin URI: http://qnimate.com
Description: Adds a button to visual editor.
Author: Narayan Prusty
*/

function enqueue_plugin_scripts($plugin_array)
{
    //enqueue TinyMCE plugin script with its ID.
    $plugin_array["green_button_plugin"] =  plugin_dir_url(__FILE__) . "index.js";
    return $plugin_array;
}

add_filter("mce_external_plugins", "enqueue_plugin_scripts");

function register_buttons_editor($buttons)
{
    //register buttons with their id.
    array_push($buttons, "green");
    return $buttons;
}

add_filter("mce_buttons", "register_buttons_editor");
