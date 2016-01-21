root = ::File.dirname(__FILE__)
require ::File.join( root, 'app' )
Slim::Engine.default_options[:pretty] = true
use Rack::Cache, verbose: false
 
map MyApp.assets_prefix do
  run MyApp.assets
end

run MyApp.new