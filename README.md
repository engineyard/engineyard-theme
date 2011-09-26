# Engine Yard Theme #

A Rails gem / engine to make any Rails 3.1 app look like engineyard.com. Provides a generator for static assets and `header` and `footer` helper methods to dress your site in the shirt and pants of the Engine Yard theme.

## Installation ##

Add `engineyard-theme` to your Gemfile
    
    gem 'engineyard-theme'

## Usage ##

Wrap your application.html `yield` with the header and footer helpers:

    <% # application.html.erb %>
    <%= header %>
    <%= yield %>
    <%= footer %>

If you want to add anything within the `<head></head>` tags or just before the `</body>` tag, you can pass a block to the helpers:

    <%= header do %>
      <%= stylesheet_link_tag 'additional_styles' %>
    <% end %>
    <%= yield %>
    <%= footer do %>
      <!--  this comment only appears on my sub-site -->
    <% end %>

Default navigation links and default web service javascript (Google Analytics, Optimizely, etc.) can be disabled by setting values to false:

    header(add_navigation,add_js)

The layout supports content overwritting by supplying defining `content_for` the following:

    title, description, keywords, body_id, branding


## Modifying / Testing ##

Inside this repo is a `example` folder, containing a Rails 3.1 app configured to load the gem. You can use this to add any changes in styles. You can also run:

    bundle exec cucumber features
  
...within that folder to test the gem as though it was installed in a Rails app, so that you know it still works.

## Copyright ##

Copyright (c) 2011 Engine Yard Inc. See LICENSE.txt for
further details.

