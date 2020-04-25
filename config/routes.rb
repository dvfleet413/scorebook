Rails.application.routes.draw do
  resources :at_bats
  resources :innings
  resources :players
  resources :teams
  resources :games
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
