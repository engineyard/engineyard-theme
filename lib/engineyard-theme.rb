module EngineyardTheme
  class Engine < Rails::Engine
    initializer 'EngineyardTheme.helper' do |app|
      ActionView::Base.send :include, EngineyardThemeHelper
      ActionView::Base.send :include, StaticHelper
    end
    
    generators do
      require "generators/engineyard_theme_generator"
    end
  end
end