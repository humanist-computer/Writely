# encoding: utf-8
require 'dm-core'
require 'dm-migrations'

require_relative 'notes'
require_relative 'users'

configure :development do
	DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/development.db")
end

configure :production do
  DataMapper.setup(:default, ENV['DATABASE_URL'])
end

DataMapper.finalize
DataMapper.auto_upgrade!

require 'omniauth'
require 'omniauth-twitter'
use OmniAuth::Strategies::Twitter, 'LmWQcMMBffMdcdpuWUHytA', 'MajuWqv8K8SRExlL1LQTsN5lDhA7K41LgGOWHJEMY'
enable :sessions