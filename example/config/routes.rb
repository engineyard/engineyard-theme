Example::Application.routes.draw do
  root :to => "home#show"
  match '*path' => 'home#show'
end
