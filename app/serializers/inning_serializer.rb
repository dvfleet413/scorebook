class InningSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  belongs_to :game
end
