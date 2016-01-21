# encoding: utf-8
require 'bundler/setup'
require 'sinatra'
require 'rack-cache'

require 'font-awesome-sass'
#require 'sinatra-base'
#require 'sinatra-support'

require 'slim'
require 'sass'

require 'sprockets'
require 'sprockets-helpers'
require 'sprockets-sass'

require 'compass'

require 'uglifier'

require_relative 'models/init'
require_relative 'helpers/init'
require_relative 'routes/init'

set :views, File.dirname(__FILE__) + '/views'
set :public_folder, File.dirname(__FILE__) + '/assets'

class MyApp < Sinatra::Application
  enable :sessions

  

  set :assets, Sprockets::Environment.new(root)
  set :precompile,    [ /\w+\.(?!js|css).+/, /application.(css|js)$/ ]
  set :assets_prefix, '/assets'
  set :digest_assets, false
  set(:assets_path)   { File.join public_folder, assets_prefix }

  configure :production do
    # ...
  end

  configure :development do
    require 'shotgun'
  end

  helpers do
    include Sprockets::Helpers
  end
end


