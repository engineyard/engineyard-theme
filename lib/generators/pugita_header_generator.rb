require 'rails/generators'
module PugitaHeader
  class AssetsGenerator < Rails::Generators::Base
    desc "Generate the assets for engineyard.com to test your app"
  
    def self.source_root
      File.expand_path('../../dummy/public/', File.dirname(__FILE__))
    end
  
    def copy_assets
      directory 'pugita_header', 'public/pugita_header'
    end
  
  end
end