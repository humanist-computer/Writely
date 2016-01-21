# encoding: utf-8
get '/' do
  if current_user
    # The following line just tests to see that it's working.
    # If you've logged in your first user, '/' should load: "1 ... 1";
    # You can then remove the following line, start using view templates, etc.
    # current_user.id.to_s + " ... " + session[:user_id].to_s
    @user = User.get(session[:user_id])
    @notes = @user.notes
    slim :"dashboard/dashboard", :layout => :"dashboard/layout"
  else
    # if you replace the above line with the following line,
    # the user gets signed in automatically. Could be useful.
    # Could also break user expectations.
    # redirect '/auth/twitter'
    @notes = Note.all
    slim :"static/landing_page", :layout => :"static/layout"
  end
end
