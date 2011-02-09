# Engine Yard Theme #

A Rails gem / engine to make any Rails 3 app look like engineyard.com. Provides a generator for static assets and `header` and `footer` helper methods to dress your site in the shirt and pants of the Engine Yard theme.

## Installation ##

Add `engineyard-theme` to your Gemfile
    
    gem 'engineyard-theme'

## Usage ##

Get the latest assets so that you can test locally (you can add `public/engineyard-theme/*` to your .gitignore if you like):

    bundle exec rails generate engineyard_theme:assets

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

## Modifying / Testing ##

Inside this repo is a `example` folder, containing a Rails 3 app configured to load the gem. You can use this to add any changes in styles. You can also run:

    bundle exec cucumber features
  
...within that folder to test the gem as though it was installed in a Rails app, so that you know it still works.

## Copyright ##

Copyright (c) 2011 Engine Yard Inc. See LICENSE.txt for
further details.

