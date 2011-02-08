require 'rails/generators'
module EngineyardTheme
  class AssetsGenerator < Rails::Generators::Base
    desc "Generate the assets for engineyard.com to test your app"
  
    def self.source_root
      File.expand_path('../../dummy/public/', File.dirname(__FILE__))
    end
  
    def copy_assets
      directory 'engineyard-theme', 'public/engineyard-theme'
    end
  
  end
end