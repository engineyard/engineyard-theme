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
  'example/public/engineyard-theme/**/*',
  'lib/**/*'
]

require 'jeweler'
Jeweler::Tasks.new do |gem|
  # gem is a Gem::Specification... see http://docs.rubygems.org/read/chapter/20 for more options
  gem.name = "engineyard-theme"
  gem.homepage = "http://github.com/engineyard/engineyard-theme"
  gem.license = "MIT"
  gem.summary = %Q{A gem providing helper methods and assets to make any site look like engineyard.com}
  gem.description = %Q{a 'pugita_header' and 'pugita_footer' method, along with an assets generator to make any site look like engineyard.com}
  gem.email = "paul@rslw.com"
  gem.authors = ["Paul Campbell"]
  gem.files = PKG_FILES.to_a
  gem.add_runtime_dependency 'rails', '~> 3'
end
Jeweler::RubygemsDotOrgTasks.new

require 'rspec/core'
require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec) do |spec|
  spec.pattern = FileList['spec/**/*_spec.rb']
end

RSpec::Core::RakeTask.new(:rcov) do |spec|
  spec.pattern = 'spec/**/*_spec.rb'
  spec.rcov = true
end

task :default => :spec

require 'rake/rdoctask'
Rake::RDocTask.new do |rdoc|
  version = File.exist?('VERSION') ? File.read('VERSION') : ""

  rdoc.rdoc_dir = 'rdoc'
  rdoc.title = "pugita_header #{version}"
  rdoc.rdoc_files.include('README*')
  rdoc.rdoc_files.include('lib/**/*.rb')
end
