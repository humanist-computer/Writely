def current_user
  @current_user ||= User.get(session[:user_id]) if session[:user_id]
end

def authenticate
  if current_user
    print "All good"
  else
    throw(:halt, [401, "Not authorized\n"]) unless session[:authenticated]
  end
end
