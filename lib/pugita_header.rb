module PugitaHeader
  class Engine < Rails::Engine
    initializer 'PugitaHeader.helper' do |app|
      ActionView::Base.send :include, PugitaEngineHelper
      ActionView::Base.send :include, StaticHelper
    end
    
    generators do
      require "generators/pugita_header_generator"
    end
  end
end