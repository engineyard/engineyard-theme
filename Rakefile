require 'rubygems'
require 'bundler'
begin
  Bundler.setup(:default, :development, :test)
rescue Bundler::BundlerError => e
  $stderr.puts e.message
  $stderr.puts "Run `bundle install` to install missing gems"
  exit e.status_code
end
require 'rake'

PKG_FILES = FileList[
  '[a-zA-Z]*',
  'app/**/*',
  'vendor/**/*',
  'lib/**/*'
]

require 'jeweler'
Jeweler::Tasks.new do |gem|
  # gem is a Gem::Specification... see http://docs.rubygems.org/read/chapter/20 for more options
  gem.name = "engineyard-theme"
  gem.homepage = "http://github.com/engineyard/engineyard-theme"
  gem.license = "MIT"
  gem.summary = %Q{A gem providing helper methods and assets to make any site look like http://engineyard.com}
  gem.description = %Q{View helpers 'header' and 'footer', along with an assets generator to make any site look like http://engineyard.com}
  gem.email = ["paul@rslw.com", "drnicwilliams@gmail.com"]
  gem.authors = ["Paul Campbell", "Dr Nic Williams"]
  gem.files = PKG_FILES.to_a
  gem.add_runtime_dependency 'rails', '~> 3'
end
Jeweler::RubygemsDotOrgTasks.new

