# Pugita Header #

A Rails gem / engine to make any Rails 3 app look like engineyard.com.

## Installation ##

Add `pugita_header` to your Gemfile
    
    gem 'pugita_header'

## Usage ##

Get the latest assets so that you can test locally (you can add `public/pugita_header/*` to your .gitignore if you like):

    bundle exec rails generate pugita_header:assets

Wrap your application.html `yield` with the header and footer helpers:

    <% # application.html.erb %>
    <%= pugita_header %>
    <%= yield %>
    <%= pugita_footer %>

If you want to add anything within the `<head></head>` tags or just before the `</body>` tag, you can pass a block to the helpers:

    <%= pugita_header do %>
      <%= stylesheet_link_tag 'additional_styles' %>
    <% end %>
    <%= yield %>
    <%= pugita_footer do %>
      <!--  this comment only appears on my sub-site -->
    <% end %>

## Modifying / Testing ##

Inside this repo is a `dummy` folder, containing a Rails 3 app configured to load the gem. You can use this to add any changes in styles. You can also run:

    `bundle exec cucumber features`
  
...within that folder to test the gem as though it was installed in a Rails app, so that you know it still works.

== Copyright

Copyright (c) 2011 Paul Campbell. See LICENSE.txt for
further details.

