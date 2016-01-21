class Note
  include DataMapper::Resource
  property :id, Serial
  property :title, String, :default  => "Untitled note..."
  property :body, Text

  belongs_to :user
end

