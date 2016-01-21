# encoding: utf-8
get '/notes' do
	authenticate
	#throw(:halt, [401, "Not authorized\n"]) unless session[:authenticated]
	@notes = Note.all(:user_id => current_user.id)
	slim :notes
end

# get '/notes/new/:title' do
# 	authenticate
# 	#authenticate
# 	@note = Note.new
# 	@note.title = :title
# 	@note.save
# 	slim :"editor/new", :layout => :"editor/layout"
# end

post '/notes/new' do
  authenticate
  #authenticate
  user = User.get(session[:user_id])
  @note = user.notes.new
  
  # print "params title is #{}"
  @note.title = params['note__title']
  @note.save
  user.save
  slim :"editor/edit", :layout => :"editor/layout"
end

# get '/notes/edit/:title' do
#   authenticate
#   title = URI.unescape(:title)
#   @note = Note.get(params[title])
#   if current_user.id == @note.user_id
#     slim :"editor/edit", :layout => :"editor/layout"
#   else
#     throw(:halt, [401, "Not authorized\n"]) unless session[:authenticated]
#   end
# end

# No need for a show route/view, as we only ever edit docs
#get '/notes/:id' do
#	authenticate
#  @note = Note.get(params[:id])
#  if current_user.id == @note.user_id
#  	slim :show_note, :layout => :note_view
#  else
#  	throw(:halt, [401, "Not authorized\n"]) unless session[:authenticated]
#  end
#end

get '/notes/:id/edit' do
	authenticate
  @note = Note.get(params[:id])
  if current_user.id == @note.user_id
  	slim :"editor/edit", :layout => :"editor/layout"
  else
  	throw(:halt, [401, "Not authorized\n"]) unless session[:authenticated]
  end
end

# get '/notes/edit/:title' do
#   authenticate
#   @note = Note.get(URI.unescape(params[:title]))
#   if current_user.id == @note.user_id
#     redirect to("/notes/" + @note.id + "/edit" )
#   else
#     throw(:halt, [401, "Not authorized\n"]) unless session[:authenticated]
#   end
# end

post '/notes' do
	user = User.get(session[:user_id])
	note = user.notes.create(params[:note])
	user.save
	note.save
	redirect to("/")
end

# Create a new note, using the modal form
# post '/notes/new/:title' do
#   user = User.get(session[:user_id])
#   note = user.notes.new
#   user.save
#   note.save
#   note.title = URI.unescape(params[:title])
#   note.save
# end

# redirect to the current note (latest note)
# get '/notes/recent' do
#   authenticate
#   @note = Note.last
#   if current_user.id == @note.user_id
#     slim :"editor/edit", :layout => :"editor/layout"
#   else
#     throw(:halt, [401, "Not authorized\n"]) unless session[:authenticated]
#   end
# end

put '/notes/:id' do
	note = Note.get(params[:id])
  note.update(params[:note])
  redirect to("/")
end

delete '/notes/:id' do
	@note = Note.get(params[:id])
	@note.destroy
  redirect to('/')
end
